import { Streamdown } from "streamdown";
import { getQuestion } from "@/actions/questions";
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
      <div className="flex h-96 items-center justify-center text-5xl tracking-tighter">
        404 Not Found
      </div>
    );
  }

  if (reason === "INTERNAL_SERVER_ERROR") {
    return (
      <div className="flex h-96 items-center justify-center text-5xl tracking-tighter">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between gap-1 px-4">
          <h2 className="text-balance font-semibold text-xl md:text-2xl">
            {question.title}
          </h2>
          <div className="flex items-center gap-3 rounded-md border px-2 py-2">
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
      <div className="px-4">
        <Streamdown className="max-w-5xl text-foreground/80">
          {question.description}
        </Streamdown>
      </div>
    </div>
  );
}
