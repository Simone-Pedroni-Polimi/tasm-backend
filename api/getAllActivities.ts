import type { VercelRequest, VercelResponse } from "@vercel/node"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  const { data, error } = await supabase.from("Activity").select(`*`)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json(data)
  }
}
