import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Contact } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase.from("Contact").select(`
      ContactId,
      ContactInfo
    `)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    const contacts: Contact[] = data.map(() => ({
        contactId: data.ContactId ?? "No ID",
        contactInfo: data.ContactInfo ?? "No info",
      })
    )

    const contactResponses: Contact[] = contacts
    res.status(200).json(contactResponses)
  }
}
