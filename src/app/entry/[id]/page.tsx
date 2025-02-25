import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getDiaryEntry } from "@/lib/diary"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const entry = await getDiaryEntry(id)
  if (!entry) {
    notFound()
  }

  return (
    <main className="h-96 flex items-center justify-center">
      <Card className="gap-6 p-8 border-2 border-neutral-50">
        <CardHeader>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">{new Date(entry.date).toLocaleDateString()}</p>
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </CardContent>
        <CardFooter>
          <Link href={"/"}>
            <Button>Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
