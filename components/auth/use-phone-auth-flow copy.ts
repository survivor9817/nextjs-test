// // use-phone-auth-flow.ts
// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// // import { authClient } from "@/lib/auth-client"; // مطمئن شوید phoneNumberClient به کلاینت اضافه شده باشد

// export type PhoneAuthStep = "phone" | "otp" | "password";

// export const RESEND_DELAY_SECONDS = 60;

// /**
//  * منطق مشترک فلوی احراز هویت با شماره تلفن:
//  * مرحله ۱) ارسال OTP
//  * مرحله ۲) تایید OTP و تشخیص وضعیت کاربر (آیا رمز عبور تعیین کرده یا نه)
//  * مرحله ۳) در صورت نداشتن رمز عبور، تعیین رمز؛ در غیر این صورت لاگین کامل و ری‌دایرکت
//  */
// export function usePhoneAuthFlow(onSuccess?: () => void) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

//   const [step, setStep] = useState<PhoneAuthStep>("phone");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null);

//   // true یعنی کاربر برای اکانتش هنوز رمزی تعیین نکرده (باید به مرحله ۳ برود)
//   const [isNewUser, setIsNewUser] = useState<boolean | null>(null);

//   // --- بازگشت به مرحله شماره تلفن و پاک‌سازی وضعیت‌ها ---
//   function handleChangePhone() {
//     setServerError(null);
//     setLoading(false);
//     setIsNewUser(null);
//     setStep("phone");
//   }

//   // --- هدایت کاربر به صفحه نهایی (پس از ثبت رمز یا لاگین کامل) ---
//   function handleCompleteFlow() {
//     if (onSuccess) {
//       onSuccess();
//     } else {
//       router.push(callbackUrl);
//     }
//   }

//   // --- رد شدن از مرحله رمز عبور (در صورت نیاز به دکمه‌ی "بعداً") ---
//   function skipPassword() {
//     handleCompleteFlow();
//   }

//   // --- مرحله ۱: ارسال کد تایید ---
//   async function requestOtp(phoneValue: string) {
//     setServerError(null);
//     setLoading(true);
//     setPhone(phoneValue);

//     // --- شبیه‌سازی تستی فرانت‌اند ---
//     console.log("OTP ارسال شد برای:", phoneValue);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     setLoading(false);
//     setStep("otp");

//     /*
//     // --- پیاده‌سازی واقعی با Better Auth ---
//     try {
//       const { data, error } = await authClient.phoneNumber.sendOtp({
//         phoneNumber: phoneValue,
//       });

//       if (error) {
//         setServerError(error.message || "خطا در ارسال کد تایید.");
//         return;
//       }

//       setStep("otp");
//     } catch (err: any) {
//       setServerError(err?.message || "خطای ارتباط با سرور رخ داد.");
//     } finally {
//       setLoading(false);
//     }
//     */
//   }

//   // --- مرحله ۲: تایید OTP و بررسی این‌که کاربر رمز عبور دارد یا نه ---
//   async function verifyOtp(otpValue: string) {
//     setServerError(null);
//     setLoading(true);

//     // --- شبیه‌سازی تستی فرانت‌اند ---
//     console.log("کد تایید شد:", otpValue);
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     // شبیه‌سازی: مثلاً کاربر هنوز رمز عبور ندارد (برای تست false بگذارید تا مستقیم ری‌دایرکت شود)
//     setIsNewUser(true);
//     setLoading(false);
//     setStep("password");

//     /*
//     // --- پیاده‌سازی واقعی با Better Auth ---
//     try {
//       // verifyPhoneNumber به‌صورت پیش‌فرض یک سشن برای کاربر می‌سازد
//       const { data, error } = await authClient.phoneNumber.verify({
//         phoneNumber: phone,
//         code: otpValue,
//       });

//       if (error) {
//         setServerError(error.message || "کد وارد شده اشتباه یا منقضی است.");
//         return;
//       }

//       // حالا که سشن ساخته شده، بررسی می‌کنیم آیا اکانت credential (رمز عبور) دارد یا نه
//       const { data: accounts, error: accountsError } =
//         await authClient.listAccounts();

//       if (accountsError) {
//         setServerError(accountsError.message || "خطا در بررسی وضعیت حساب.");
//         return;
//       }

//       const hasPassword = accounts?.some(
//         (account) => account.providerId === "credential"
//       );

//       if (hasPassword) {
//         // کاربر از قبل رمز دارد → لاگین کامل شد، مستقیم ری‌دایرکت شود
//         handleCompleteFlow();
//       } else {
//         // هنوز رمزی تعیین نشده → برو مرحله تعیین رمز
//         setIsNewUser(true);
//         setStep("password");
//       }
//     } catch (err: any) {
//       setServerError(err?.message || "خطا در تایید کد.");
//     } finally {
//       setLoading(false);
//     }
//     */
//   }

//   // --- ارسال مجدد کد ---
//   async function resendOtp() {
//     setServerError(null);
//     console.log("درخواست ارسال مجدد کد برای:", phone);

//     /*
//     // --- پیاده‌سازی واقعی با Better Auth ---
//     try {
//       const { error } = await authClient.phoneNumber.sendOtp({
//         phoneNumber: phone,
//       });
//       if (error) {
//         setServerError(error.message || "خطا در ارسال مجدد کد.");
//       }
//     } catch (err: any) {
//       setServerError(err?.message || "خطای ارتباط با سرور.");
//     }
//     */
//   }

//   // --- مرحله ۳: تعیین رمز عبور برای کاربر سشن‌دار جاری که هنوز credential ندارد ---
//   async function submitPassword(password: string) {
//     setServerError(null);
//     setLoading(true);

//     // --- شبیه‌سازی تستی فرانت‌اند ---
//     console.log("رمز عبور ثبت شد:", password);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     setLoading(false);
//     handleCompleteFlow();

//     /*
//     // --- پیاده‌سازی واقعی با Better Auth ---
//     // نکته: auth.api.setPassword فقط سمت سرور قابل فراخوانی است،
//     // پس باید از طریق یک API Route فراخوانی شود (نه مستقیم authClient)
//     try {
//       const res = await fetch("/api/auth/set-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newPassword: password }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         setServerError(errData.message || "خطا در تنظیم رمز عبور.");
//         return;
//       }

//       handleCompleteFlow();
//     } catch (err: any) {
//       setServerError(err?.message || "خطا در ارتباط با سرور.");
//     } finally {
//       setLoading(false);
//     }
//     */
//   }

//   return {
//     step,
//     phone,
//     loading,
//     serverError,
//     isNewUser, // 👈 true یعنی کاربر هنوز رمز عبور تعیین نکرده
//     requestOtp,
//     verifyOtp,
//     resendOtp,
//     submitPassword,
//     skipPassword, // 👈 متد رد شدن از مرحله پسورد (در صورت نیاز به این گزینه)
//     handleChangePhone,
//   };
// }
