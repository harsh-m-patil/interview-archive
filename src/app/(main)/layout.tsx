import { ModalProvider } from "@/components/providers/modal-provider";

export default function MainLayOut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ModalProvider />
      {children}
    </>
  );
}
