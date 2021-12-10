import { Link } from "react-router-dom";
import s from "./MovieCard.module.css";
import { apiConstants } from "../../app/constants";
import { dateFromString } from "../../common/utilities/utilities";
import Rating from "../../common/sharedComponents/Rating/Rating";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className={s.card}>
      <Link to={`/movie/${movie.id}`} className={s["card-link"]}>
        <img
          src={`${apiConstants.POSTER_URL}${movie.poster_path}`}
          alt={`${movie.original_title}`}
        />
        <div className={s["card-rating"]}>
          <Rating value={movie.vote_average * 10} />
        </div>
      </Link>
      <div className={s["card-body"]}>
        <h5 className="heading-3">{movie.original_title}</h5>
        <p>{dateFromString(movie.release_date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MovieCard;
