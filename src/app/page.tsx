import { Form, Score, Solved } from '@mq/design';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold text-center">
          Test your Math skills
        </h1>
        <Form />
        <Score />
        <Solved />
      </main>
    </div>
  );
}
