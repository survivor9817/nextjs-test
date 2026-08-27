function FehrestListSkeleton() {
  // تابع کمکی برای ایجاد آیتم‌های فرعی با طول‌های مختلف
  const SubItems = () => (
    <div className="space-y-2 pl-4 border-r-2 border-gray-200 dark:border-gray-700 pr-2">
      <div className="h-5 w-3/4 bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
      <div className="h-5 w-5/6 bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
      <div className="h-5 w-4/5 bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
    </div>
  );

  return (
    <section className="animate-pulse space-y-6 max-w-4xl mx-auto mt-4 px-4" aria-hidden="true">
      {/* بخش ۱ */}
      <div className="space-y-3">
        <div className="h-6 w-[45%] bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
        <SubItems />
      </div>

      {/* بخش ۲ (کمی بازتر برای تنوع) */}
      <div className="space-y-3">
        <div className="h-6 w-[40%] bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
        <SubItems />
      </div>

      {/* بخش ۳ */}
      <div className="space-y-3">
        <div className="h-6 w-[50%] bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
        <SubItems />
      </div>

      {/* بخش ۴ */}
      <div className="space-y-3">
        <div className="h-6 w-[42%] bg-gray-200 rounded dark:bg-gray-400 animate-pulse" />
        <SubItems />
      </div>
    </section>
  );
}

export default FehrestListSkeleton;
