import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Faq } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase.from("Faqs").select(`
      Question,
      Answer
    `)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json(
        data.map((f) => ({
            question: f.Question ?? "No question",
            answer: f.Answer ?? "No answer"
        }))
    )
  }
}