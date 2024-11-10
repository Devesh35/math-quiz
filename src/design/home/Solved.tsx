'use client';

import { useSolved } from '../hooks';

const formatUser = (user: string) => `User_${user.substring(0, 8)}`;

export const Solved = () => {
  const { solved } = useSolved();

  return (
    <div className="flex flex-col gap-2 items-center w-[320px]">
      {solved.map(({ question: q, ...s }, index) => (
        <div
          key={s.id}
          className="text-lg text-gray-500 m-1 p-2 rounded-md flex flex-row gap-4 justify-center items-center border border-gray-500 w-full"
          style={{ opacity: 1 - Math.max(index - 1, 0) / 5 }}
        >
          <span>{formatUser(s.solvedBy)}</span>{' '}
          <span>
            {q.number1} {q.operator} {q.number2}
          </span>{' '}
          = <span>{s.answer}</span>
        </div>
      ))}
    </div>
  );
};
