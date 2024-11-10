import { QuestionServer } from '@mq/types';
import { v4 } from 'uuid';

export const createQuestion = (): QuestionServer => {
  const getRandomNumber = () => Math.floor(Math.random() * 100);
  const getRandomBoolean = () => Math.random() >= 0.5;

  const id = v4();
  const number1 = getRandomNumber();
  const number2 = getRandomNumber();
  const isSum = getRandomBoolean();

  return { id, number1, number2, operator: isSum ? '+' : '-' };
};

export const answerQuestion = (question: QuestionServer): number => {
  const { number1, number2, operator } = question;
  return operator === '+' ? number1 + number2 : number1 - number2;
};
