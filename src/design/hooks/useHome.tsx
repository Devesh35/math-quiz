import { useToast } from '@mq/design';
import { saveSolution } from '@mq/repo';
import { FormEventHandler, useState } from 'react';
import { useQuestion } from './useQuestion';

export const useHome = () => {
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const { isFetchingQuestion, question, setIsFetchingQuestion } = useQuestion();

  const { showToast } = useToast();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!question) return;

    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;

    const enteredAnswer = Number(input.value);
    const correctAnswer =
      question.operator === '+'
        ? question.number1 + question.number2
        : question.number1 - question.number2;

    if (enteredAnswer === correctAnswer) {
      setIsLoadingResponse(true);
      saveSolution(question, enteredAnswer)
        .then(() => {
          showToast('Correct Answer!', 'success');
          input.value = '';
          setIsLoadingResponse(false);
          setIsFetchingQuestion(true);
        })
        .catch((e) => {
          console.log(e);
          showToast('Unable to save !', 'warning');
        });
    } else {
      showToast('Incorrect Answer!', 'error');
    }
  };

  return {
    isLoadingResponse,
    isFetchingQuestion,
    question,
    onSubmit,
  };
};
