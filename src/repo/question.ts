import { COLLECTIONS, QUESTION_ID } from '@mq/config';
import { getDocReference, storeDocById } from '@mq/db';
import { QuestionClient } from '@mq/types';
import { createQuestion } from '@mq/utils';
import { onSnapshot } from 'firebase/firestore';

export const createAndStoreQuestion = async () =>
  await storeDocById(COLLECTIONS.QUESTIONS, QUESTION_ID, createQuestion());

export const questionSnapshot = (cb: (question: QuestionClient) => void) =>
  onSnapshot(
    getDocReference(COLLECTIONS.QUESTIONS, QUESTION_ID),
    (snapshot) => {
      const questions = snapshot.data() as QuestionClient;
      cb(questions);
    },
  );
