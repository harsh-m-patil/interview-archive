"use client";

import { useState } from "react";
import { Streamdown } from "streamdown";
import { Loading } from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import AnswerForm from "./answer-form";

export default function Answers({ questionId }: { questionId: string }) {
  const { data: res, status } = trpc.answers.get.useQuery({ questionId });
  const [visible, setVisible] = useState(false);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error" || !res) {
    return (
      <div className="flex h-96 items-center justify-center text-rose-400 text-xl tracking-tighter selection:bg-rose-100 selection:text-rose-700 md:text-3xl lg:text-4xl">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      <div className="border-t px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="mr-2 font-semibold text-lg md:text-xl">
            Answers By Community
          </h3>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => setVisible((prev) => !prev)}
          >
            Answer
          </Button>
        </div>
      </div>
      <div className="min-h-24 border-y px-4 py-3">
        {visible && <AnswerForm questionId={questionId} />}
        {res.data.length === 0 ? (
          <div className="flex h-96 items-center justify-center text-emerald-400 text-xl tracking-tighter selection:bg-emerald-100 selection:text-emerald-700 md:text-3xl lg:text-4xl">
            No answers yet maybe you can help
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {res.data.map((answer) => (
              <Card key={answer.id}>
                <CardContent>
                  <Streamdown>{answer.content}</Streamdown>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
