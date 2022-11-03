import { useEffect, useState } from "react";
import Header from "./components/Header";
import PosterSection from "./components/PosterSection";
import ScoreBoard from "./components/ScoreBoard";
import axios from "axios";
import { setRandomIndex } from "./helpers/setRandomIndex";

const API_KEY = import.meta.env.VITE_API_KEY;

// Serverless functions to fetch all cage movies from TMDB

const fetchMovies = async () => {
  try {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${API_KEY}`
    );
    return movies;
  } catch (err) {
    console.log(err);
  }
};

// Serverless functions to fetch score from supabase

const fetchScores = async () => {
  try {
    const scores = await axios.get(
      `${import.meta.env.VITE_FUNCTIONS_URL}/fetchScores`
    );
    return scores;
  } catch (err) {
    console.log(err);
  }
};

function App() {
  // All Cage Movies
  const [movies, setMovies] = useState();
  const [randomMovie, setRandomMovie] = useState([]);
  const [index, setIndex] = useState(0);
  const [viewedIndices, setViewedIndices] = useState([]);
  const [scores, setScores] = useState([]);

  // When we open page, this runs which updates movies
  useEffect(() => {
    (async () => {
      const { data } = await fetchMovies();
      setMovies(data.cast);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await fetchScores();
      setScores(data.data);
    })();
  }, [randomMovie]);

  // When movies changes, this runs which sets a random index
  useEffect(() => {
    if (movies) {
      setRandomIndex(movies.length, viewedIndices, setIndex, setViewedIndices);
    }
  }, [movies]);

  // When index changes, this runs which sets a random movie
  useEffect(() => {
    if (movies) {
      setRandomMovie(movies[index]);
    }
  }, [index]);

  if (!movies) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <PosterSection
        randomMovie={randomMovie}
        setIndex={setIndex}
        numberOfMovies={movies.length}
        viewedIndices={viewedIndices}
        setViewedIndices={setViewedIndices}
      />
      <ScoreBoard scores={scores} />
    </div>
  );
}

export default App;
