// مثال TypeScript – می‌توانید به‌سادگی به JSON یا JavaScript تبدیل کنید
export interface User {
  /** شناسهٔ یکتا (در دیتابیس) */
  id: string; // uuid یا ObjectId

  /** ایمیل (کلید اصلی برای لاگین) */
  email: string;

  /** هش یا توکن رمز عبور (هرگز رمز عبور را به‌صورت متن‑ساده ذخیره نکنید) */
  passwordHash: string;

  /** نام کاربری (اختیاری) */
  username?: string;

  /** نام و نام‌خانوادگی */
  firstName?: string;
  lastName?: string;

  /** تصویر پروفایل – URL یا شناسه‌ی فایل */
  avatarUrl?: string;

  /** نقش اصلی کاربر (RBAC) */
  role: "admin" | "moderator" | "member" | "guest";

  /** مجموعهٔ مجوزهای دقیق (اگر نیاز به granular‑permissions دارید) */
  permissions?: string[]; // e.g. ['read:posts','write:comments']

  /** وضعیت حساب */
  status: "active" | "pending" | "suspended" | "deleted";

  /** تاریخ ثبت‌نام (ISO string) */
  createdAt: string;

  /** آخرین باری که کاربر وارد سامانه شد */
  lastLoginAt?: string;

  /** توکن‌های موقت برای احراز هویت (مثلاً JWT‑refresh) */
  refreshToken?: string;

  /** تنظیمات دلخواه کاربر (locale, theme, ...) */
  settings?: {
    locale?: string; // 'fa-IR' | 'en-US' …
    theme?: "light" | "dark";
    // …سایر گزینه‌های دلخواه
  };
}

export const userData = [
  {
    Id: "123",
    name: "رضا قزلسفلو",
    roleRank: 1,
    roleName: "owner",
  },
];

// نمونه آرایهٔ کاربران (TypeScript)
export const users: User[] = [
  {
    id: "1a2b3c4d-001",
    email: "ali@example.com",
    passwordHash: "$2b$10$U1Z1aJH5eVY7K9Lx...", // bcrypt (نمونه)
    username: "ali88",
    firstName: "علی",
    lastName: "رضایی",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    role: "member",
    status: "active",
    createdAt: "2023-04-12T08:15:30Z",
    lastLoginAt: "2024-03-31T14:22:10Z",
    settings: { locale: "fa-IR", theme: "light" },
  },
  {
    id: "1a2b3c4d-002",
    email: "sara@example.com",
    passwordHash: "$2b$10$K9yM2W3pJtQ8nR5H...",
    username: "sara_dev",
    firstName: "سارا",
    lastName: "کامرانی",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    role: "moderator",
    status: "active",
    createdAt: "2023-06-20T11:02:45Z",
    lastLoginAt: "2024-03-30T09:05:18Z",
    settings: { locale: "fa-IR", theme: "dark" },
  },
  {
    id: "1a2b3c4d-003",
    email: "mohammad@example.com",
    passwordHash: "$2b$10$Z4hQ1vL6uA9eR0kJ...",
    username: "mohammad91",
    firstName: "محمد",
    lastName: "نیکو",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    role: "admin",
    status: "active",
    createdAt: "2022-12-05T16:40:12Z",
    lastLoginAt: "2024-03-31T18:45:00Z",
    settings: { locale: "en-US", theme: "dark" },
  },
  {
    id: "1a2b3c4d-004",
    email: "reza@example.com",
    passwordHash: "$2b$10$P7aV9sX2gT0cR6wK...",
    username: "reza_99",
    firstName: "رضا",
    lastName: "سفید",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    role: "member",
    status: "pending", // هنوز ایمیل تأیید نشده
    createdAt: "2024-01-15T09:20:00Z",
    settings: { locale: "fa-IR", theme: "light" },
  },
  {
    id: "1a2b3c4d-005",
    email: "lisa@example.com",
    passwordHash: "$2b$10$J3lM8cQ5rX7dS2tV...",
    username: "lisa_h",
    firstName: "لیسا",
    lastName: "هاشمی",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    role: "guest",
    status: "active",
    createdAt: "2024-02-28T22:10:54Z",
    lastLoginAt: "2024-03-31T07:58:41Z",
    settings: { locale: "en-US", theme: "light" },
  },
];
