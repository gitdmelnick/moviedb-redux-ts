import s from "./Movies.module.css";
import MovieCard from "./MovieCard";
type MoviesProps = {
  movies: Movie[];
};

const Movies = ({ movies }: MoviesProps) => {
  const resultsHtml = movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} />;
  });

  return <div className={s["movies-container"]}>{resultsHtml}</div>;
};

export default Movies;
