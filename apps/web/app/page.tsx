import { db } from "@/db"
import { questions } from "@/db/schema/schema"
import {
  Button
} from "@workspace/ui/components/button"

export default async function Page() {
  const questionsdata = await db.select().from(questions)
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        {JSON.stringify(questionsdata, null, 2)}
        <Button size="sm">Button</Button>
      </div>
    </div>
  )
}
