import { supabase } from "../lib/supabase-typed"

export type Teacher = {
  name: string
  image: string
  mantra: string
  activityTags: Array<{ text: string }>
}

interface YogaCenter {
  title: string
  subtitle?: string
  description?: string
  imgUrl?: string
  altDescription?: string
  imageOnTheRight: boolean
}

interface Event {
  title: string
  eventId: number
  eventImage: string
  hostImage: string
  hostName: string
  date: string
  startTime: string
  endTime: string
  location: string
  activityTags: Array<{ text: string }>
}

interface Activity {
  title: string
  image: string
}

interface ResponseData {
  yogaCenter: YogaCenter
  activities: Activity[]
  events: Event[]
  teachers: Teacher[]
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" })

  try {
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

    if (!dataYogaCenter) {
      return res.status(404).json({
        error: ` yogacenter is not available!`,
      })
    }

    const { data: dataTeachers } = await supabase.from("Teacher").select(`
        Name,
        Mantra,
        MainImageURL,
        TeacherActivity(
          Activity(
            Title
          )
        )`)

    if (!dataTeachers) {
      return res.status(404).json({
        error: ` Teachers are not available!`,
      })
    }

    const { data: dataActivities } = await supabase.from("Activity").select(`
       Title,
      BannerImageURL
    `)

    if (!dataActivities) {
      return res.status(404).json({
        error: ` Activities are not available!`,
      })
    }

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
                TeacherActivity(
                  Activity(
                    Title
                  )
                )  
              )
            )
          
      `)

    if (!dataEvents) {
      return res.status(404).json({
        error: ` Events are not available!`,
      })
    }

    const YogaCenter: YogaCenter = {
      title: dataYogaCenter.Title ?? "No Title",
      subtitle: dataYogaCenter.Subtitle ?? "No Title",
      description: dataYogaCenter.ShortOverview ?? "No Description",
      imageOnTheRight: false,
    }

    const activities: Activity[] = dataActivities.map((activity) => ({
      title: activity.Title ?? "No Title",
      image: activity.BannerImageURL ?? "No Image",
    }))

    const events: Event[] = dataEvents.map((event) => ({
      eventId: event.EventId,
      title: event.Name ?? "No Title",
      eventImage: event.BannerImageURL ?? "No Image",
      hostImage: event.GuestEvent[0].Guest.MainImageURL ?? "No Image",
      hostName: event.GuestEvent[0].Guest.Name ?? "No Name",
      date: event.Date ?? "No Date",
      startTime: event.StartTime ?? "No Start Time",
      endTime: event.EndTime ?? "No End Time",
      location: event.Location ?? "No Location",
      activityTags: event.TeacherEvent[0].Teacher.TeacherActivity.map(
        (tag) => ({ text: tag.Activity.Title ?? "No Tag" })
      ),
    }))

    const teachers: Teacher[] = dataTeachers.map((teacher) => ({
      name: teacher.Name ?? "No Name",
      image: teacher.MainImageURL ?? "No Image",
      mantra: teacher.Mantra ?? "No Mantra",
      activityTags: teacher.TeacherActivity.map((activity) => ({
        text: activity.Activity.Title ?? "No Tag",
      })),
    }))

    const resData: ResponseData = {
      yogaCenter: YogaCenter,
      activities: activities,
      events: events,
      teachers: teachers,
    }

    return res.status(200).json(resData)
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}
