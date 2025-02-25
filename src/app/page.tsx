import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDiaryEntries } from "@/lib/diary";
import Link from "next/link";

export default async function Home() {
  const entries = await getDiaryEntries()
  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Entries</h2>
        <Link href={"/new"}>
          <Button>New Entry</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="hover:scale-105 transition-all hover:ring-2 hover:ring-neutral-50 group">
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
              <p className="my-2 line-clamp-3 text-pretty text-gray-400 group-hover:text-gray-200">{entry.content}</p>
              <Link href={`/entry/${entry.id}`} className="mt-4 text-sky-500 hover:underline">
                Read More</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
