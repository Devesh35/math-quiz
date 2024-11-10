import { Timestamp } from '@mq/db';
import { QuestionClient, QuestionServer } from './Question';

export type SolvedClient = {
  id: string;
  question: QuestionClient;
  answer: number;
  solvedBy: string;
  solvedAt: Timestamp;
  createdAt: Timestamp;
};

export type SolvedServer = {
  question: QuestionServer;
  answer: number;
  solvedBy: string;
  solvedAt: Timestamp;
  createdAt: Timestamp;
};
