import type { VercelRequest, VercelResponse } from "@vercel/node"
import type {
  YogaCenterHomePage,
  Activity,
  Teacher,
  Event,
} from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

interface ResponseData {
  yogaCenter: YogaCenterHomePage
  activities: Activity[]
  events: Event[]
  teachers: Teacher[]
}

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" })

  try {
    console.log("Retrieving Yoga Center")
    const { data: dataYogaCenter } = await supabase
      .from("YogaCenter")
      .select(
        `
        Title,
        Subtitle,
        ShortOverview
      `
      )
      .limit(1)
      .maybeSingle()

    console.log("Retrieving Teachers")
    const { data: dataTeachers } = await supabase.from("Teacher").select(`
        Name,
        Mantra,
        MainImageURL,
        TeacherActivity(
          Activity(
            Title
          )
        )
      `)
    if (!dataTeachers) throw new Error("No Teachers in DB")

    console.log("Retrieving Activities")
    const { data: dataActivities } = await supabase.from("Activity").select(`
      Title,
      BannerImageURL
    `)
    if (!dataActivities) throw new Error("No Activities in DB")

    console.log("Retrieving Events")
    const { data: dataEvents } = await supabase.from("Event").select(`
        EventId,
        Date,
        StartTime,
        EndTime,
        Location,
        BannerImageURL,
        Name,
        ShortIntroduction,
        GuestEvent(
          Guest(
            Name,
            MainImageURL
          )
        ),
        TeacherEvent(
          Teacher(
            Name,
            MainImageURL,
            TeacherActivity(
              Activity(
                Title
              )
            )  
          )
        )
      `)
    if (!dataEvents) throw new Error("No Events in DB")

    console.log("Composing Response")

    const yogaCenter: YogaCenterHomePage = {
      title: dataYogaCenter?.Title ?? "No Title",
      subtitle: dataYogaCenter?.Subtitle ?? "No Title",
      description: dataYogaCenter?.ShortOverview ?? "No Description",
      imageOnTheRight: false,
    }

    console.log("Center ok", JSON.stringify(yogaCenter, null, 2))

    const activities: Activity[] = dataActivities.map((activity) => ({
      title: activity.Title ?? "No Title",
      image: `/images/${activity.BannerImageURL}`
      
    }))

    console.log("Activities ok", JSON.stringify(activities, null, 2))

    const events: Event[] = dataEvents.map((e) => {
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

    console.log("Events ok", JSON.stringify(events, null, 2))

    const teachers: Teacher[] = dataTeachers.map((teacher) => ({
      name: teacher.Name ?? "No Name",
      image: teacher.MainImageURL ?? "No Image",
      mantra: teacher.Mantra ?? "No Mantra",
      activityTags: teacher.TeacherActivity.map((activity) => ({
        text: activity.Activity.Title ?? "No Tag",
      })),
    }))

    console.log("Teacher ok", JSON.stringify(yogaCenter, null, 2))

    const resData: ResponseData = {
      yogaCenter,
      activities,
      events,
      teachers,
    }

    console.log("Composed response data")
    console.log(JSON.stringify(resData, null, 2))

    return res.status(200).json(resData)
  } catch (err) {
    console.error("There was an error:")
    console.error(JSON.stringify(err, null, 2))
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}
