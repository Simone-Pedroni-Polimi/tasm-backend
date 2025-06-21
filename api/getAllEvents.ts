import type { VercelRequest, VercelResponse } from "@vercel/node"
import type { Event } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase.from("Event").select(`
      EventId,
      Name,
      Subtitle,
      BannerImageURL,
      Date,
      StartTime,
      EndTime,
      Location,
      URL,
      GuestEvent (
        Guest (
          Name,
          MainImageURL
        )
      ),
      TeacherEvent (
        Teacher (
          Name,
          MainImageURL,
          TeacherActivity (
            Activity (
              Title
            )
          )
        )
      )
    `).order('Date', { ascending: true })

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    const events: Event[] = data.map((e) => {
      const host: { name: string; image: string } = {
        name:
          e.GuestEvent[0]?.Guest?.Name ??
          e.TeacherEvent[0]?.Teacher?.Name ??
          "No Name",
        image:
          e.GuestEvent[0]?.Guest?.MainImageURL ??
          e.TeacherEvent[0]?.Teacher?.MainImageURL ??
          "notfound.jpg",
      }

      return {
        title: e.Name ?? "No Name",
        date: e.Date ?? "No Date",
        startTime: e.StartTime ?? "No Start Time",
        endTime: e.EndTime ?? "No End Time",
        location: e.Location ?? "The Yoga Center",
        url: e.URL ?? "No URL",
        hostName: host.name,
        hostImage: `/images/${host.image}`,
        eventId: e.EventId,
        eventImage: `/images/${e.BannerImageURL}`,
        activityTags:
          e.TeacherEvent[0]?.Teacher?.TeacherActivity?.filter?.(
            (a) => a.Activity.Title
          ).map((a) => ({ text: a.Activity.Title ?? "other" })) ?? [],
      }
    })

    res.status(200).json(events)
  }
}
