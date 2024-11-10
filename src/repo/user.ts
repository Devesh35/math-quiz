import { COLLECTIONS } from '@mq/config';
import { getDocReference, storeDocById } from '@mq/db';
import { User } from '@mq/types';
import { createUser, getUser, storeUser } from '@mq/utils';
import { onSnapshot } from 'firebase/firestore';

const storeNewUser = async (user: User) =>
  await storeDocById(COLLECTIONS.USERS, user.id, user).then(() => {
    storeUser(user);
    return user;
  });

export const loadCurrentUser = async () => {
  const user = getUser();
  if (!user) return await storeNewUser(createUser());

  return getUser();
};

export const userSnapshot = (userId: string, cb: (user: User) => void) =>
  onSnapshot(getDocReference(COLLECTIONS.USERS, userId), (snapshot) => {
    const user = snapshot.data() as User;
    cb(user);
  });
