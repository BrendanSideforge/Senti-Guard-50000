
import { createClient } from "@supabase/supabase-js";

export const supabase: any = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)
