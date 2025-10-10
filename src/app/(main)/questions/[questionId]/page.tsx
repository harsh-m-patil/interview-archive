import { Streamdown } from "streamdown";
import { getQuestion } from "@/actions/questions";
import { AiAnswer } from "@/components/custom/questions/ai-answer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type QuestionPageProps = {
  params: Promise<{
    questionId: string;
  }>;
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { questionId } = await params;

  if (!questionId) {
    return <div>400 Bad Request Please Provide a Question Id</div>;
  }

  // TODO: replace with a trpc api call reason: NO SEMANTIC HTTP STATUS CODES
  const { data: question, reason } = await getQuestion(questionId);

  if (reason === "NOT_FOUND") {
    return (
      <div className="flex h-96 items-center justify-center text-xl tracking-tighter md:text-3xl lg:text-4xl xl:text-5xl">
        404 Not Found
      </div>
    );
  }

  if (reason === "INTERNAL_SERVER_ERROR") {
    return (
      <div className="flex h-96 items-center justify-center text-xl tracking-tighter md:text-3xl lg:text-4xl xl:text-5xl">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="border-b pb-4">
        <div className="flex flex-col justify-between gap-4 px-4 py-2 md:flex-row md:items-center">
          <h2 className="font-semibold text-xl md:text-2xl">
            {question.title}
          </h2>
          <div className="flex max-w-sm items-center gap-3 overflow-hidden rounded-md border px-2 py-2">
            <Avatar>
              <AvatarImage
                alt={question.userName || "Deleted User"}
                src={question.userImage || "/placeholder.png"}
              />
              <AvatarFallback>HP</AvatarFallback>
            </Avatar>
            <p>{question.userName || "Deleted User"}</p>
          </div>
        </div>
        <Badge className="mb-2 ml-4 rounded-full px-4 py-1" variant="secondary">
          {question.company || "Unknown"}
        </Badge>
      </div>
      <div className="mb-2 px-4 py-3">
        <Streamdown className="max-w-5xl text-foreground/80">
          {question.description}
        </Streamdown>
      </div>
      <AiAnswer
        aiAnswer={question.aiAnswer}
        description={question.description}
        questionId={questionId}
        title={question.title}
      />
    </div>
  );
}
