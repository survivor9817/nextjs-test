import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import SignInForm from "../auth/sign-in-form";
import PhoneAuthFlow from "../auth/phone-auth-flow";
import SignUpForm from "../auth/sign-up-form";
type Props = {};

const AuthModalBtn = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant={"ghost"}
            className="h-11 border-2 border-[#bcbcbc] hover:bg-[#ddd] px-4 transition-colors duration-200 ease-in-out text-sm"
          >
            ورود / ثبت‌نام
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>ورود به حساب کاربری</DialogTitle>
          {/* <DialogDescription className={"text-center"}>
            وارد شوید یا حساب کاربری بسازید.
          </DialogDescription> */}
        </DialogHeader>

        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModalBtn;
