import type { VercelRequest, VercelResponse } from "@vercel/node"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase.from("YogaCategory").select(`
      Title,
      Description
    `)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json(
      data.map((c) => ({
        title: c.Title ?? "No Title",
        description: c.Description ?? "No Description",
      }))
    )
  }
}
