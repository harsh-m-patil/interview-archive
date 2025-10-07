import { trpc } from "@/trpc/server";

export default async function Home() {
  const data = await trpc.hello({ text: "World" });
  return <div>{data.greeting}</div>;
}
