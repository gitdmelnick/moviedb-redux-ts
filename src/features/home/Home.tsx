import s from "./Home.module.css";
import { useGetMovieQuery } from "../movies/moviesSlice";
import { apiConstants } from "../../app/constants";
import { useEffect } from "react";

const Home = () => {
  const { data, isSuccess } = useGetMovieQuery(624860);
  const style = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4),  rgba(0, 0, 0, 0.4)), 
    url(${apiConstants.BACKDROP_URL}${data?.backdrop_path})`,
  };

  useEffect(() => {}, [isSuccess]);

  return (
    <div className={s["home-container"]}>
      <div className={s["home-backdrop"]} style={{ ...style }}>
        <div className={s["home-text"]}>
          <h1 className="heading-2" style={{ color: "#fff" }}>
            Welcome
          </h1>
          <h2 className="heading-3" style={{ color: "#fff" }}>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
