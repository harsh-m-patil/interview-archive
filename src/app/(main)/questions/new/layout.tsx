export default function CreateQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
