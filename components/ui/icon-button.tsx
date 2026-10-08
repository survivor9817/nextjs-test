import { ComponentProps, ReactNode } from "react";
import { Button } from "./button";
import { cn } from "cn";

type IconButtonProps = Omit<ComponentProps<typeof Button>, "variant" | "size" | "type"> & {
  icon: ReactNode;
};

const IconButton = ({ icon, className, ...props }: IconButtonProps) => (
  <Button
    type="button"
    variant="outline"
    size="icon"
    className={cn("h-10 w-10 text-muted-foreground hover:text-foreground shadow-none", className)}
    {...props}
  >
    {icon}
  </Button>
);

export default IconButton;
