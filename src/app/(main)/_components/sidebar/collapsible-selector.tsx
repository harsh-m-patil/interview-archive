import { UserAvatar } from "@/components/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ReactNode } from "react";

interface Props<T> {
  data: T[];
  onToggle: (item: T) => void;
  queryKey: string;
  icon?: ReactNode;
}
export function CollapsibleSelect<
  T extends { id: string; name: string; imageUrl?: string },
>({ data, onToggle, queryKey, icon }: Props<T>) {
  const [selectedItemNames, setSelectedItemNames] = useQueryState(
    queryKey,
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const onToggleItem = (item: T) => {
    onToggle(item);

    setSelectedItemNames((prev) => {
      if (prev.includes(item.name)) {
        return prev.filter((name) => name !== item.name);
      } else {
        return [...prev, item.name];
      }
    });
  };

  return (
    <>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
          >
            <CollapsibleTrigger>
              <div className="flex items-center gap-2">
                {icon}
                <p className="capitalize text-md">{queryKey}</p>
              </div>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu className="p-2">
                {data.map((item) => {
                  const isSelected = selectedItemNames.includes(item.name);
                  return (
                    <SidebarMenuItem
                      key={item.id}
                      className={cn(
                        "cursor-pointer text-sm px-2 py-1 rounded-md",
                        isSelected && "bg-muted font-semibold",
                      )}
                      onClick={() => onToggleItem(item)}
                    >
                      <div className="flex items-center gap-2">
                        {item.imageUrl && (
                          <UserAvatar
                            src={item.imageUrl!}
                            className="size-6 md:size-6"
                          />
                        )}
                        {item.name}
                      </div>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </>
  );
}
