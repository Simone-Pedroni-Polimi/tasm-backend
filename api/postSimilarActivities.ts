import { supabase } from "../lib/supabase"

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  const { ActivityURL } = req.body
  if (!ActivityURL)
    return res.status(400).json({ error: "missing property: ActivityURL" })

  if (typeof ActivityURL !== "string")
    return res.status(400).json({ error: "ActivityURL must be a string" })

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

    if (!data) {
      return res.status(404).json({
        error: `${ActivityURL} - This activity is not available!`,
      })
    }

    const postures = data.map((p) => ({
      posture: p.Posture ?? "No posture",
    }))

    return res.status(200).json(postures)

  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}