import { Separator } from "@/components/ui/separator";
import { UserCard } from "./user-card";
import { MenuItems } from "./menu-items";

export default function Menu() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <aside className="flex h-full w-full max-w-xs flex-col p-4" dir="rtl">
        <div className="space-y-4">
          <UserCard />
          <Separator className="my-2" />
          <MenuItems />
        </div>
      </aside>
    </div>
  );
}
