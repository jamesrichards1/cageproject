import { useState, useEffect } from "react";
import { FaRegThumbsDown } from "react-icons/fa";
import { setRandomIndex } from "../helpers/setRandomIndex";
import NoPoster from "./NoPoster";
import axios from "axios";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

const PosterSection = ({
  randomMovie,
  setIndex,
  numberOfMovies,
  viewedIndices,
  setViewedIndices,
}) => {
  const posterPath = randomMovie?.poster_path
    ? `${IMAGE_PATH}${randomMovie.poster_path}`
    : null;

  async function handleVote(isUpvote) {
    // Find a movie in the db if it exists
    const { status, data } = await axios.get(
      `${import.meta.env.VITE_FUNCTIONS_URL}/selectMovie?id=${randomMovie.id}`
    );

    if (status !== 200) {
      return;
    }
    // If movie isnt on supabase, add it, otherwise, update it & get a new movie
    if (data.data.length === 0) {
      const payload = {
        movieId: randomMovie.id,
        isUpvote: isUpvote,
        movieName: randomMovie.title,
        posterPath: posterPath,
      };
      await axios.post(
        `${import.meta.env.VITE_FUNCTIONS_URL}/insertMovie`,
        payload
      );
    } else {
      // Update the movie
      const payload = {
        movieId: randomMovie.id,
        currentVotes: data.data[0].net_upvotes,
        isUpvote: isUpvote,
      };
      await axios.post(
        `${import.meta.env.VITE_FUNCTIONS_URL}/updateMovie`,
        payload
      );
    }
    // Get another random movie
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }

  function handleNotSeen() {
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }
  return (
    <section className="grid grid-cols-3 auto-rows-min">
      <div className="flex items-center justify-end">
        <button onClick={() => handleVote(true)}>
          <FaRegThumbsDown size={75} className="rotate-180" />
        </button>
      </div>

      <div className="flex items-center justify-center">
        {randomMovie?.poster_path ? (
          <img src={posterPath} className="max-h-[480px]" />
        ) : (
          <NoPoster movie={randomMovie} />
        )}
      </div>

      <div className="flex items-center justify-start">
        <button onClick={() => handleVote(false)}>
          <FaRegThumbsDown size={75} />
        </button>
      </div>

      <div className="col-start-2 flex items-start justify-center mt-6 mb-14">
        <button onClick={handleNotSeen}>I haven't seen this one</button>
      </div>
    </section>
  );
};

export default PosterSection;
