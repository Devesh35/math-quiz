import { LOCAL_STORAGE_USER_KEY } from '@mq/config';
import { User } from '@mq/types';

export const storeUser = (user: User) =>
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

export const getUser = (): User | undefined =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null') ??
  undefined;
