import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async function (event, context) {
  const { id } = event.queryStringParameters;
  const { data, error } = await selectMovie(id);

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
  };
};

async function selectMovie(id) {
  const { data, error } = await supabase
    .from("movies")
    .select("net_upvotes")
    .eq("tmdb_id", id);

  return { data, error };
}
