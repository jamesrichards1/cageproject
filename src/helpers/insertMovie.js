import { supabase } from "../config/supabase";

export async function insertMovie(movieId, isUpvote, movieName, posterPath) {
  const { data, error } = await supabase.from("movies").insert([
    {
      movie_name: movieName,
      tmdb_id: movieId,
      net_upvotes: isUpvote ? 1 : -1,
      poster_path: posterPath,
    },
  ]);

  return { data, error };
}
