export const setRandomIndex = (
  numberOfMovies,
  viewedIndices,
  setIndex,
  setViewedIndices
) => {
  const newIndex = Math.floor(Math.random() * numberOfMovies);
  // If we've had this movie before, try again
  if (
    viewedIndices.includes(newIndex) &&
    viewedIndices.length < numberOfMovies
  ) {
    setRandomIndex(numberOfMovies, viewedIndices, setIndex, setViewedIndices);
  } else {
    // If we've run out of movies, do this
    if (viewedIndices.length === numberOfMovies) {
      console.log("at the end");
      // Otherwise add the random index
    } else {
      setIndex(newIndex);
      if (viewedIndices.every((index) => index !== newIndex)) {
        setViewedIndices((currentState) => [...currentState, newIndex]);
      }
    }
  }
};
