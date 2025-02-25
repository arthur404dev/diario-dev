'use client'

import { Input } from "@/components/ui/input"
import { addDiaryEntry } from "@/lib/diary"
import { useActionState } from "react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

import { toast } from "sonner"
import { redirect } from "next/navigation"
export function NewEntryForm() {
  const [state, formAction, pending] = useActionState(addDiaryEntry, null)

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div>
          <Input type="text" name="title" placeholder="Entry Title" required />
        </div>
        <div>
          <Textarea name="content" placeholder="Write your dirty codes here..." required rows={10} />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Entry"}
        </Button>
        {state && (toast.success(state) && redirect("/"))}
      </div>
    </form>
  )
}
