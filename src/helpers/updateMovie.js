import { supabase } from "../config/supabase";

export async function updateMovie(id, currentVotes, isUpvote) {
  const { data, error } = await supabase
    .from("movies")
    .update({ net_upvotes: isUpvote ? currentVotes + 1 : currentVotes - 1 })
    .eq("tmdb_id", id);

  return { data, error };
}
