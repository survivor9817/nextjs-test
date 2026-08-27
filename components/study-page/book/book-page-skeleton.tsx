const BookPageSkeleton = () => {
  return (
    <section className={`animate-pulse space-y-6 max-w-4xl mx-auto mt-4 px-4`} aria-hidden="true">
      <div className="h-10 md:h-10 w-[43%] flex-1 mr-4 mb-4 bg-gray-200 rounded dark:bg-gray-400" />
      <div className="space-y-2">
        <div className="h-4 md:h-5 flex-1 mr-4 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 w-5/6 bg-gray-200 rounded dark:bg-gray-400" />
      </div>

      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded h-50 dark:bg-gray-400" />

      <div className="space-y-2">
        <div className="h-4 md:h-5 flex-1 mr-4 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 w-5/6 bg-gray-200 rounded dark:bg-gray-400" />
      </div>
      <div className="space-y-2">
        <div className="h-4 md:h-5 flex-1 mr-4 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 w-5/6 bg-gray-200 rounded dark:bg-gray-400" />
      </div>
      <div className="space-y-2">
        <div className="h-4 md:h-5 flex-1 mr-4 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 flex-1 bg-gray-200 rounded dark:bg-gray-400" />
        <div className="h-4 md:h-5 w-5/6 bg-gray-200 rounded dark:bg-gray-400" />
      </div>
    </section>
  );
};

export default BookPageSkeleton;
