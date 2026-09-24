import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const reqHeaders = await headers();

    const session = await auth.api.getSession({ headers: reqHeaders });
    if (!session) {
      return NextResponse.json({ message: "سشن معتبری یافت نشد." }, { status: 401 });
    }

    // متد رسمی Better Auth برای ثبت یا تغییر پسورد کاربر لاگین‌شده
    await auth.api.setPassword({
      body: { newPassword: password },
      headers: reqHeaders,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "خطا در تنظیم رمز عبور" },
      { status: 400 },
    );
  }
}

// import { betterAuth } from "better-auth";
// import { phoneNumber } from "better-auth/plugins";

// lib/auth.ts
// export const auth = betterAuth({
//   rateLimit: {
//     enabled: true,
//     window: 60, // پنجره زمانی بر حسب ثانیه (مثلاً ۶۰ ثانیه)
//     max: 1,      // در هر ۶۰ ثانیه حداکثر ۱ بار اجازه ارسال بده
//     customRules: {
//       // اعمال محدودیت اختصاصی برای اندپوینت ارسال پیامک
//       "/phone-number/send-otp": {
//         window: 60, // هر ۶۰ ثانیه
//         max: 1,     // فقط ۱ درخواست برای هر کاربر/IP
//       },
//     },
//   },
//   plugins: [
//     phoneNumber({
//       otpLength: 6,
//       expiresIn: 120, // کد بعد از ۲ دقیقه (۱۲۰ ثانیه) منقضی می‌شود
//       sendOTP: async ({ phoneNumber, code }, request) => {
//         await sendSms(phoneNumber, code);
//       },
//     }),
//   ],
// });

// app/api/auth/complete-signup/route.ts
export async function POST(req: NextRequest) {
  const { phone, code, password } = await req.json();

  // ۱. تایید OTP (داخلی، بدون ساخت session جدا)
  const verifyResult = await auth.api.signInPhoneNumber({
    body: { phoneNumber: phone, code, disableSession: true },
  });

  if (!verifyResult?.user) {
    return NextResponse.json({ error: "کد نامعتبر است" }, { status: 400 });
  }

  // ۲. ست کردن رمز مستقیم روی همون userId، بدون نیاز به session
  const ctx = await auth.$context;
  const hash = await ctx.password.hash(password);
  await ctx.internalAdapter.updatePassword(verifyResult.user.id, hash);

  // ۳. حالا session واقعی رو بساز و کوکی بذار
  // (یا از همون verify با disableSession:false استفاده کن بعد از موفقیت رمز)
}

//            phone + otp
//                │
//                ▼
//     consumePhoneNumberOTP()
//                │
//            OTP معتبر؟
//           /          \
//         نه            بله
//         │              │
//       error            ▼
//                    پیدا کردن user
//                         │
//              ┌──────────┴──────────┐
//              │                     │
//           user هست             user نیست
//              │                     │
//              ▼                     ▼
//        password?              create user
//         /    \                    │
//       yes     no                  │
//        │       │                 │
//        ▼       │             password?
//  set password  │              /      \
//        │       │            yes       no
//        │       │             │         │
//        └───────┴─────────────┴─────────┘
//                        │
//                        ▼
//                  create session
//                        │
//                        ▼
//                    success
