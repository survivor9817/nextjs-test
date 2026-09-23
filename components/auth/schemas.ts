import { z } from "zod"

export const phoneSchema = z.object({
  phone: z.string().min(10, "شماره تلفن معتبر نیست"),
})
export type PhoneValues = z.infer<typeof phoneSchema>

export const otpSchema = z.object({
  otp: z.string().length(6, "کد باید ۶ رقم باشد"),
})
export type OtpValues = z.infer<typeof otpSchema>

export const passwordSchema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  })
export type PasswordValues = z.infer<typeof passwordSchema>
