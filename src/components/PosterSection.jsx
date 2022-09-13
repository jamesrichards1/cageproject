import { FaRegThumbsDown } from "react-icons/fa";
import { setRandomIndex } from "../helpers/setRandomIndex";
import NoPoster from "./NoPoster";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

const PosterSection = ({
  randomMovie,
  setIndex,
  numberOfMovies,
  viewedIndices,
  setViewedIndices,
}) => {
  function handleUpvote() {
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }

  function handleDownvote() {
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }

  function handleNotSeen() {
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  }

  console.log(randomMovie);

  return (
    <section className="grid grid-cols-3 grid-rows-2">
      <div className="flex items-center justify-center">
        <button onClick={handleUpvote}>
          <FaRegThumbsDown size={75} className="rotate-180" />
        </button>
      </div>

      <div className="flex items-center justify-center">
        {randomMovie?.poster_path ? (
          <img src={`${IMAGE_PATH}${randomMovie?.poster_path}`} />
        ) : (
          <NoPoster movie={randomMovie} />
        )}
      </div>

      <div className="flex items-center justify-center">
        <button onClick={handleDownvote}>
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
