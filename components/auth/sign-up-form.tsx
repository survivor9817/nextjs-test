"use client";

import { Card, CardContent } from "@/components/ui/card";
import PhoneStep from "./phone-step";
import OtpStep from "./otp-step";
import PasswordStep from "./password-step";
import { usePhoneAuthFlow, RESEND_DELAY_SECONDS } from "./use-phone-auth-flow";

export default function SignUpForm() {
  const {
    step,
    phone,
    loading,
    serverError,
    requestOtp,
    verifyOtp,
    resendOtp,
    submitPassword,
    handleChangePhone,
  } = usePhoneAuthFlow();

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full">
        <CardContent>
          {step === "phone" && (
            <PhoneStep loading={loading} serverError={serverError} onSubmit={requestOtp} />
          )}

          {step === "otp" && (
            <OtpStep
              phone={phone}
              resendDelay={RESEND_DELAY_SECONDS}
              loading={loading}
              serverError={serverError}
              onVerify={verifyOtp}
              onResend={resendOtp}
              onChangePhone={handleChangePhone}
            />
          )}

          {step === "password" && (
            <PasswordStep loading={loading} serverError={serverError} onSubmit={submitPassword} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
