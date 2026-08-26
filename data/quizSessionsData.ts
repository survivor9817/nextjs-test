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

export const QUIZ_SESSIONS: QuizSession[] = [
  {
    quizId: "1",
    userId: "123",
    bookId: "706",
    startTime: new Date(2026, 2, 20, 1, 12).toISOString(),
    endTime: new Date(2026, 2, 20, 2, 26).toISOString(), // or null?
    duration: 74,
    progress: 75,
    lastVisitedQuestion: "3",
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
    progress: 75,
    lastVisitedQuestion: "3",
    filterTags: "10 سؤال – سطح متوسط – موضوع: جبر",
    questionsCount: 10,
    questionIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

const getAllQuizes = () => QUIZ_SESSIONS;

export const getQuizes = (userId: string, bookId?: string) => {
  const userPreviousQuizes = getAllQuizes().filter(
    (s) => s.bookId === bookId && s.userId === userId,
  );
  return userPreviousQuizes;
};

export const getQuizById = (quizId: string) => {
  const quizSession = getAllQuizes().find((s) => s.quizId === quizId);
  return quizSession;
};

const randomQuestionIdsBasedOnUserFilter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const getQuestionIdsFromDbByFilter = (filters?: string) =>
  randomQuestionIdsBasedOnUserFilter;

export const addQuizSessionToDB = (newSession: QuizSession) => QUIZ_SESSIONS.unshift(newSession);

let fakeId = 2;
export const createNewQuiz = (userId: string, bookId: string, filters: string): QuizSession => {
  fakeId += 1;
  const newQuiz = {
    quizId: `${fakeId}`,
    userId,
    bookId,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 60000).toISOString(), // mitoone taabe e get az db sh ro seda bezanim. endesh mishe moghe i ke
    duration: 14,
    progress: 75,
    lastVisitedQuestion: "3",
    filterTags: filters,
    questionIds: getQuestionIdsFromDbByFilter(/** filters */), // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // make random ids based on filter.
    questionsCount: 10,
  };

  addQuizSessionToDB(newQuiz);

  return newQuiz;
};

export const getNewQuestionIdsFromNewQuizByFilter = (
  userId: string,
  bookId: string,
  filters: string,
) => {
  const questionIds = createNewQuiz(userId, bookId, filters).questionIds;
  return questionIds;
};

// this
// export const startNewQuiz = (userId: string, bookId: string, filters: string) => {
//   // generate quiz id
//   // const newQuizId = "1"
//   return getNewQuestionIdsFromNewQuizByFilter(userId, bookId, filters);
// };

export const startNewQuiz = (userId: string, bookId: string, filters: string) => {
  // generate quiz id
  // const newQuizId = "1"
  return createNewQuiz(userId, bookId, filters);
};

export const getQuestionIdsByQuizId = (quizId: string) => {
  const questionIds = getQuizById(quizId)?.questionIds;
  return questionIds;
};

// and this
export const reviewExistingQuiz = (quizId: string) => {
  return getQuestionIdsByQuizId(quizId);
};

// export const reviewExistingQuiz = (quizId: string) => {
//   return getQuizById(quizId);
// };

// maybe
export const quiz_filters = [
  { quizId: "1", filterId: "fasle2" },
  { quizId: "1", filterId: "nahaaee" },
];

// ******** jadvale har soaale kaarbar ro besaaz
// har soaal ro ke user dide zamane seen, zamaane tarke oon soal, zamaane moshaahedeye javaabe on soal,
// zamaane edit shodanesh, va ... ro betoonim sabt konim.
// hmmmmm chetore ke rafto bargashte be yek soaal ham yek noe az reaction baashe. haa???
