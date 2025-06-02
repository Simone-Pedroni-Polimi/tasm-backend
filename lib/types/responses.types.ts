export type Teacher = {
  name: string
  image: string
  mantra: string
  activityTags: Array<{ text: string }>
}

export interface ActivityType {
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

export interface YogaCenterHomePage {
  title: string
  subtitle?: string
  description?: string
  imgUrl?: string
  altDescription?: string
  imageOnTheRight: boolean
}

export interface Room {
  name: string
  text: string
  urlImage: string
}

export interface YogaCenter {
  title: string
  subtitle: string
  description: string
  rooms: Array<{ room: Room }>
}

export interface Event {
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

export interface Activity {
  title: string
  image: string
}

export interface EventType {
  title: string
  subtitle?: string
  mainImageURL: string
  shortDesc: string
  description: string
  infostr: string
  programstr: string
  teachers: Teacher[]
  guest?: {
    name: string
    imageURL: string
    description: string
  }
}

export interface Contact {
  contactId: number
  contactInfo: string
}
