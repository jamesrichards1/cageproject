import { useState, useEffect } from "react";
import { FaRegThumbsDown } from "react-icons/fa";
import { setRandomIndex } from "../helpers/setRandomIndex";
import NoPoster from "./NoPoster";
import { insertMovie } from "../helpers/insertMovie";
import { selectMovie } from "../helpers/selectMovie";
import { updateMovie } from "../helpers/updateMovie";

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
    const selectedMovie = await selectMovie(randomMovie.id);
    if (selectMovie.error) console.log(selectMovie.error);
    // If it doesn't exist insert it with default values
    if (selectedMovie.data.length === 0) {
      const insertedMovie = await insertMovie(
        randomMovie.id,
        isUpvote,
        randomMovie.title,
        posterPath
      );
      console.log(insertedMovie.data);
    } else {
      // Update the movie
      const updatedMovie = await updateMovie(
        randomMovie.id,
        selectedMovie.data[0].net_upvotes,
        isUpvote
      );
    }
    // Get another random movie
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }

  function handleNotSeen() {
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }
  return (
    <section className="grid grid-cols-3 grid-rows-2">
      <div className="flex items-center justify-center">
        <button onClick={() => handleVote(true)}>
          <FaRegThumbsDown size={75} className="rotate-180" />
        </button>
      </div>

      <div className="flex items-center justify-center">
        {randomMovie?.poster_path ? (
          <img src={posterPath} />
        ) : (
          <NoPoster movie={randomMovie} />
        )}
      </div>

      <div className="flex items-center justify-center">
        <button onClick={() => handleVote(false)}>
          <FaRegThumbsDown size={75} />
        </button>
      </div>

      <div className="col-start-2 flex items-start justify-center">
        <button onClick={handleNotSeen}>I haven't seen this one</button>
      </div>
    </section>
  );
};

export default PosterSection;
