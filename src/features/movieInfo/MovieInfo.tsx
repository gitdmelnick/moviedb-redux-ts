import { useParams } from "react-router";
import { useGetMovieQuery } from "../movies/moviesSlice";
import s from "./MovieInfo.module.css";
import apiConstants from "../../app/constants";
import Dummy from "../../common/sharedComponents/Dummy/Dummy";
import Rating from "../../common/sharedComponents/Rating/Rating";
import {dateFromString} from "../../common/utilities/utilities"

const MovieInfo = () => {
  const { id } = useParams();
  const { data, isSuccess, isError } = useGetMovieQuery(Number(id), {
    skip: !Number(id),
  });

  const getGenresString = (genres: { id: number; name: string }[]) => {
    return genres.map((genre) => {return genre.name;}).join(", ") ?? "TBD"
  };

  const renderMovieInfo = () => {
    if (isError) {
      return <Dummy text={`We can't find the page you're looking for`} />;
    }
    if (isSuccess) {
      const hasBackdrop = !!data?.backdrop_path;
      const hasPoster = !!data?.poster_path;
      const releaseDate = dateFromString(data?.release_date ?? "");
      const genres = getGenresString(data?.genres ?? []);
      const rating = data?.vote_average ?? 0;

      return (
        <div
          className={
            hasBackdrop ? s.backdrop : s.backdrop.concat(` ${s["no-backdrop-image"]}`)
          }
          style={
            hasBackdrop
              ? {
                  backgroundImage: `url(${apiConstants.BACKDROP_URL}${data?.backdrop_path})`,
                }
              : {}
          }
        >
          <div className={s["movie-info"]}>
            <div className={s.poster}>
              <img
                src={
                  hasPoster
                    ? `${apiConstants.POSTER_URL}${data?.poster_path}`
                    : apiConstants.NO_POSTER_URL
                }
              />
            </div>
            <div className={s["info-body"]}>
              <h2 className="heading-2">
                {data?.original_title}{" "}
                <span className={s["info-year"]}>
                  {`(${releaseDate.getFullYear()})`}
                </span>
              </h2>
              <div className={s["info-facts"]}>
                <p>{releaseDate.toLocaleDateString()} </p>
                <p>{genres}</p>
                <p>{data?.runtime}m</p>
              </div>
              <div className={s["info-actions"]}>
                <Rating value={rating * 10 ?? "TDB"} />
              </div>
              <div className={s["info-overview"]}>
                <h3 className="heading-3">Overview</h3>
                <p>{data?.overview}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } 
    return <></>
  };

  return renderMovieInfo();
};

export default MovieInfo;
