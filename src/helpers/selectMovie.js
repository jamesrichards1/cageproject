import { supabase } from "../config/supabase";

export async function selectMovie(id) {
  const { data, error } = await supabase
    .from("movies")
    .select("net_upvotes")
    .eq("tmdb_id", id);

  return { data, error };
}
