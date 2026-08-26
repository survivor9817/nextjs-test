import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const LoginField = () => {
  return (
    <FieldSet className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">نام کاربری</FieldLabel>
          <Input id="username" type="text" placeholder="مرتضی هیراد" autoComplete="off" />
          <FieldDescription>یک نام کاربری برای خود انتخاب کنید.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">کلمه عبور</FieldLabel>
          <Input id="password" type="password" placeholder="••••••••" autoComplete="off" />
          <FieldDescription>باید حداقل ۸ کاراکتر باشد.</FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">ورود</Button>
          <Button variant="outline" type="button">
            ثبت نام
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default LoginField;
