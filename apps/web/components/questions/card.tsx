import type { Question, Tag } from "@/db/schema/schema";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";

type QuestionCardProps = {
  question: Question;
  tags: Tag[];
  company?: string;
};

export function QuestionCard({ question, tags, company }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-lg">{question.title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm">
            {company || "Unknown"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mt-2 line-clamp-3 text-muted-foreground text-sm">
          {question.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
        <CardAction>
          <Link href={`/questions/${question.id}`}>
            <Button variant="secondary">
              Details <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

