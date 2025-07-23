import { ModalProvider } from "@/components/providers/modal-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function MainLayOut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NuqsAdapter>
        <SidebarProvider>
          <AppSidebar />
          <ModalProvider />
          <SidebarTrigger />
          <div className="w-full">{children}</div>
        </SidebarProvider>
      </NuqsAdapter>
    </>
  );
}
