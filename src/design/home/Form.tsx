'use client';

import { QuestionClient } from '@mq/types';
import { useHome } from '../hooks';

const formatQuestion = (question?: QuestionClient) => {
  if (!question) return 'Loading...';
  return `${question.number1} ${question.operator} ${question.number2} = ?`;
};

export const Form = () => {
  const { isFetchingQuestion, isLoadingResponse, onSubmit, question } =
    useHome();

  return (
    <>
      <div
        className="p-4 rounded-md flex flex-col gap-4 items-center"
        style={{ width: 'fit-content' }}
      >
        <p className="text-lg text-gray-600 ">
          Enter the answer to the following question
        </p>
        <div className="flex gap-4 items-center">
          <span className="text-2xl font-bold">
            {isFetchingQuestion ? 'Loading.' : formatQuestion(question)}
          </span>
        </div>
      </div>
      <form
        className="flex gap-4 items-center flex-col sm:flex-row"
        onSubmit={onSubmit}
      >
        <input
          required
          autoFocus
          type="number"
          placeholder="Enter your answer"
          className="p-2 border border-gray-300 rounded-md bg-transparent"
        />
        <button
          type="submit"
          disabled={isLoadingResponse || isFetchingQuestion}
          className="p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-200 disabled:text-gray-500"
        >
          Check Answer
        </button>
      </form>
    </>
  );
};
