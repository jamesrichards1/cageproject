export const setRandomIndex = (numberOfMovies, viewedIndices, setIndex, setViewedIndices) => {
    const newIndex = Math.floor(Math.random() * numberOfMovies)

    if(viewedIndices.includes(newIndex) && viewedIndices.length < numberOfMovies) {
        setRandomIndex(numberOfMovies, viewedIndices, setIndex)
    } else {
        setIndex((currentIndex) => {
            setViewedIndices((currentIndices) => {
                if(!(currentIndices.includes(currentIndex))) {
                    [...currentIndices, currentIndex] 
                } else {
                    currentIndices
                }
            })
            return newIndex
          });
    }
}