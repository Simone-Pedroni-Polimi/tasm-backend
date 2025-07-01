import type { ActivityType } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

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

  const { ActivityURL } = req.body
  if (!ActivityURL)
    return res.status(400).json({ error: "missing property: ActivityURL" })

  if (typeof ActivityURL !== "string")
    return res.status(400).json({ error: "ActivityURL must be a string" })

  try {
    const { data } = await supabase
      .from("Activity")
      .select(
        `
        Title,
        Description,
        BannerImageURL,
        URL,
        YogaCategoryId,
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
            TeacherId,
            Name,
            Mantra,
            MainImageURL,
            URL,
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
      .eq("URL", ActivityURL)
      .single()

    if (!data) {
      return res.status(404).json({
        error: `${ActivityURL} - This activity is not available!`,
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
      url: data.URL ?? "No URL",
      yogaCategory: data.YogaCategoryId ?? 0,
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
        teacherId: Teacher.TeacherId ?? 0,
        name: Teacher.Name ?? "No Name",
        image: `/${Teacher.MainImageURL}`,
        mantra: Teacher.Mantra ?? "No Mantra",
        url: Teacher.URL ?? "No URL",
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
