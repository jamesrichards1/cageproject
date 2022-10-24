import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  if (event.httpMethod !== "POST") {
    // To enable CORS
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: "This was not a POST request!",
    };
  }

  const { movieId, currentVotes, isUpvote } = JSON.parse(event.body);
  const { data } = await updateMovie(movieId, currentVotes, isUpvote);

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
    headers,
  };
};

async function updateMovie(id, currentVotes, isUpvote) {
  const { data, error } = await supabase
    .from("movies")
    .update({ net_upvotes: isUpvote ? currentVotes + 1 : currentVotes - 1 })
    .eq("tmdb_id", id);

  return { data };
}
