"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingBag,
  History,
  FileQuestion,
  PlusCircle,
  Settings,
  ChevronLeft,
  Library,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserCard } from "./user-card";

// ==========================================
// Types & Data
// ==========================================

export interface MenuItemType {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  disabled?: boolean;
  hidden?: boolean;
  external?: boolean;
}

export const MENU_ITEMS: MenuItemType[] = [
  { title: "صفحه کاربری", href: "/profile", icon: User },
  { title: "کتابخانه من", href: "/library", icon: Library },
  { title: "خرید جدید", href: "/shop", icon: ShoppingBag, badge: "ویژه" },
  {
    title: "طراحی امتحان",
    href: "/exam-creator",
    icon: FileQuestion,
    badge: "به‌زودی",
    disabled: true,
  },
  { title: "اضافه کردن سؤال", href: "/questions/new", icon: PlusCircle },
  { title: "تنظیمات", href: "/settings", icon: Settings },
];

interface MenuItemsProps {
  items?: MenuItemType[];
  className?: string;
}

export function MenuItems({ items = MENU_ITEMS, className }: MenuItemsProps) {
  const pathname = usePathname();

  // فیلتر کردن آیتم‌های مخفی شده
  const visibleItems = items.filter((item) => !item.hidden);

  return (
    <nav aria-label="منوی کاربری" className={className}>
      <ul className="space-y-1.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href && !item.disabled;

          return (
            <li key={item.href}>
              <Link
                href={item.disabled ? "#" : item.href}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : undefined}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  }
                }}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                  // حالت فعال
                  isActive && "bg-primary text-primary-foreground shadow-sm",
                  // حالت عادی غیرفعال نشده
                  !isActive &&
                    !item.disabled &&
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                  // حالت غیرفعال (Disabled)
                  item.disabled && "cursor-not-allowed opacity-50 select-none hover:bg-transparent",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      !item.disabled && "group-hover:scale-110",
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
                        isActive
                          ? "bg-white/20 text-white"
                          : item.disabled
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/10 text-primary",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {!item.disabled && (
                    <ChevronLeft
                      className={cn(
                        "h-4 w-4 opacity-50 transition-transform duration-200 group-hover:-translate-x-1 group-hover:opacity-100",
                        isActive && "opacity-100",
                      )}
                    />
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
