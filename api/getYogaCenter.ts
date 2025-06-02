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
    let room: YogaCenter["rooms"] | undefined = undefined
    let n: number = 0
    function evenOrOdd(n: number) {
      if (n % 2 === 0){
        n++;
        return true;
      } else {
        n++;
        return false;
      }
    }

    room = data.Room.map(({ Room }) => ({
        name: Room.name ?? "No room name",
        text: Room.text ?? "No room text",
        urlImage: `/images/${Room.UrlImage}`,
        altDescription: Room.name + " room",
        imageOnTheRight: evenOrOdd(n)
      })
    )
  
    const yogaCenter: YogaCenter = {
      title: data.Title ?? "No title",
      subtitle: data.Subtitle ?? "No subtitle",
      description: data.LongDescription ?? "No description",
      room
    }

    res.status(200).json(yogaCenter)
  }
}
