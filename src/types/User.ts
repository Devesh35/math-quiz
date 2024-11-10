import { Timestamp } from '@mq/db';

export type User = {
  id: string;
  score: number;
  timestamp: Timestamp;
};
