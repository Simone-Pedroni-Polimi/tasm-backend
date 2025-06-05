import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Pricing } from "../lib/types/responses.types"
import { Item } from "../lib/types/responses.types"
import { supabase } from "../lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  const { data, error } = await supabase
    .from("Pricing")
    .select(`
      PricingId,
      Title,
      Subtitle,
      Price,
      PricingListItem (Item)
    `)

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    let n: number = 0
    function evenOrOdd() {
      if (n % 2 === 0) {
        n++
        return true
      } else {
        n++
        return false
      }
    }

    const items: Item[] = data.PricingListItem.map((Item) => ({
      item: Item.item ?? "No item",
    }))

    const pricing: Pricing = {
      title: data.Title ?? "No title",
      subtitle: data.Subtitle ?? "No subtitle",
      price: data.Price ?? "No price",
      items,
      darkMode: evenOrOdd(), 
    }
  }
}