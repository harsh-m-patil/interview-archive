import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { QuestionsWithUser } from "@/types";

export const QuestionsCard = ({
  question,
}: {
  question: QuestionsWithUser;
}) => {
  return (
    <Card className="w-full h-full flex flex-col transition-all hover:shadow-md hover:scale-[1.02] group">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {question.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
          {question.content}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-3 mt-auto">
        <div className="flex items-center gap-2 w-full">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={question.createdBy.image!} />
            <AvatarFallback className="text-xs">
              {question.createdBy.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
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
