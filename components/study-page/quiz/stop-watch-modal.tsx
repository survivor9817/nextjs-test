"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";

const DrawerMultiple = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Drawer>
        <DrawerTrigger render={<Button variant="outline">Subscribe</Button>} />
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm px-4">
            <DrawerHeader>
              <DrawerTitle>Subscribe</DrawerTitle>
              <DrawerDescription>
                Enter your email to subscribe to our newsletter.
              </DrawerDescription>
            </DrawerHeader>
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="email">Enter email</Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="Email address" className="peer pr-9" />
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
                  <MailIcon className="size-4" />
                  <span className="sr-only">Email</span>
                </div>
              </div>
            </div>
            <DrawerFooter className="flex flex-row items-center gap-4 px-0">
              <Button className="flex-1" type="submit">
                Subscribe
              </Button>
              <DrawerClose
                render={
                  <Button className="flex-1" variant="outline">
                    Cancel
                  </Button>
                }
              />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerMultiple;
