export type Teacher = {
  teacherId: number
  name: string
  image: string
  mantra: string
  url: string
  activityTags: Array<{ text: string }>
}

export type Room = {
  title: string
  description: string
  imgUrl: string
  altDescription: string
  imageOnTheRight: boolean
}

export interface TeacherType {
  name: string
  mantra: string
  description: string
  history: string
  bannerImageURL: string
  mainImageURL: string
  certifications: Array<string>
  specializations: Array<{
    title: string
  }>
  activities: Array<{
    title: string
    bannerImageURL: string
  }>
  images: Array<{
    URL: string
    alt: string
  }>
  events: Array<{
    name: string
    shortIntroduction: string
    date: string
    startTime: string
    endTime: string
    location: string
    guests: Array<{
      name: string
      mainImageURL: string
    }>
    bannerImageURL: string
  }>
}

export interface ActivityType {
  title: string
  mainImageURL: string
  description: string
  url: string
  yogaCategory: number
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

export interface Review {
  person: string
  text: string
  stars: number
}

export interface YogaCenter {
  title: string
  subtitle: string
  description: string
  rooms: Room[]
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
  url: string
  activityTags: Array<{ text: string }>
  highlights?: boolean
}

export interface Activity {
  title: string
  image: string
  highlights?: boolean
}

export interface EventType {
  title: string
  subtitle?: string
  url: string
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

export interface Highlights {
  highlightEvents: Event[]
  highlightActivities: Activity[]
}

export interface Item {
  item: string
}

export interface Pricing {
  title: string
  subtitle: string
  price: number
  pricingItems: Item[]
  darkMode: boolean
}
