import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Dummy from "../../common/sharedComponents/Dummy/Dummy";
import { selectFavorites } from "../../common/slices/userSlice";
import Movies from "../movies/Movies";
import { useGetMovieQuery } from "../movies/moviesSlice";

const Favorites = () => {
  const favorites = useAppSelector(selectFavorites);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [id, setId] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isError } = useGetMovieQuery(id, {
    skip: id === 0,
  });

  // Terrible solution but it just works
  useEffect(() => {
    if (favorites && favorites.length >= currentIndex) {
      setId(favorites[currentIndex]);
      setCurrentIndex(currentIndex + 1);
      data && setMovies([...movies, data]);
    }
  }, [data]);

  return (
    <>
      {!favorites && <Dummy text={"No favorites yet"} />}
      {isError && !movies.length && <Dummy text={"Something went wrong"} />}
      {favorites && movies.length === favorites.length && (
        <Movies movies={movies ?? []}></Movies>
      )}
    </>
  );
};

export default Favorites;
