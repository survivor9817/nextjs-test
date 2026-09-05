// components/quiz-results-table.tsx
"use client";

import ErrorFallback from "@/components/error-fallback";
import QuizResultsTableSkeleton from "./quiz-results-table-skeleton";
import { toFaDigits } from "@/lib/toFaDigits";
import { useResultsTableData } from "./use-results-table-data";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table className="text-sm">
        <TableHeader className="bg-gray-100">
          <TableRow className="border-b border-gray-200 hover:bg-gray-100">
            <TableHead className="font-bold text-gray-800">پاسخ</TableHead>
            <TableHead className="text-center font-bold text-gray-800">تعداد</TableHead>
            <TableHead className="text-center font-bold text-gray-800">درصد</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ردیف درست */}
          <TableRow className="border-b border-gray-200 bg-green-50/70 hover:bg-green-50/90">
            <TableCell className="font-medium text-green-900">درست</TableCell>
            <TableCell className="text-center font-bold text-green-700">
              {toFaDigits(correctsCount)}
            </TableCell>
            <TableCell className="text-center font-bold text-green-700">{truePercent}</TableCell>
          </TableRow>

          {/* ردیف نادرست */}
          <TableRow className="border-b border-gray-200 bg-red-50/70 hover:bg-red-50/90">
            <TableCell className="font-medium text-red-900">نادرست</TableCell>
            <TableCell className="text-center font-bold text-red-700">
              {toFaDigits(incorrectsCount)}
            </TableCell>
            <TableCell className="text-center font-bold text-red-700">{falsePercent}</TableCell>
          </TableRow>

          {/* ردیف نزده */}
          <TableRow className="border-b-0 bg-gray-50 hover:bg-gray-100/70">
            <TableCell className="font-medium text-gray-800">نزده</TableCell>
            <TableCell className="text-center font-bold text-gray-600">
              {toFaDigits(nullsCount)}
            </TableCell>
            <TableCell className="text-center font-bold text-gray-600">{nullPercent}</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter className="border-t border-gray-200 bg-gray-100 font-bold">
          <TableRow className="hover:bg-gray-100">
            <TableCell colSpan={2} className="text-gray-800">
              درصدت با نمره منفی
            </TableCell>
            <TableCell className="text-center text-gray-900">{negativeScorePercent}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default QuizResultsTable;
