import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import LoginField from "./login-field";
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
          <DialogTitle>ورود به حساب کاربری</DialogTitle>
          <DialogDescription>وارد شوید یا حساب کاربری بسازید.</DialogDescription>
        </DialogHeader>
        <LoginField />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModalBtn;
