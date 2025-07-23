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
import { PlusCircle, X, Check } from "lucide-react";
import { useTags } from "@/hooks/query/use-tags";
import { useCompanies } from "@/hooks/query/use-companies";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z
  .object({
    title: z.string(),
    content: z.string().optional(),
    link: z.url().optional(),
    tags: z.array(z.string()).optional(),
    companyId: z.string().optional(),
  })
  .refine((data) => data.content || data.link, {
    message: "Either content or link must be provided",
    path: ["content", "link"],
  });

export const PostQuestionModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isModalOpen = isOpen && type === "postQuestion";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      link: undefined,
      tags: [],
      companyId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { data: allTags, isLoading: loadingTags, error: tagsError } = useTags();
  const {
    data: allCompanies,
    isLoading: loadingCompanies,
    error: companiesError,
  } = useCompanies();

  const selectedTags = form.watch("tags");
  const selectedCompany = form.watch("companyId");

  const toggleTag = (tagId: string) => {
    const current = form.getValues("tags") || [];
    if (current.includes(tagId)) {
      form.setValue(
        "tags",
        current.filter((id) => id !== tagId),
      );
    } else {
      form.setValue("tags", [...current, tagId]);
    }
  };

  const selectCompany = (companyId: string) => {
    form.setValue("companyId", companyId);
  };

  const clearCompany = () => {
    form.setValue("companyId", undefined);
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

      queryClient.invalidateQueries({
        queryKey: ["questions"],
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

  // Get selected company name for display
  const selectedCompanyName = selectedCompany
    ? allCompanies?.find((company) => company.id === selectedCompany)?.name
    : null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="sr-only">Post a Question</DialogTitle>
          <DialogDescription className="text-center">
            Share your question with the community help others.
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
                          disabled={isLoading || loadingTags}
                        >
                          {loadingTags
                            ? "Loading tags..."
                            : selectedTags?.length === 0
                              ? "Select tags"
                              : `${selectedTags?.length} tag(s) selected`}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search tags..." />
                          <CommandList>
                            {loadingTags ? (
                              <div className="flex items-center justify-center py-6">
                                <div className="text-sm text-muted-foreground">
                                  Loading tags...
                                </div>
                              </div>
                            ) : tagsError ? (
                              <div className="flex items-center justify-center py-6">
                                <div className="text-sm text-destructive">
                                  Failed to load tags
                                </div>
                              </div>
                            ) : !allTags || allTags.length === 0 ? (
                              <CommandEmpty className="flex justify-between items-center p-2 text-sm">
                                No tags available.
                                <Button
                                  className="size-5"
                                  variant="ghost"
                                  onClick={() => onOpen("createTag")}
                                >
                                  <PlusCircle className="size-4" />
                                </Button>
                              </CommandEmpty>
                            ) : (
                              <>
                                <CommandEmpty className="flex justify-between items-center p-2 text-sm">
                                  No tags available.
                                  <Button
                                    className="size-5"
                                    variant="ghost"
                                    onClick={() => onOpen("createTag")}
                                  >
                                    <PlusCircle className="size-4" />
                                  </Button>
                                </CommandEmpty>
                                {allTags.map((tag) => (
                                  <CommandItem
                                    key={tag.id}
                                    onSelect={() => toggleTag(tag.id)}
                                    className={cn(
                                      "cursor-pointer",
                                      selectedTags?.includes(tag.id) &&
                                        "bg-muted",
                                    )}
                                  >
                                    {tag.name}
                                    {selectedTags?.includes(tag.id) && (
                                      <X className="ml-auto h-4 w-4 text-muted-foreground" />
                                    )}
                                  </CommandItem>
                                ))}
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Selector - Single Selection */}
              <FormField
                control={form.control}
                name="companyId"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Company</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between text-left"
                          disabled={isLoading || loadingCompanies}
                        >
                          <span>
                            {loadingCompanies
                              ? "Loading companies..."
                              : selectedCompanyName || "Select a company"}
                          </span>
                          {selectedCompany && (
                            <X
                              className="h-4 w-4 text-muted-foreground hover:text-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearCompany();
                              }}
                            />
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search companies..." />
                          <CommandList>
                            {loadingCompanies ? (
                              <div className="flex items-center justify-center py-6">
                                <div className="text-sm text-muted-foreground">
                                  Loading companies...
                                </div>
                              </div>
                            ) : companiesError ? (
                              <div className="flex items-center justify-center py-6">
                                <div className="text-sm text-destructive">
                                  Failed to load companies
                                </div>
                              </div>
                            ) : !allCompanies || allCompanies.length === 0 ? (
                              <CommandEmpty className="flex justify-between items-center p-2 text-sm">
                                No companies available.
                                <Button
                                  className="size-5"
                                  variant="ghost"
                                  onClick={() => onOpen("createCompany")}
                                >
                                  <PlusCircle className="size-4" />
                                </Button>
                              </CommandEmpty>
                            ) : (
                              <>
                                <CommandEmpty className="flex justify-between items-center p-2 text-sm">
                                  No companies available.
                                  <Button
                                    className="size-5"
                                    variant="ghost"
                                    onClick={() => onOpen("createCompany")}
                                  >
                                    <PlusCircle className="size-4" />
                                  </Button>
                                </CommandEmpty>
                                {allCompanies.map((company) => (
                                  <CommandItem
                                    key={company.id}
                                    onSelect={() => selectCompany(company.id)}
                                    className={cn(
                                      "cursor-pointer",
                                      selectedCompany === company.id &&
                                        "bg-muted",
                                    )}
                                  >
                                    {company.name}
                                    {selectedCompany === company.id && (
                                      <Check className="ml-auto h-4 w-4 text-primary" />
                                    )}
                                  </CommandItem>
                                ))}
                              </>
                            )}
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
