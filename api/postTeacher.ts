import type { TeacherType } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  const { TeacherURL } = req.body
  if (!TeacherURL)
    return res.status(400).json({ error: "missing property: TeacherName" })

  if (typeof TeacherURL !== "string")
    return res.status(400).json({ error: "TeacherName must be a string" })

  try {
    const { data } = await supabase
      .from("Teacher")
      .select(
        `
      Name,
      Mantra,
      MainImageURL,
      URL,
      Description,
      History,
      BannerImageURL,
      TeacherActivity(
        Activity(
          Title,
          ShortDescription,
          BannerImageURL,
          Emoji,
          URL
        )
      ),
      TeacherEvent(
        Event(
          Date,
          StartTime,
          EndTime,
          Location,
          URL,
          BannerImageURL,
          Name,
          ShortIntroduction,
          GuestEvent(
            Guest(
              Name,
              MainImageURL
            )
          )
        )
      ),
      TeacherCert(
        Certification(
          Title
        )
      ),
      TeacherImages(
        Image(
          Name,
          URL
        )
      )
    `
      )
      .eq("URL", TeacherURL)
      .single()


    if (!data) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    const teacher: TeacherType = {
      name: data.Name ?? "No name",
      mantra: data.Mantra ?? "No mantra",
      description: data.Description ?? "No description",
      history: data.History ?? "No history",
      bannerImageURL: data.BannerImageURL ?? "No banner image",
      mainImageURL: `/images/${data.MainImageURL}`,
      certifications:
        data.TeacherCert.map(({ Certification }) => Certification.Title).filter(
          (C): C is string => !!C
        ) ?? [],
      specializations: data.TeacherActivity.map(({ Activity }) => ({
        title: `${Activity.Emoji} ${Activity.Title}`,
      })),
      activities: data.TeacherActivity.map(({ Activity }) => ({
        title: `${Activity.Title} ${Activity.Emoji}`,
        shortDescription: Activity.ShortDescription ?? "No description",
        bannerImageURL: `/images/${Activity.BannerImageURL}`,
        url: Activity.URL ?? "No URL",
      })),
      images: data.TeacherImages.map(({ Image }) => ({
        URL: Image.URL ?? "",
        alt: Image.Name ?? "Teacher image",
      })),
      events: data.TeacherEvent.map(({ Event }) => ({
        name: Event.Name ?? "No event name",
        shortIntroduction: Event.ShortIntroduction ?? "No introduction",
        date: Event.Date ?? "No event date",
        startTime: Event.StartTime ?? "No event start",
        endTime: Event.EndTime ?? "No event end",
        location: Event.Location ?? "No location",
        url: Event.URL ?? "No URL",
        guests:
          Event.GuestEvent.map(({ Guest }) => ({
            name: Guest.Name ?? "No guest name",
            mainImageURL: `/images/${Guest.MainImageURL}`,
          })) ?? [],
        bannerImageURL: `/images/${Event.BannerImageURL}`,
      })),
    }

    return res.status(200).json(teacher)
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}
