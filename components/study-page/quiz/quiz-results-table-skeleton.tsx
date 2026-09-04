const QuizResultsTableSkeleton = () => {
  return (
    <div className="mt-4 mb-6 overflow-hidden rounded-xl border border-gray-300">
      <table className="w-full border-separate border-spacing-0">
        {/* هدر جدول */}
        <thead className="bg-gray-200">
          <tr>
            <th className="border-gray-400 px-4 py-2 text-right text-sm font-bold text-gray-900">
              <div className="h-4 w-12 animate-pulse rounded bg-gray-400" />
            </th>
            <th className="border-gray-400 px-4 py-2 text-center text-sm font-bold text-gray-900">
              <div className="h-4 w-8 animate-pulse rounded bg-gray-400 mx-auto" />
            </th>
            <th className="border-gray-400 px-4 py-2 text-center text-sm font-bold text-gray-900">
              <div className="h-4 w-8 animate-pulse rounded bg-gray-400 mx-auto" />
            </th>
          </tr>
        </thead>

        {/* بدنه جدول */}
        <tbody>
          {/* ردیف درست */}
          <tr>
            <th
              scope="row"
              className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-right font-medium"
            >
              <div className="h-4 w-10 animate-pulse rounded bg-gray-300" />
            </th>
            <td className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold">
              <div className="mx-auto h-5 w-6 animate-pulse rounded bg-gray-300" />
            </td>
            <td className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold">
              <div className="mx-auto h-5 w-8 animate-pulse rounded bg-gray-300" />
            </td>
          </tr>

          {/* ردیف نادرست */}
          <tr>
            <th
              scope="row"
              className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-right font-medium"
            >
              <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
            </th>
            <td className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold">
              <div className="mx-auto h-5 w-6 animate-pulse rounded bg-gray-300" />
            </td>
            <td className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold">
              <div className="mx-auto h-5 w-8 animate-pulse rounded bg-gray-300" />
            </td>
          </tr>

          {/* ردیف نزده */}
          <tr>
            <th
              scope="row"
              className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-right font-medium"
            >
              <div className="h-4 w-8 animate-pulse rounded bg-gray-300" />
            </th>
            <td className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold">
              <div className="mx-auto h-5 w-6 animate-pulse rounded bg-gray-300" />
            </td>
            <td className="border-t border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold">
              <div className="mx-auto h-5 w-8 animate-pulse rounded bg-gray-300" />
            </td>
          </tr>
        </tbody>

        {/* فوتر جدول */}
        <tfoot className="bg-gray-200">
          <tr>
            <th
              colSpan={2}
              className="border-gray-400 px-4 py-2 text-right text-sm font-bold text-gray-900"
            >
              <div className="h-4 w-24 animate-pulse rounded bg-gray-400" />
            </th>
            <th className="border-gray-400 px-4 py-2 text-center text-sm font-bold text-gray-900">
              <div className="mx-auto h-5 w-10 animate-pulse rounded bg-gray-400" />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default QuizResultsTableSkeleton;
