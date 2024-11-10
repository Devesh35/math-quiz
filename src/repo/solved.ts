import { COLLECTIONS, QUESTION_ID, SOLVED_ITEMS_COUNT } from '@mq/config';
import {
  getCollectionReference,
  getDocReference,
  getTransaction,
  timestamp,
  transformDocWithId,
} from '@mq/db';
import { QuestionClient, SolvedClient, SolvedServer } from '@mq/types';
import { createQuestion, getUser } from '@mq/utils';
import { increment, onSnapshot, orderBy, query } from 'firebase/firestore';

export const saveSolution = async (
  question: QuestionClient,
  answer: number,
) => {
  const user = getUser();
  if (!user) return;
  const solved: SolvedServer = {
    question,
    answer,
    solvedBy: user.id,
    solvedAt: timestamp(),
    createdAt: timestamp(),
  };

  return getTransaction(async (transaction) => {
    const solvedRef = getDocReference(COLLECTIONS.SOLVED, question.id);
    const questionRef = getDocReference(COLLECTIONS.QUESTIONS, QUESTION_ID);
    const userRef = getDocReference(COLLECTIONS.USERS, user.id);

    const solvedDoc = await transaction.get(solvedRef);
    if (solvedDoc.exists()) return;

    transaction.set(solvedRef, solved);
    transaction.update(questionRef, createQuestion());
    transaction.update(userRef, {
      score: increment(1),
    });
  });
};

export const solvedSnapshot = (cb: (solved: SolvedClient[]) => void) =>
  onSnapshot(
    query(
      getCollectionReference(COLLECTIONS.SOLVED),
      orderBy('createdAt', 'desc'),
    ),
    (snapshot) => {
      cb(
        snapshot.docs
          .map(transformDocWithId<SolvedClient>)
          .slice(0, SOLVED_ITEMS_COUNT),
      );
    },
  );
