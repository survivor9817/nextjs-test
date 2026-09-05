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

const INITIAL_SESSIONS: QuizSession[] = [
  {
    quizId: "1",
    userId: "123",
    bookId: "706",
    startTime: new Date(2026, 2, 20, 1, 12).toISOString(),
    endTime: new Date(2026, 2, 20, 2, 26).toISOString(),
    duration: 74,
    progress: 100,
    lastVisitedQuestion: "6",
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
    lastVisitedQuestion: "8",
    filterTags: "10 سؤال – سطح متوسط – موضوع: جبر",
    questionsCount: 10,
    questionIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

const STORAGE_KEY = "mock_quiz_sessions";

// شبیه‌سازی خواندن از DB (با پشتیبانی از رفرش)
const getSessionsFromStorage = (): QuizSession[] => {
  if (typeof window === "undefined") return INITIAL_SESSIONS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SESSIONS));
    return INITIAL_SESSIONS;
  }
  return JSON.parse(stored);
};

// شبیه‌سازی ذخیره در DB
const saveSessionsToStorage = (sessions: QuizSession[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
};

export const getAllQuizes = (): QuizSession[] => {
  return getSessionsFromStorage();
};

export const getQuizes = (userId: string, bookId?: string) => {
  return getAllQuizes().filter((s) => s.userId === userId && (!bookId || s.bookId === bookId));
};

export const getQuizById = (quizId: string) => {
  return getAllQuizes().find((s) => s.quizId === quizId);
};

export const getActiveQuizByUserId = (userId: string, bookId: string): QuizSession | null => {
  const active = getAllQuizes().find(
    (s) => s.userId === userId && s.bookId === bookId && s.endTime === null,
  );
  return active || null;
};

const randomQuestionIdsBasedOnUserFilter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const getQuestionIdsFromDbByFilter = (_filters?: string) =>
  randomQuestionIdsBasedOnUserFilter;

// درج کوئیز جدید در دیتابیس ماک
export const addQuizSessionToDB = (newSession: QuizSession) => {
  const current = getSessionsFromStorage();
  const updated = [newSession, ...current];
  saveSessionsToStorage(updated);
};

export const createNewQuiz = (userId: string, bookId: string, filters: string): QuizSession => {
  const sessions = getSessionsFromStorage();
  const nextId = sessions.length ? Math.max(...sessions.map((s) => Number(s.quizId) || 0)) + 1 : 1;
  const questionIds = getQuestionIdsFromDbByFilter(filters);

  const newQuiz: QuizSession = {
    quizId: String(nextId),
    userId,
    bookId,
    startTime: new Date().toISOString(),
    endTime: null,
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

// مختومه کردن کوئیز در دیتابیس ماک
export const completeQuizSessionInDB = (quizId: string): QuizSession | null => {
  const sessions = getSessionsFromStorage();
  const target = sessions.find((s) => s.quizId === quizId);
  if (!target) return null;

  target.endTime = new Date().toISOString();
  target.progress = 100;

  saveSessionsToStorage(sessions);
  return target;
};

// در انتهای data/quizSessionsData.ts

export const updateQuizLastVisitedQuestionInDB = (
  quizId: string,
  questionId: string,
): QuizSession | null => {
  const sessions = getSessionsFromStorage();
  const target = sessions.find((s) => s.quizId === quizId);
  if (!target) return null;

  target.lastVisitedQuestion = questionId;
  saveSessionsToStorage(sessions);
  return target;
};
