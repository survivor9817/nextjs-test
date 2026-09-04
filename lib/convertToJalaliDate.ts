import { toFaDigits } from "./toFaDigits";

export const toPersianDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const getTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// تابع تشخیص روز هفته
export const getWeekday = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("fa-IR", { weekday: "long" });
};

// محاسبه مدت
export const getDurationInMinutes = (startISO: string, endISO: string): string => {
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();

  if (isNaN(start) || isNaN(end)) {
    return "تاریخ نامعتبر";
  }

  if (end < start) {
    return "زمان پایان باید از شروع بزرگ‌تر باشد";
  }

  const diffMs = end - start;
  const minutes = Math.floor(diffMs / 60000); // 60000 میلی‌ثانیه = 1 دقیقه

  return toFaDigits(minutes);
};
