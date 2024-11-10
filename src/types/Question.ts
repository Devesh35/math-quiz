type QuestionOperator = '+' | '-';

export type QuestionClient = {
  id: string;
  number1: number;
  number2: number;
  operator: QuestionOperator;
};

export type QuestionServer = {
  id: string;
  number1: number;
  number2: number;
  operator: QuestionOperator;
};
