// components/QuizReviewTable.tsx
import { useState } from "react";
import IconBtn from "@/components/ui/icon-btn";
import {
  getWeekday,
  toPersianDate,
  getTime,
  getDurationInMinutes,
} from "@/lib/convertToJalaliDate";
import { toFaDigits } from "@/lib/toFaDigits";
import QuizReviewModal from "./quiz-review-modal";
import { useQuizSessionsData } from "./useQuizSessionsData";
import ErrorFallback from "@/components/error-fallback";

type Props = {
  startQuizLoading: boolean;
  reviewQuiz: (quizId: string) => void | Promise<unknown>;
};

const QuizReviewsTable = ({ reviewQuiz, startQuizLoading }: Props) => {
  const tHeadCls = "border-gray-300 align-middle text-center text-sm font-bold text-gray-900 py-2";
  const tRowCls =
    "border-t border-gray-300 bg-gray-50 align-middle py-2 px-1 text-center text-base font-semibold text-gray-600";

  const { quizSessions, isLoading, error, loadQuizSessions } = useQuizSessionsData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const handleOpenResults = (quizId: string) => {
    setSelectedQuizId(quizId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuizId(null);
  };

  if (isLoading) {
    return (
      <div className="w-full mt-2 overflow-hidden rounded-xl border border-gray-300">
        <p className="flex justify-center p-4">در حال بارگذاری ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorFallback onRefetch={loadQuizSessions} ErrorMsg="خطا در بارگذاری سوابق" />
      </div>
    );
  }

  if (!quizSessions.length) {
    return <p className="flex justify-center p-4 text-gray-500">تمرینی موجود نیست.</p>;
  }

  return (
    <div className="w-full mt-2 overflow-hidden rounded-xl border border-gray-300">
      <table className="w-full border-separate border-spacing-0 text-base">
        <thead className="bg-gray-200">
          <tr>
            <th className={`${tHeadCls} px-1 border-l`}>#</th>
            <th className={`${tHeadCls} w-20 px-1`}>روز</th>
            <th className={`${tHeadCls} w-24`}>تاریخ</th>
            <th className={`${tHeadCls}`}>شروع</th>
            <th className={`${tHeadCls}`}>مدت</th>
            <th className={`${tHeadCls} w-14`}>نتایج</th>
          </tr>
        </thead>
        <tbody>
          {quizSessions.map(({ quizId, startTime, endTime }, i) => (
            <tr key={quizId}>
              <th scope="row" className={`${tRowCls} border-l`}>
                {toFaDigits(i + 1)}
              </th>
              <td className={tRowCls}>{getWeekday(startTime)}</td>
              <td className={tRowCls}>{toPersianDate(startTime)}</td>
              <td className={tRowCls}>{getTime(startTime)}</td>
              <td className={tRowCls}>{getDurationInMinutes(startTime, endTime || "")}</td>
              <td className={`${tRowCls} grid place-content-center`}>
                <IconBtn
                  icon={<span className="msr text-2xl">insert_chart</span>}
                  onClick={() => handleOpenResults(quizId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <QuizReviewModal
        isOpen={Boolean(isModalOpen && selectedQuizId)}
        quizId={selectedQuizId || ""}
        reviewQuiz={reviewQuiz}
        startQuizLoading={startQuizLoading}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default QuizReviewsTable;
