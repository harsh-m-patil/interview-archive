"use client";

import { useGroupDetails } from "@/hooks/query/use-group-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/avatar";
import { formatDate } from "@/lib/date";
import {
  CalendarDays,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { ModalButton } from "../../_components/modal-button";

type GroupDetailsPageProps = {
  params: Promise<{
    groupId: string;
  }>;
};

export default function GroupDetailsPage({ params }: GroupDetailsPageProps) {
  const { groupId } = React.use(params);
  const { data: group, isLoading, error } = useGroupDetails(groupId);

  const copyInviteLink = () => {
    if (group?.inviteCode) {
      const inviteUrl = `${window.location.origin}/groups/invite/${group.inviteCode}`;
      navigator.clipboard.writeText(inviteUrl);
      toast.success("Invite link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600">
              Error loading group details: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Group not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {group.imageUrl && (
            <Image
              src={group.imageUrl}
              alt={group.name}
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {group.name}
              {group.isPrivate ? (
                <Lock className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Globe className="h-5 w-5 text-muted-foreground" />
              )}
            </h1>
            <p className="text-muted-foreground">
              Created by {group.user.name} on {formatDate(group.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <ModalButton action="postQuestion">
            <Plus className="h-4 w-4" />
            Post Question
          </ModalButton>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Questions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Questions ({group.questions.length})
              </CardTitle>
              <CardDescription>
                Questions posted in this group
              </CardDescription>
            </CardHeader>
            <CardContent>
              {group.questions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No questions have been posted in this group yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {group.questions.map((question: { 
                    id: string; 
                    title: string; 
                    content: string; 
                    createdAt: string; 
                    createdBy: { name: string; image?: string }; 
                    Company?: { name: string }; 
                    role?: { name: string }; 
                    tags: { id: string; name: string }[]; 
                    answers: { id: string }[] 
                  }) => (
                    <Card key={question.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">
                              <Link
                                href={`/questions/${question.id}`}
                                className="hover:underline"
                              >
                                {question.title}
                              </Link>
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <UserAvatar
                                src={question.createdBy.image || undefined}
                                className="h-5 w-5"
                              />
                              <span>by {question.createdBy.name}</span>
                              <span>•</span>
                              <CalendarDays className="h-4 w-4" />
                              <span>{formatDate(question.createdAt)}</span>
                              <span>•</span>
                              <MessageSquare className="h-4 w-4" />
                              <span>{question.answers.length} answers</span>
                            </div>
                          </div>
                          <Link href={`/questions/${question.id}`}>
                            <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {question.content}
                        </p>
                        {(question.Company || question.role || question.tags.length > 0) && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {question.Company && (
                              <Badge variant="secondary">{question.Company.name}</Badge>
                            )}
                            {question.role && (
                              <Badge variant="outline">{question.role.name}</Badge>
                            )}
                            {question.tags.map((tag: { id: string; name: string }) => (
                              <Badge key={tag.id} variant="outline">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Members ({group.members.length})
              </CardTitle>
              <CardDescription>People in this group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {group.members.map((member: {
                  id: string;
                  role: string;
                  user: { name: string; email: string; image?: string }
                }) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar src={member.user.image || undefined} className="h-8 w-8" />
                      <div>
                        <p className="text-sm font-medium">{member.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.user.email}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        member.role === "ADMIN"
                          ? "default"
                          : member.role === "MODERATOR"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {member.role.toLowerCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invite Link */}
          {group.inviteCode && (
            <Card>
              <CardHeader>
                <CardTitle>Invite Others</CardTitle>
                <CardDescription>
                  Share this link to invite others to the group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded border break-all">
                    {`${typeof window !== "undefined" ? window.location.origin : ""}/groups/invite/${group.inviteCode}`}
                  </div>
                  <Button onClick={copyInviteLink} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}