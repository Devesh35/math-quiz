import { solvedSnapshot } from '@mq/repo';
import { SolvedClient } from '@mq/types';
import { useEffect, useState } from 'react';

export const useSolved = () => {
  const [solved, setSolved] = useState<SolvedClient[]>([]);

  useEffect(() => solvedSnapshot(setSolved), []);

  return { solved };
};
