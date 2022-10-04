import { useEffect, useState } from "react";
import Header from "./components/Header";
import PosterSection from "./components/PosterSection";
import axios from "axios";
import { setRandomIndex } from "./helpers/setRandomIndex";

const API_KEY = import.meta.env.VITE_API_KEY;

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

function App() {
  // All Cage Movies
  const [movies, setMovies] = useState();
  const [randomMovie, setRandomMovie] = useState([]);
  const [index, setIndex] = useState(0);
  const [viewedIndices, setViewedIndices] = useState([]);

  // When we open page, this runs which updates movies
  useEffect(() => {
    (async () => {
      const { data } = await fetchMovies();
      setMovies(data.cast);
    })();
  }, []);

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
    </div>
  );
}

export default App;
