import type { Database } from "./types/database.types"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)
