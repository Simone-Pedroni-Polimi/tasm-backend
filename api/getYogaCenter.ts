import type { VercelRequest, VercelResponse } from "@vercel/node"
import { YogaCenter } from "../lib/types/responses.types"
import { Room } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase
    .from("YogaCenter")
    .select(
      `
      Title,
      Subtitle,
      LongDescription,
      Room (Name, Text, UrlImage)
    `
    )
    .single()

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    let n: number = 0
    function evenOrOdd() {
      if (n % 2 === 0) {
        n++
        return true
      } else {
        n++
        return false
      }
    }

    const rooms: Room[] = data.Room.map((Room) => ({
      title: Room.Name ?? "No room name",
      description: Room.Text ?? "No room description",
      imgUrl: `/images/${Room.UrlImage}`,
      altDescription: Room.Name + " room",
      imageOnTheRight: evenOrOdd(),
    }))

    const yogaCenter: YogaCenter = {
      title: data.Title ?? "No title",
      subtitle: data.Subtitle ?? "No subtitle",
      description: data.LongDescription ?? "No description",
      rooms,
    }

    res.status(200).json(yogaCenter)
  }
}
