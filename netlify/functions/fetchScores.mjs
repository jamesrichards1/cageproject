import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async function (event, context) {
  const data = await fetchScores();
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere (CORS)
    },
  };
};

const fetchScores = async () => {
  const { data, error } = await supabase
    .from("movies")
    .select()
    .order("net_upvotes", { ascending: false });
  return data;
};
