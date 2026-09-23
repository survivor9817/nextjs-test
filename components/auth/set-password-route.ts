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
