import { supabase } from "../lib/supabase"

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" })

  try {
    const { data } = await supabase
      .from("ActivityScore")
      .select(`
        ActivityId,
        Posture,
        MindfulnessConcentration,
        PhysicalFlow,
        Difficulty,
        Accessibility
      `)

    const postures = data.map((p) => ({
      posture: p.Posture ?? 0,
    }))

    return res.status(200).json(postures)

  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}