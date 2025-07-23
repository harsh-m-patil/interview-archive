import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { CalendarDays, Clock, User } from "lucide-react";

type QuestionPageProps = {
  params: Promise<{
    questionId: string;
  }>;
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { questionId } = await params;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const question = await db.question.findFirst({
    where: {
      id: questionId,
    },
    include: {
      tags: true,
      Company: true,
      role: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true,
          emailVerified: true,
        },
      },
    },
  });

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="mx-auto space-y-6 max-w-7xl mt-12">
        <Card className="shadow-sm w-full">
          <CardHeader className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
                {question.title}
              </h1>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Question Content */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Question
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                {question.content}
              </p>
            </div>

            <Separator />

            {/* Creator Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Created By
              </h3>

              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 lg:h-16 lg:w-16">
                  <AvatarImage
                    src={question.createdBy.image || "/placeholder.svg"}
                    alt={question.createdBy.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(question.createdBy.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <p className="font-medium text-foreground lg:text-lg">
                    {question.createdBy.name}
                  </p>
                  {question.createdBy.emailVerified && (
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Created
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {formatDate(question.createdAt)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {formatDate(question.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card className="shadow-sm w-full">
          <CardHeader>
            <h3 className="text-lg font-semibold">Additional Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 text-sm">
              <div>
                <span className="font-medium text-foreground">
                  Question ID:
                </span>
                <p className="text-muted-foreground font-mono text-xs mt-1 break-all">
                  {question.id}
                </p>
              </div>

              <div>
                <span className="font-medium text-foreground">Role:</span>
                <p className="text-muted-foreground text-xs mt-1">
                  {question.role?.name || "Not specified"}
                </p>
              </div>

              <div>
                <span className="font-medium text-foreground">Company:</span>
                <p className="text-muted-foreground text-xs mt-1">
                  {question.Company?.name || "Not specified"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
