'use server'

import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "diary.json")

type DiaryEntry = {
  id: string
  title: string
  content: string
  date: string
}

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Errorreading diary entries: ", error)
    return []
  }
}

export async function getDiaryEntry(id: string): Promise<DiaryEntry | null> {
  const entries = await getDiaryEntries()
  return entries.find((entry) => entry.id === id) || null
}

export async function addDiaryEntry(prevState: string | null, formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const date = new Date().toISOString()

  const entries = await getDiaryEntries()
  const newEntry = { id: Date.now().toString(), title, content, date }
  entries.push(newEntry)
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2))

  return "Entry added successfully"
}
