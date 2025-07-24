"use client";

import * as React from "react";
import { BadgeQuestionMark, Command, Sidebar, Tag, Users } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ModalType, useModal } from "@/hooks/use-modal-store";

export function AppCommands() {
  const [open, setOpen] = React.useState(false);
  const { onOpen } = useModal();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelect = (action: ModalType) => {
    setOpen(false);
    onOpen(action);
  };

  return (
    <>
      <p className="text-muted-foreground text-sm mx-auto p-2">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => onSelect("postQuestion")}>
              <BadgeQuestionMark />
              <span>Post a Question</span>
            </CommandItem>
            <CommandItem onSelect={() => onSelect("createTag")}>
              <Tag />
              <span>Create a Tag</span>
            </CommandItem>
            <CommandItem onSelect={() => onSelect("createCompany")}>
              <Users />
              <span>Add a Company</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Shortcuts">
            <CommandItem>
              <Sidebar />
              <span>Toggle Sidebar</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Command />
              <span>Open Command Menu</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
