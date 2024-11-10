'use client';

import { useUser } from '../hooks';

export const Score = () => {
  const { user } = useUser();

  return (
    <p className="text-lg text-gray-600">
      {user?.score ? (
        <>
          You have answered{' '}
          <span className="text-2xl font-bold">{user?.score}</span> questions
          correctly
        </>
      ) : (
        <>Start answering questions to see your score</>
      )}
    </p>
  );
};
