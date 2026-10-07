"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client"; // مطمئن شوید phoneNumberClient به کلاینت اضافه شده باشد

const DEFAULT_CALLBACK_URL = "/dashboard";

/**
 * فقط مسیرهای داخلی سایت پذیرفته می‌شوند (جلوگیری از open redirect).
 * رشته‌ی خالی، undefined و آدرس‌های خارجی به مسیر پیش‌فرض برمی‌گردند.
 */
function getSafeCallbackUrl(url?: string | null): string {
  if (!url) return DEFAULT_CALLBACK_URL;
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith("/\\")) {
    return DEFAULT_CALLBACK_URL;
  }
  return url;
}

/**
 * منطق فرم ورود با شماره تلفن و رمز عبور
 *
 * callbackUrl از بیرون (props صفحه یا کامپوننت احاطه‌شده با Suspense) پاس داده می‌شود.
 */
export function useSignInForm(callbackUrl?: string | null, onSuccess?: () => void) {
  const router = useRouter();
  const redirectTo = getSafeCallbackUrl(callbackUrl);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // --- هدایت کاربر به صفحه نهایی پس از ورود موفق ---
  function handleCompleteFlow() {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push(redirectTo);
    }
  }

  // --- ورود با شماره تلفن و رمز عبور ---
  async function signIn(phone: string, password: string) {
    setServerError(null);
    setLoading(true);

    // --- شبیه‌سازی تستی فرانت‌اند ---
    console.log("ورود با:", phone, password);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    handleCompleteFlow();

    /*
    // --- پیاده‌سازی واقعی با Better Auth ---
    try {
      const { data, error } = await authClient.signIn.phoneNumber({
        phoneNumber: phone,
        password,
      });

      if (error) {
        setServerError(error.message || "شماره موبایل یا رمز عبور اشتباه است.");
        return;
      }

      handleCompleteFlow();
    } catch (err: any) {
      setServerError(err?.message || "خطای ارتباط با سرور رخ داد.");
    } finally {
      setLoading(false);
    }
    */
  }

  return {
    loading,
    serverError,
    signIn,
  };
}
