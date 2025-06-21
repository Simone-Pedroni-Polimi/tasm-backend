import type { VercelRequest, VercelResponse } from "@vercel/node"
import { supabase } from "../lib/supabase"
import { Teacher } from "../lib/types/responses.types"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase.from("Teacher").select(`
      TeacherId,
      Name,
      Mantra,
      MainImageURL,
      URL,
      TeacherActivity(
        Activity(
          Title
        )
      )
    `)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    const teachers: Teacher[] = data.map((t) => ({
      teacherId: t.TeacherId ?? 0,
      name: t.Name ?? "No name",
      image: t.MainImageURL ?? "No image",
      mantra: t.Mantra ?? "No mantra",
      url: t.URL ?? "No URL",
      activityTags: t.TeacherActivity.map(({ Activity }) => ({
        text: Activity.Title ?? "No activity title",
      }))
    }))

    res.status(200).json(teachers)
  }
}