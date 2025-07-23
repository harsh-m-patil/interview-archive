"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Tag } from "@/generated/prisma";
import { X } from "lucide-react";

const formSchema = z
  .object({
    title: z.string(),
    content: z.string().optional(),
    link: z.url().optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine((data) => data.content || data.link, {
    message: "Either content or link must be provided",
    path: ["content", "link"],
  });

export const PostQuestionModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "postQuestion";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      link: undefined,
      tags: [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/tags");
        const data = await res.json();
        setAllTags(data);
      } catch (err) {
        console.error("[FETCH_TAGS]", err);
      }
    };

    fetchTags();
  }, []);

  const selectedTags = form.watch("tags");

  const toggleTag = (tagId: string) => {
    const current = form.getValues("tags") || [];
    if (current.includes(tagId)) {
      form.setValue(
        "tags",
        current.filter((id) => id !== tagId)
      );
    } else {
      form.setValue("tags", [...current, tagId]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error("[PostQuestion] Error posting question:", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="sr-only">Post a Question</DialogTitle>
          <DialogDescription className="text-center">
            Share your question with the community and get help from others.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Question title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Question</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Enter question content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Question Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter question link (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tag Selector */}
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Tags</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          {selectedTags?.length === 0
                            ? "Select tags"
                            : `${selectedTags?.length} tag(s) selected`}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search tags..." />
                          <CommandList>
                            <CommandEmpty>No tags found.</CommandEmpty>
                            {allTags.map((tag) => (
                              <CommandItem
                                key={tag.id}
                                onSelect={() => toggleTag(tag.id)}
                                className={cn(
                                  "cursor-pointer",
                                  selectedTags?.includes(tag.id) && "bg-muted"
                                )}
                              >
                                {tag.name}
                                {selectedTags?.includes(tag.id) && (
                                  <X className="ml-auto h-4 w-4 text-muted-foreground" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading}>Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
