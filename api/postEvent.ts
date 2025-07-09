import type { VercelRequest, VercelResponse } from "@vercel/node"
import type { EventType } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  const { EventURL } = req.body
  if (!EventURL)
    return res.status(400).json({ error: "missing property: EventName" })

  if (typeof EventURL !== "string")
    return res.status(400).json({ error: "EventName must be a string" })

  const { data, error } = await supabase
    .from("Event")
    .select(
      `
      EventId,
      Name,
      Subtitle,
      URL,
      BannerImageURL,
      Date,
      ShortIntroduction,
      Description,
      PracticalInfo,
      StartTime,
      EndTime,
      Location,
      Program,
      GuestEvent (
        Guest (
          Name,
          Description,
          MainImageURL
        )
      ),
      TeacherEvent (
        Teacher (
          TeacherId,
          Name,
          Mantra,
          URL,
          MainImageURL,
          TeacherActivity (
            Activity (
              Title
            )
          )
        )
      )
    `
    )
    .eq("URL", EventURL)
    .single()

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    let guest: EventType["guest"] | undefined = undefined

    const g = data.GuestEvent[0]?.Guest
    if (g && g.Name && g.Description && g.MainImageURL) {
      guest = {
        name: g.Name,
        description: g.Description,
        imageURL: `/images/${g.MainImageURL}`,
      }
    }

    const event: EventType = {
      title: data.Name ?? "No Name",
      subtitle: data.Subtitle ?? undefined,
      url: data.URL ?? "No URL",
      shortDesc: data.ShortIntroduction ?? "No Introduction",
      description: data.Description ?? "No Description",
      infostr: data.PracticalInfo ?? "No Info",
      mainImageURL: data.BannerImageURL ?? "notfound.jpg",
      date: data.Date ?? "No date",
      programstr: data.Program ?? "No Program Yet",
      teachers: data.TeacherEvent.map(({ Teacher }) => ({
        teacherId: Teacher.TeacherId ?? 0,
        name: Teacher.Name ?? "No Name",
        mantra: Teacher.Mantra ?? "No Mantra",
        image: Teacher.MainImageURL ?? "notfound.jpg",
        url: Teacher.URL ?? "No URL",
        activityTags: Teacher.TeacherActivity.filter(
          (a) => a.Activity.Title
        ).map((a) => ({ text: a.Activity.Title ?? "other" })),
      })),
      guest,
    }

    res.status(200).json(event)
  }
}
