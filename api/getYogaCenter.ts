import type { VercelRequest, VercelResponse } from "@vercel/node"
import { YogaCenter } from "../lib/types/responses.types"
import { Room } from "../lib/ypes/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase.from("YogaCenter").select(`
      Title,
      Subtitle,
      LongDescription,
      Room (Name, Text, UrlImage)
    `)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    let n: number = 1

    res.status(200).json(
        data.map((y) => ({
            title: y.Title ?? "No title",
            subtitle: y.Subtitle ?? "No subtitle",
            description: y.LongDesprition ?? "No description",
            rooms: data.map(() => ({
                name: y.Room.Name ?? "No room name",
                text: y.Room.Text ?? "No room text",
                urlImage: `/images/${y.Room.UrlImage}`,
                altDescription: y.Room.Name + "room",
                imageOnTheRight: () => {
                  if (n % 2 != 0) {
                    return true
                    n++
                  }
                  else return false
                }
              })
            )
        }))
    )
  }
}
