export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Activity: {
        Row: {
          ActivityId: number
          BannerImageURL: string | null
          Description: string | null
          Emoji: string | null
          Highlights: boolean | null
          ResponsibleTeacherId: number | null
          ShortDescription: string | null
          Title: string | null
          URL: string | null
          YogaCategoryId: number | null
          YogaCenterId: number | null
        }
        Insert: {
          ActivityId?: number
          BannerImageURL?: string | null
          Description?: string | null
          Emoji?: string | null
          Highlights?: boolean | null
          ResponsibleTeacherId?: number | null
          ShortDescription?: string | null
          Title?: string | null
          URL?: string | null
          YogaCategoryId?: number | null
          YogaCenterId?: number | null
        }
        Update: {
          ActivityId?: number
          BannerImageURL?: string | null
          Description?: string | null
          Emoji?: string | null
          Highlights?: boolean | null
          ResponsibleTeacherId?: number | null
          ShortDescription?: string | null
          Title?: string | null
          URL?: string | null
          YogaCategoryId?: number | null
          YogaCenterId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Activity_ResponsibleTeacherId_fkey"
            columns: ["ResponsibleTeacherId"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["TeacherId"]
          },
          {
            foreignKeyName: "Activity_YogaCategoryId_fkey"
            columns: ["YogaCategoryId"]
            isOneToOne: false
            referencedRelation: "YogaCategory"
            referencedColumns: ["YogaCategoryId"]
          },
          {
            foreignKeyName: "Activity_YogaCenterId_fkey"
            columns: ["YogaCenterId"]
            isOneToOne: false
            referencedRelation: "YogaCenter"
            referencedColumns: ["YogaCenterId"]
          },
        ]
      }
      ActivityImages: {
        Row: {
          ActivityId: number
          ImageId: number
        }
        Insert: {
          ActivityId: number
          ImageId: number
        }
        Update: {
          ActivityId?: number
          ImageId?: number
        }
        Relationships: [
          {
            foreignKeyName: "ActivityImages_ActivityId_fkey"
            columns: ["ActivityId"]
            isOneToOne: false
            referencedRelation: "Activity"
            referencedColumns: ["ActivityId"]
          },
          {
            foreignKeyName: "ActivityImages_ImageId_fkey"
            columns: ["ImageId"]
            isOneToOne: false
            referencedRelation: "Image"
            referencedColumns: ["ImageId"]
          },
        ]
      }
      ActivitySchedule: {
        Row: {
          ActivityId: number
          ScheduleId: number
        }
        Insert: {
          ActivityId: number
          ScheduleId: number
        }
        Update: {
          ActivityId?: number
          ScheduleId?: number
        }
        Relationships: [
          {
            foreignKeyName: "ActivitySchedule_ActivityId_fkey"
            columns: ["ActivityId"]
            isOneToOne: false
            referencedRelation: "Activity"
            referencedColumns: ["ActivityId"]
          },
          {
            foreignKeyName: "ActivitySchedule_ScheduleId_fkey"
            columns: ["ScheduleId"]
            isOneToOne: false
            referencedRelation: "Schedule"
            referencedColumns: ["ScheduleId"]
          },
        ]
      }
      ActivityScore: {
        Row: {
          Accessibility: number | null
          ActivityId: number
          Difficulty: number | null
          MindfulnessConcentration: number | null
          PhysicalFlow: number | null
          Posture: number | null
        }
        Insert: {
          Accessibility?: number | null
          ActivityId?: number
          Difficulty?: number | null
          MindfulnessConcentration?: number | null
          PhysicalFlow?: number | null
          Posture?: number | null
        }
        Update: {
          Accessibility?: number | null
          ActivityId?: number
          Difficulty?: number | null
          MindfulnessConcentration?: number | null
          PhysicalFlow?: number | null
          Posture?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ActivityScore_id_fkey"
            columns: ["ActivityId"]
            isOneToOne: true
            referencedRelation: "Activity"
            referencedColumns: ["ActivityId"]
          },
        ]
      }
      Certification: {
        Row: {
          CertificationId: number
          Description: string | null
          Title: string | null
        }
        Insert: {
          CertificationId?: number
          Description?: string | null
          Title?: string | null
        }
        Update: {
          CertificationId?: number
          Description?: string | null
          Title?: string | null
        }
        Relationships: []
      }
      Contact: {
        Row: {
          ContactId: number
          ContactInfo: string | null
          YogaCenterId: number | null
        }
        Insert: {
          ContactId?: number
          ContactInfo?: string | null
          YogaCenterId?: number | null
        }
        Update: {
          ContactId?: number
          ContactInfo?: string | null
          YogaCenterId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Contact_YogaCenterId_fkey"
            columns: ["YogaCenterId"]
            isOneToOne: false
            referencedRelation: "YogaCenter"
            referencedColumns: ["YogaCenterId"]
          },
        ]
      }
      Event: {
        Row: {
          BannerImageURL: string | null
          Date: string | null
          Description: string | null
          EndTime: string | null
          EventId: number
          Highlights: boolean | null
          Location: string | null
          Name: string | null
          PracticalInfo: string | null
          Program: string | null
          ShortIntroduction: string | null
          StartTime: string | null
          Subtitle: string | null
          URL: string | null
          YogaCenterId: number
        }
        Insert: {
          BannerImageURL?: string | null
          Date?: string | null
          Description?: string | null
          EndTime?: string | null
          EventId?: number
          Highlights?: boolean | null
          Location?: string | null
          Name?: string | null
          PracticalInfo?: string | null
          Program?: string | null
          ShortIntroduction?: string | null
          StartTime?: string | null
          Subtitle?: string | null
          URL?: string | null
          YogaCenterId: number
        }
        Update: {
          BannerImageURL?: string | null
          Date?: string | null
          Description?: string | null
          EndTime?: string | null
          EventId?: number
          Highlights?: boolean | null
          Location?: string | null
          Name?: string | null
          PracticalInfo?: string | null
          Program?: string | null
          ShortIntroduction?: string | null
          StartTime?: string | null
          Subtitle?: string | null
          URL?: string | null
          YogaCenterId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Event_YogaCenterId_fkey"
            columns: ["YogaCenterId"]
            isOneToOne: false
            referencedRelation: "YogaCenter"
            referencedColumns: ["YogaCenterId"]
          },
        ]
      }
      Faqs: {
        Row: {
          Answer: string | null
          FaqId: number
          Question: string | null
        }
        Insert: {
          Answer?: string | null
          FaqId?: number
          Question?: string | null
        }
        Update: {
          Answer?: string | null
          FaqId?: number
          Question?: string | null
        }
        Relationships: []
      }
      Guest: {
        Row: {
          Description: string | null
          GuestId: number
          MainImageURL: string | null
          Name: string | null
        }
        Insert: {
          Description?: string | null
          GuestId?: number
          MainImageURL?: string | null
          Name?: string | null
        }
        Update: {
          Description?: string | null
          GuestId?: number
          MainImageURL?: string | null
          Name?: string | null
        }
        Relationships: []
      }
      GuestEvent: {
        Row: {
          EventId: number
          GuestId: number
        }
        Insert: {
          EventId: number
          GuestId: number
        }
        Update: {
          EventId?: number
          GuestId?: number
        }
        Relationships: [
          {
            foreignKeyName: "GuestEvent_EventId_fkey"
            columns: ["EventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["EventId"]
          },
          {
            foreignKeyName: "GuestEvent_GuestId_fkey"
            columns: ["GuestId"]
            isOneToOne: false
            referencedRelation: "Guest"
            referencedColumns: ["GuestId"]
          },
        ]
      }
      Image: {
        Row: {
          ImageId: number
          Name: string | null
          URL: string | null
        }
        Insert: {
          ImageId?: number
          Name?: string | null
          URL?: string | null
        }
        Update: {
          ImageId?: number
          Name?: string | null
          URL?: string | null
        }
        Relationships: []
      }
      Level: {
        Row: {
          Value: string
        }
        Insert: {
          Value: string
        }
        Update: {
          Value?: string
        }
        Relationships: []
      }
      PracticalInfo: {
        Row: {
          ActivityId: number
          Description: string | null
          Level: string | null
          PracticalInfoId: number
          Title: string | null
        }
        Insert: {
          ActivityId: number
          Description?: string | null
          Level?: string | null
          PracticalInfoId?: number
          Title?: string | null
        }
        Update: {
          ActivityId?: number
          Description?: string | null
          Level?: string | null
          PracticalInfoId?: number
          Title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "PracticalInfo_ActivityId_fkey"
            columns: ["ActivityId"]
            isOneToOne: false
            referencedRelation: "Activity"
            referencedColumns: ["ActivityId"]
          },
          {
            foreignKeyName: "PracticalInfo_Level_fkey"
            columns: ["Level"]
            isOneToOne: false
            referencedRelation: "Level"
            referencedColumns: ["Value"]
          },
        ]
      }
      Pricing: {
        Row: {
          Price: number | null
          PricingId: number
          Subtitle: string | null
          Title: string | null
          YogaCenterId: number | null
        }
        Insert: {
          Price?: number | null
          PricingId?: number
          Subtitle?: string | null
          Title?: string | null
          YogaCenterId?: number | null
        }
        Update: {
          Price?: number | null
          PricingId?: number
          Subtitle?: string | null
          Title?: string | null
          YogaCenterId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Pricing_YogaCenterId_fkey"
            columns: ["YogaCenterId"]
            isOneToOne: false
            referencedRelation: "YogaCenter"
            referencedColumns: ["YogaCenterId"]
          },
        ]
      }
      PricingListItem: {
        Row: {
          Item: string | null
          PricingId: number
          PricingListItemId: number
        }
        Insert: {
          Item?: string | null
          PricingId: number
          PricingListItemId?: number
        }
        Update: {
          Item?: string | null
          PricingId?: number
          PricingListItemId?: number
        }
        Relationships: [
          {
            foreignKeyName: "PricingListItem_PricingId_fkey"
            columns: ["PricingId"]
            isOneToOne: false
            referencedRelation: "Pricing"
            referencedColumns: ["PricingId"]
          },
        ]
      }
      Room: {
        Row: {
          Name: string | null
          RoomId: number
          Text: string | null
          UrlImage: string | null
          YogaCenterId: number
        }
        Insert: {
          Name?: string | null
          RoomId?: number
          Text?: string | null
          UrlImage?: string | null
          YogaCenterId: number
        }
        Update: {
          Name?: string | null
          RoomId?: number
          Text?: string | null
          UrlImage?: string | null
          YogaCenterId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Room_YogaCenterId_fkey"
            columns: ["YogaCenterId"]
            isOneToOne: false
            referencedRelation: "YogaCenter"
            referencedColumns: ["YogaCenterId"]
          },
        ]
      }
      Schedule: {
        Row: {
          Date: string | null
          DayOfWeek: string | null
          EndTime: string | null
          Level: string | null
          ScheduleId: number
          StartTime: string | null
        }
        Insert: {
          Date?: string | null
          DayOfWeek?: string | null
          EndTime?: string | null
          Level?: string | null
          ScheduleId?: number
          StartTime?: string | null
        }
        Update: {
          Date?: string | null
          DayOfWeek?: string | null
          EndTime?: string | null
          Level?: string | null
          ScheduleId?: number
          StartTime?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Schedule_Level_fkey"
            columns: ["Level"]
            isOneToOne: false
            referencedRelation: "Level"
            referencedColumns: ["Value"]
          },
        ]
      }
      Teacher: {
        Row: {
          BannerImageURL: string | null
          Description: string | null
          History: string | null
          MainImageURL: string | null
          Mantra: string | null
          Name: string | null
          TeacherId: number
          URL: string | null
          YogaCenterId: number | null
        }
        Insert: {
          BannerImageURL?: string | null
          Description?: string | null
          History?: string | null
          MainImageURL?: string | null
          Mantra?: string | null
          Name?: string | null
          TeacherId?: number
          URL?: string | null
          YogaCenterId?: number | null
        }
        Update: {
          BannerImageURL?: string | null
          Description?: string | null
          History?: string | null
          MainImageURL?: string | null
          Mantra?: string | null
          Name?: string | null
          TeacherId?: number
          URL?: string | null
          YogaCenterId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Teacher_YogaCenterId_fkey"
            columns: ["YogaCenterId"]
            isOneToOne: false
            referencedRelation: "YogaCenter"
            referencedColumns: ["YogaCenterId"]
          },
        ]
      }
      TeacherActivity: {
        Row: {
          ActivityId: number
          HostingTeacherId: number
        }
        Insert: {
          ActivityId: number
          HostingTeacherId: number
        }
        Update: {
          ActivityId?: number
          HostingTeacherId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TeacherActivity_ActivityId_fkey"
            columns: ["ActivityId"]
            isOneToOne: false
            referencedRelation: "Activity"
            referencedColumns: ["ActivityId"]
          },
          {
            foreignKeyName: "TeacherActivity_HostingTeacherId_fkey"
            columns: ["HostingTeacherId"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["TeacherId"]
          },
        ]
      }
      TeacherCert: {
        Row: {
          CertificationId: number
          TeacherId: number
        }
        Insert: {
          CertificationId: number
          TeacherId: number
        }
        Update: {
          CertificationId?: number
          TeacherId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TeacherCert_CertificationId_fkey"
            columns: ["CertificationId"]
            isOneToOne: false
            referencedRelation: "Certification"
            referencedColumns: ["CertificationId"]
          },
          {
            foreignKeyName: "TeacherCert_TeacherId_fkey"
            columns: ["TeacherId"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["TeacherId"]
          },
        ]
      }
      TeacherEvent: {
        Row: {
          EventId: number
          TeacherId: number
        }
        Insert: {
          EventId: number
          TeacherId: number
        }
        Update: {
          EventId?: number
          TeacherId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TeacherEvent_EventId_fkey"
            columns: ["EventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["EventId"]
          },
          {
            foreignKeyName: "TeacherEvent_TeacherId_fkey"
            columns: ["TeacherId"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["TeacherId"]
          },
        ]
      }
      TeacherImages: {
        Row: {
          ImageId: number
          TeacherId: number
        }
        Insert: {
          ImageId: number
          TeacherId: number
        }
        Update: {
          ImageId?: number
          TeacherId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TeacherImages_ImageId_fkey"
            columns: ["ImageId"]
            isOneToOne: false
            referencedRelation: "Image"
            referencedColumns: ["ImageId"]
          },
          {
            foreignKeyName: "TeacherImages_TeacherId_fkey"
            columns: ["TeacherId"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["TeacherId"]
          },
        ]
      }
      YogaCategory: {
        Row: {
          Description: string | null
          Title: string | null
          YogaCategoryId: number
        }
        Insert: {
          Description?: string | null
          Title?: string | null
          YogaCategoryId?: number
        }
        Update: {
          Description?: string | null
          Title?: string | null
          YogaCategoryId?: number
        }
        Relationships: []
      }
      YogaCenter: {
        Row: {
          LongDescription: string | null
          ShortOverview: string | null
          Subtitle: string | null
          Title: string | null
          YogaCenterId: number
        }
        Insert: {
          LongDescription?: string | null
          ShortOverview?: string | null
          Subtitle?: string | null
          Title?: string | null
          YogaCenterId?: number
        }
        Update: {
          LongDescription?: string | null
          ShortOverview?: string | null
          Subtitle?: string | null
          Title?: string | null
          YogaCenterId?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
      | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
      | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
      | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
      | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
      | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
