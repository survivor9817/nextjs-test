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
import StopWatch from "./stop-watch";
import IconBtn from "@/components/ui/icon-btn";

function StopWatchDrawer() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<IconBtn icon={<span className="msr text-5xl">timer</span>} />} />
      <DrawerContent className="mx-0 mb-0 rounded-b-none">
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Drawer with a swipe handle.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <StopWatch />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default StopWatchDrawer;
