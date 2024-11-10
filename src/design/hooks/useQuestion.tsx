import { createAndStoreQuestion, questionSnapshot } from '@mq/repo';
import { QuestionClient } from '@mq/types';
import { useEffect, useState } from 'react';

export const useQuestion = () => {
  const [isFetchingQuestion, setIsFetchingQuestion] = useState(false);
  const [question, setQuestion] = useState<QuestionClient>();

  useEffect(() => questionSnapshot(onQuestion), []);

  // Helper function
  const onQuestion = (question?: QuestionClient) => {
    if (!question?.id) {
      // The should only run if no question is available
      // i.e. Only on firestore initialization
      createAndStoreQuestion();
    } else {
      setQuestion(question);
      setIsFetchingQuestion(false);
    }
  };

  return { isFetchingQuestion, question, setIsFetchingQuestion };
};
