import { saveReactionToDB, type DbReaction, type DbReactionId } from "../data/questionsData";
import type { UiReactionId } from "../data/reactionData";

export const createDbReaction = (
  quizId: string,
  userId: string,
  currentQuestionID: string,
  reactionId: DbReactionId,
): DbReaction => {
  const isAnswer = reactionId === "isCorrect" || reactionId === "isIncorrect";

  return {
    quizId: quizId,
    userId: userId,
    questionId: currentQuestionID,
    reactionId: reactionId,
    reactionType: isAnswer ? "answer" : "feedback",
    createdAt: new Date().toISOString(),
  };
};

export const postQuizReaction = (
  quizId: string,
  userId: string,
  currentQuestionID: string,
  reactionId: UiReactionId,
) => {
  const submittedReaction = createDbReaction(quizId, userId, currentQuestionID, reactionId);
  // post it
  saveReactionToDB(submittedReaction);
};
