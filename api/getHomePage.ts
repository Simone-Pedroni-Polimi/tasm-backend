import { describe } from "node:test"
import { supabase } from "../lib/supabase-typed"



export type Teacher = {
  name: string
  image: string
  mantra: string
  activityTags: Array<{ text: string }>
  
}

interface YogaCenter{

  title: string,
  subtitle?: string,
  description?: string,
  imgUrl?: string,
  altDescription?: string,
  imageOnTheRight: boolean
}

interface Event{
  title: string,
  eventId : number,
  eventImage: string,
  hostImage: string,
  hostName: string,
  date: string,
  startTime: string,
  endTime: string,
  location: string,
  activityTags: Array<{ text: string }>,
}
    
interface Activity {
  title: string,
  image: string,
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  try {
    const { dataYogaCenter } = await supabase
      .from("YogaCenter")
      .select(
        `
        Title,
        Subtitle, 
        ShortOverview
      `
      );
      

    if (!dataYogaCenter) {
      return res.status(404).json({
        error: ` yogacenter is not available!`,
      })
    }

     const { dataTeachers} = await supabase
      .from('Teacher')
      .select(`
        Name,
        Mantra,
        MainImageURL,
        TeacherActivity(
          Activity(
            Title
          )
        )
      `);
      

    if (!dataTeachers) {
      return res.status(404).json({
        error: ` Teachers are not available!`,
      })
    }


    const { dataActivities} = await supabase
      .from('Activity')
      .select(`
       Title,
      BannerImageURL
    `);
      

    if (!dataActivities) {
      return res.status(404).json({
        error: ` Activities are not available!`,
      })
    }


    
    const { dataEvents} = await supabase
      .from('Teacher')
       .select(`
          Event(
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
      imageOnTheRight : false,
    }

    
     

    return res.status(200).json(activity)
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while executing query", err })
  }
}
