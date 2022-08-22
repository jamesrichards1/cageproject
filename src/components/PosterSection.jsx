import { FaRegThumbsDown } from "react-icons/fa";
import { setRandomIndex } from "../helpers/setRandomIndex";


const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";


const PosterSection = ({ randomMovie, setIndex, numberOfMovies, viewedIndices, setViewedIndices }) => {

    function handleUpvote() {
      setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices)
    }

    function handleDownvote() {
        
    }
  return (
    <section className="grid grid-cols-3">
      <button className="flex items-center justify-center" onClick={handleUpvote}>
        <FaRegThumbsDown size={75} className="rotate-180" />
      </button>
      <div className="flex items-center justify-center">
        <img src={`${IMAGE_PATH}${randomMovie?.poster_path}`} />
      </div>
      <button className="flex items-center justify-center" onClick={handleDownvote}>
        <FaRegThumbsDown size={75}/>
      </button>
    </section>
  );
};

export default PosterSection;