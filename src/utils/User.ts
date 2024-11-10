import { timestamp } from '@mq/db';
import { User } from '@mq/types';
import { v4 } from 'uuid';

export const createUser = (): User => ({
  id: v4(),
  score: 0,
  timestamp: timestamp(),
});
