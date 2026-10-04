"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingBag,
  History,
  FileQuestion,
  PlusCircle,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LogoutConfirmDialog } from "./logout-confirm-dialog";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { title: "صفحه کاربری", href: "/profile", icon: User },
  { title: "خرید جدید", href: "/shop", icon: ShoppingBag, badge: "ویژه" },
  { title: "تمرین‌های قبلی", href: "/study?tab=reviews", icon: History },
  { title: "طراحی امتحان", href: "/exam-creator", icon: FileQuestion },
  { title: "اضافه کردن سؤال", href: "/questions/new", icon: PlusCircle },
  { title: "تنظیمات", href: "/settings", icon: Settings },
];

export default function Menu() {
  const pathname = usePathname();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    try {
      // await authClient.signOut();
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsLogoutOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <aside className="flex h-full w-full max-w-xs flex-col p-4" dir="rtl">
        <div className="space-y-4">
          {/* هدر کاربر: آواتار وسط‌چین + دکمه خروج گوشه */}
          <div className="relative flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted/40 p-5 pt-12 text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsLogoutOpen(true)}
              aria-label="خروج از حساب"
              className={cn(
                "absolute top-2 end-2 h-7 gap-1.5 rounded-full px-2.5",
                "text-xs font-semibold text-muted-foreground",
                "hover:bg-destructive/10 hover:text-destructive",
                "focus-visible:ring-2 focus-visible:ring-destructive/40",
              )}
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              {/* <span>خروج</span> */}
            </Button>

            <button
              type="button"
              className="group flex flex-col items-center justify-center gap-3 text-center outline-none"
            >
              <Avatar className="h-20 w-20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-sm transition group-hover:ring-primary/40 group-focus-visible:ring-primary/60">
                <AvatarImage src="/imgs/reza.jpg" alt="رضا قزلسفلو" className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                  رق
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-lg font-bold leading-tight text-foreground">رضا قزلسفلو</span>
                <Badge variant="default" className="rounded-full px-3 py-0.5 text-xs font-medium">
                  معلم مدرسه
                </Badge>
              </div>
            </button>
          </div>

          <Separator className="my-2" />

          {/* لیست گزینه‌های منو */}
          <nav aria-label="منوی کاربری">
            <ul className="space-y-1.5">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px] font-bold",
                              isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronLeft
                          className={cn(
                            "h-4 w-4 opacity-50 transition-transform duration-200 group-hover:-translate-x-1 group-hover:opacity-100",
                            isActive && "opacity-100",
                          )}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <LogoutConfirmDialog
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        onConfirm={handleConfirmLogout}
        isLoading={isLoading}
      />
    </div>
  );
}
