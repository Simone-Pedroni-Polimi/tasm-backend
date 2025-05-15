import { describe } from "node:test"
import { supabase } from "../lib/supabase-typed"

export type Teacher = {
  name: string
  image: string
  mantra: string
  activityTags: Array<{ text: string }>
}

interface ActivityType {
  title: string
  mainImageURL: string
  description: string
  nextLessons: {
    date: string
    time: string
    name: string
    difficulty: string
  }[]
  teachers: Teacher[]
  info: {
    name: string
    description: string
  }[][]
  images: {
    URL: string
    alt: string
  }[]
}

const levelMap: Record<string, string> = {
  Beginner: "🌿 Easy",
  Intermediate: "🌀 Medium",
  Expert: "🔥 Hard",
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  const { ActivityTitle } = req.body
  if (!ActivityTitle)
    return res.status(400).json({ error: "missing property: ActivityTitle" })

  if (typeof ActivityTitle !== "string")
    return res.status(400).json({ error: "ActivityTitle must be a string" })

  try {
    const { data, error } = await supabase
      .from("Activity")
      .select(
        `
        Title,
        Description,
        BannerImageURL,
        ActivitySchedule (
          Schedule (
            StartTime,
            EndTime,
            Level,
            DayOfWeek
          )
        ),
        TeacherActivity (
          Teacher (
            Name,
            Mantra,
            MainImageURL,
            TeacherActivity (
              Activity (
                Title
              )
            )
          )
        ),
        ActivityImages (
          Image (
            Name,
            URL
          )
        ),
        PracticalInfo (
          Title,
          Description,
          Level
        )
      `
      )
      .eq("Title", ActivityTitle)
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    if (!data) {
      return res.status(404).json({
        error: `${ActivityTitle}\nNo one with this name works with us!`,
      })
    }

    const easyInfo = data.PracticalInfo.filter(
      (i) => i.Level === "Beginner"
    ).map((i) => ({
      name: i.Title ?? "No Name",
      description: i.Description ?? "No Description",
    }))

    const mediumInfo = data.PracticalInfo.filter(
      (i) => i.Level === "Intermediate"
    ).map((i) => ({
      name: i.Title ?? "No Name",
      description: i.Description ?? "No Description",
    }))

    const hardInfo = data.PracticalInfo.filter((i) => i.Level === "Expert").map(
      (i) => ({
        name: i.Title ?? "No Name",
        description: i.Description ?? "No Description",
      })
    )

    const activity: ActivityType = {
      title: data.Title ?? "No Title",
      description: data.Description ?? "No Description",
      mainImageURL: `${data.BannerImageURL}`,
      nextLessons: data.ActivitySchedule.map(({ Schedule }, i) => {
        const start = (Schedule.StartTime ?? "00:00:00").substring(0, 5)
        const end = (Schedule.EndTime ?? "00:00:00").substring(0, 5)

        const s = start.split(":").map((s) => parseInt(s))
        const e = end.split(":").map((s) => parseInt(s))
        const duration = (e[0] - s[0]) * 60 + (e[1] - s[1])

        return {
          date: Schedule.DayOfWeek ?? "No Date",
          difficulty: levelMap[Schedule.Level ?? "Beginner"],
          name: `Lesson ${i + 1}`,
          time: `${Schedule.StartTime} - ${Schedule.EndTime} (${duration}m)`,
        }
      }).splice(0, 5),
      images: data.ActivityImages.map(({ Image }) => ({
        URL: Image.URL ?? "",
        alt: Image.Name ?? `${data.Title} Image`,
      })),
      info: [easyInfo, mediumInfo, hardInfo],
      teachers: data.TeacherActivity.map(({ Teacher }) => ({
        name: Teacher.Name ?? "No Name",
        image: `/${Teacher.MainImageURL}`,
        mantra: Teacher.Mantra ?? "No Mantra",
        activityTags: Teacher.TeacherActivity.map((a) => ({
          text: a.Activity.Title ?? "other",
        })),
      })).splice(0, 3),
    }

    return res.status(200).json(activity)
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}
