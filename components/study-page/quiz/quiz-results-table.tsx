// components/quiz-results-table.tsx
"use client";

import ErrorFallback from "@/components/error-fallback";
import QuizResultsTableSkeleton from "./quiz-results-table-skeleton";
import { toFaDigits } from "@/lib/toFaDigits";
import { useResultsTableData } from "./use-results-table-data";

type Props = {
  quizId: string;
};

const QuizResultsTable = ({ quizId }: Props) => {
  const { results, error, isLoading, loadQuizResults } = useResultsTableData(quizId);

  if (isLoading) return <QuizResultsTableSkeleton />;

  if (error) {
    return (
      <div className="my-2">
        <ErrorFallback onRefetch={loadQuizResults} ErrorMsg="خطا در دریافت نتایج" />
      </div>
    );
  }

  if (!results) {
    return <p className="text-center py-6 text-gray-500 text-sm">نتیجه‌ای پیدا نشد.</p>;
  }

  const { questionsCount = 0, correctsCount = 0, incorrectsCount = 0, nullsCount = 0 } = results;

  if (questionsCount === 0) {
    return <p className="text-center py-6 text-gray-500 text-sm">سوالی برای نمایش وجود ندارد.</p>;
  }

  const cutDecimals = (num: number) => parseFloat(num.toFixed(1));
  const truePercent = toFaDigits(cutDecimals((correctsCount / questionsCount) * 100)) + "٪";
  const falsePercent = toFaDigits(cutDecimals((incorrectsCount / questionsCount) * 100)) + "٪";
  const nullPercent = toFaDigits(cutDecimals((nullsCount / questionsCount) * 100)) + "٪";

  const scoreWithNegative = ((correctsCount - incorrectsCount / 3) / questionsCount) * 100;
  const negativeScorePercent = toFaDigits(cutDecimals(Math.max(0, scoreWithNegative))) + "٪";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2.5 text-right font-bold text-gray-800">پاسخ</th>
            <th className="px-4 py-2.5 text-center font-bold text-gray-800">تعداد</th>
            <th className="px-4 py-2.5 text-center font-bold text-gray-800">درصد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              scope="row"
              className="border-t border-gray-200 bg-green-50/70 px-4 py-2 text-right font-medium text-green-900"
            >
              درست
            </th>
            <td className="border-t border-gray-200 bg-green-50/70 px-4 py-2 text-center font-semibold text-green-700">
              {toFaDigits(correctsCount)}
            </td>
            <td className="border-t border-gray-200 bg-green-50/70 px-4 py-2 text-center font-semibold text-green-700">
              {truePercent}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border-t border-gray-200 bg-red-50/70 px-4 py-2 text-right font-medium text-red-900"
            >
              نادرست
            </th>
            <td className="border-t border-gray-200 bg-red-50/70 px-4 py-2 text-center font-semibold text-red-700">
              {toFaDigits(incorrectsCount)}
            </td>
            <td className="border-t border-gray-200 bg-red-50/70 px-4 py-2 text-center font-semibold text-red-700">
              {falsePercent}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-right font-medium text-gray-800"
            >
              نزده
            </th>
            <td className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-center font-semibold text-gray-600">
              {toFaDigits(nullsCount)}
            </td>
            <td className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-center font-semibold text-gray-600">
              {nullPercent}
            </td>
          </tr>
        </tbody>
        <tfoot className="bg-gray-100 font-bold">
          <tr>
            <th
              colSpan={2}
              className="border-t border-gray-200 px-4 py-2.5 text-right text-gray-800"
            >
              درصد نهایی با احتساب نمره منفی
            </th>
            <th className="border-t border-gray-200 px-4 py-2.5 text-center text-gray-900">
              {negativeScorePercent}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default QuizResultsTable;
