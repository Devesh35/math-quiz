import { loadCurrentUser, userSnapshot } from '@mq/repo';
import { User } from '@mq/types';
import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<User | null>();

  // Initial fetch
  useEffect(() => void loadCurrentUser().then(setUser), []);

  // Real-time fetch
  useEffect(() => {
    if (!user?.id) return;

    return userSnapshot(user.id, setUser);
  }, [user?.id]);

  return { user };
};
