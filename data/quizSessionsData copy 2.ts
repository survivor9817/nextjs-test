// data/quizSessionsData.ts

export type QuizSession = {
  quizId: string;
  userId: string;
  bookId: string;
  startTime: string;
  endTime: string | null;
  duration: number;
  progress: number;
  lastVisitedQuestion: string;
  filterTags: string;
  questionIds: string[];
  questionsCount: number;
};

// سشن‌های اولیه همگی پایان‌یافته هستند
export const QUIZ_SESSIONS: QuizSession[] = [
  {
    quizId: "1",
    userId: "123",
    bookId: "706",
    startTime: new Date(2026, 2, 20, 1, 12).toISOString(),
    endTime: new Date(2026, 2, 20, 2, 26).toISOString(),
    duration: 74,
    progress: 100,
    lastVisitedQuestion: "10",
    filterTags: "10 سؤال – سطح متوسط – موضوع: جبر",
    questionsCount: 10,
    questionIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    quizId: "2",
    userId: "123",
    bookId: "706",
    startTime: new Date(2026, 2, 20, 2, 12).toISOString(),
    endTime: new Date(2026, 2, 20, 2, 26).toISOString(),
    duration: 14,
    progress: 100,
    lastVisitedQuestion: "10",
    filterTags: "10 سؤال – سطح متوسط – موضوع: جبر",
    questionsCount: 10,
    questionIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

const getAllQuizes = () => QUIZ_SESSIONS;

export const getQuizes = (userId: string, bookId?: string) => {
  return getAllQuizes().filter((s) => s.userId === userId && (!bookId || s.bookId === bookId));
};

export const getQuizById = (quizId: string) => {
  return getAllQuizes().find((s) => s.quizId === quizId);
};

// جستجوی سشن فعالی که endTime آن null است
export const getActiveQuizByUserId = (userId: string, bookId: string): QuizSession | null => {
  const active = getAllQuizes().find(
    (s) => s.userId === userId && s.bookId === bookId && s.endTime === null,
  );
  return active || null;
};

const randomQuestionIdsBasedOnUserFilter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const getQuestionIdsFromDbByFilter = (_filters?: string) =>
  randomQuestionIdsBasedOnUserFilter;

export const addQuizSessionToDB = (newSession: QuizSession) => QUIZ_SESSIONS.unshift(newSession);

let fakeId = 2;

// سشن جدید با endTime: null ایجاد و به دیتابیس ماک اضافه می‌شود
export const createNewQuiz = (userId: string, bookId: string, filters: string): QuizSession => {
  fakeId += 1;
  const questionIds = getQuestionIdsFromDbByFilter(filters);

  const newQuiz: QuizSession = {
    quizId: `${fakeId}`,
    userId,
    bookId,
    startTime: new Date().toISOString(),
    endTime: null, // ناتمام برای شروع سشن جاری
    duration: 0,
    progress: 0,
    lastVisitedQuestion: questionIds[0] || "",
    filterTags: filters,
    questionIds,
    questionsCount: questionIds.length,
  };

  addQuizSessionToDB(newQuiz);
  return newQuiz;
};

export const startNewQuiz = (userId: string, bookId: string, filters: string) => {
  return createNewQuiz(userId, bookId, filters);
};

// data/quizSessionsData.ts

export const completeQuizSessionInDB = (quizId: string): QuizSession | null => {
  const session = getAllQuizes().find((s) => s.quizId === quizId);
  if (!session) return null;

  // پایان دادن به سشن
  session.endTime = new Date().toISOString();
  session.progress = 100; // یا محاسبه درصد واقعی پاسخ‌ها

  return session;
};
