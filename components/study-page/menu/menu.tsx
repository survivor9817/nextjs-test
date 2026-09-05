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
  {
    title: "صفحه کاربری",
    href: "/profile",
    icon: User,
  },
  {
    title: "خرید جدید",
    href: "/shop",
    icon: ShoppingBag,
    badge: "ویژه",
  },
  {
    title: "تمرین‌های قبلی",
    href: "/study?tab=reviews",
    icon: History,
  },
  {
    title: "طراحی امتحان",
    href: "/exam-creator",
    icon: FileQuestion,
  },
  {
    title: "اضافه کردن سؤال",
    href: "/questions/new",
    icon: PlusCircle,
  },
  {
    title: "تنظیمات",
    href: "/settings",
    icon: Settings,
  },
];

export default function Menu() {
  const pathname = usePathname();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    try {
      // شبیه‌ساز خروج یا فراخوانی متد Better Auth
      // await authClient.signOut();
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsLogoutOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <aside className="flex h-full w-full max-w-xs flex-col justify-between p-4" dir="rtl">
        {/* بخش بالایی: پروفایل کاربر و آیتم‌های منو */}
        <div className="space-y-4">
          {/* هدر کاربر: آواتار، نام و نقش */}
          <div className="flex items-center gap-3.5 rounded-xl bg-muted/40 p-2.5">
            <Avatar className="h-14 w-14 border-2 border-primary shadow-sm">
              <AvatarImage src="/imgs/reza.jpg" alt="رضا قزلسفلو" className="object-cover" />
              <AvatarFallback className="bg-primary/10 font-bold text-primary">رق</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <span className="truncate text-base font-bold text-foreground">رضا قزلسفلو</span>
              <Badge
                variant="default"
                className="w-fit rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                معلم مدرسه
              </Badge>
            </div>
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

        {/* بخش پایینی: دکمه خروج از حساب */}
        <div className="pt-4">
          <Separator className="mb-3" />
          <button
            onClick={() => setIsLogoutOpen(true)}
            type="button"
            className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-destructive transition-colors duration-200 hover:bg-destructive/10"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>خروج از حساب</span>
            </div>
            <ChevronLeft className="h-4 w-4 opacity-40 transition-transform duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
          </button>
        </div>
      </aside>

      {/* دیالوگ تایید خروج */}
      <LogoutConfirmDialog
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        onConfirm={handleConfirmLogout}
        isLoading={isLoading}
      />
    </div>
  );
}
