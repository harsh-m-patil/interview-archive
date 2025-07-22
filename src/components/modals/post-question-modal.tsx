"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z
  .object({
    question: z.string(),
    questionLink: z.url().optional(),
  })
  .refine((data) => data.question || data.questionLink, {
    message: "Either Question or QuestionLink must be provided",
    path: ["question", "questionLink"],
  });

export const PostQuestionModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "postQuestion";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

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
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Post a Question
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Share your question with the community and get help from others.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Question
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-500/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter your question here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Question Link
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-500/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter question link (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button disabled={isLoading}>Post</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
