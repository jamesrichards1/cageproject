const NoPoster = ({ movie }) => {
  return (
    <div className="bg-no-poster">
      <div className="h-[540px] w-[500px] bg-black opacity-75">
        <h3 className="text-white">
          <p>sorry we couldn't find a poster for the movie, its called:</p>
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default NoPoster;
