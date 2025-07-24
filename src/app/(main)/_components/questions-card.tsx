import { UserAvatar } from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { QuestionsType } from "@/types";
import { redirect } from "next/navigation";

export const QuestionsCard = ({ question }: { question: QuestionsType }) => {
  const handleClick = () => {
    redirect(`/questions/${question.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      className="w-full h-full flex flex-col transition-all hover:shadow-md hover:scale-[1.02] group"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between text-lg sm:text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          <p>{question.title}</p>
          {question.Company && <Badge>{question.Company?.name}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
          {question.content}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-3 mt-auto">
        <div className="flex items-center gap-2 w-full">
          <UserAvatar src={question.createdBy.image!} />
          <span className="text-sm font-medium truncate">
            {question.createdBy.name}
          </span>
        </div>
        {question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 w-full">
            {question.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
