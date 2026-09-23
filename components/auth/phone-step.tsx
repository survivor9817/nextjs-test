"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

import { phoneSchema, type PhoneValues } from "./schemas";
import { PhoneInput } from "./phone-input";

interface PhoneStepProps {
  loading: boolean;
  serverError: string | null;
  onSubmit: (phone: string) => Promise<void>;
}

const PhoneStep = ({ loading, serverError, onSubmit }: PhoneStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values.phone))}>
      <FieldGroup className="gap-4">
        <FieldContent className="flex justify-center items-center gap-4">
          <FieldTitle className="text-2xl font-bold">ثبت نام یا ورود با پیامک</FieldTitle>
          <FieldDescription>شماره موبایلت رو وارد کن تا کد تأیید برات پیامک بشه.</FieldDescription>
        </FieldContent>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="phone" className="sr-only">
            شماره موبایل
          </FieldLabel>
          <PhoneInput
            id="phone"
            placeholder="شماره موبایل"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && <FieldError errors={[errors.phone]} />}
        </Field>

        {serverError && (
          <FieldError role="alert" errors={[{ message: serverError }]} className="text-center" />
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال ارسال..." : "ارسال کد"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default PhoneStep;
