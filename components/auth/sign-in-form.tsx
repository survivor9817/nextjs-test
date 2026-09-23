import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./password-input";
import { PhoneInput } from "./phone-input";

function SignInForm() {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">ورود به حساب کاربری</CardTitle>
          <CardDescription className="flex items-center justify-center gap-1">
            <span>هنوز ثبت نام نکردی؟</span>
            <Button
              render={<Link href="/signup" />}
              nativeButton={false}
              variant="link"
              className="h-auto p-0 font-bold underline underline-offset-2"
            >
              ثبت نام
            </Button>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <PhoneInput id="phone" placeholder="شماره موبایل" aria-label="شماره موبایل" />

          <PasswordInput
            id="password"
            placeholder="رمز عبور"
            aria-label="رمز عبور"
            autoComplete="current-password"
          />

          <Button type="submit" className="w-full">
            ورود
          </Button>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-sm text-muted-foreground">رمز عبورت یادت رفته؟</span>
            <Button
              render={<Link href="/otp-login" />}
              nativeButton={false}
              variant="link"
              className="h-auto p-0 text-sm font-bold underline underline-offset-2"
            >
              ورود سریع با پیامک
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInForm;
