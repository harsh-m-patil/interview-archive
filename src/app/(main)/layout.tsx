import { ModalProvider } from "@/components/providers/modal-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function MainLayOut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <ModalProvider />
        <SidebarTrigger />
        <div className="px-2 py-4">{children}</div>
      </SidebarProvider>
    </>
  );
}
