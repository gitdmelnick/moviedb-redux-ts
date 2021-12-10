import s from "./Header.module.css";
import Search from "../search/Search";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectUser } from "../../common/slices/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => navigate("/signin");
  const handleSignUp = () => navigate("/signup");
  const handleFavorites = () => navigate("/favorites");
  const handleHistory = () => navigate("history");
  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className={s.header}>
      <Link className={s["nav-link"]}to="/">
        <h1>
          Movie
          <span style={{display: "inline-flex"}}>
            <svg className={`${s["nav-icon"]} ${s["nav-icon-logo"]}`} />
          </span>
          DB
        </h1>
      </Link>
      <div style={{display: "flex"}}>
        <Search/>
      </div>
      
      <nav className={s["user-nav"]}>
        {currentUser && (
          <>
            <div className={s["nav-icon-box"]}>
              <svg className={`${s["nav-icon"]} ${s["nav-icon-user"]}`} />
              <h2 className="heading-3">{currentUser.username}</h2>
            </div>
            <div className={s["nav-icon-box"]} onClick={handleFavorites}>
              <svg className={`${s["nav-icon"]} ${s["nav-icon-favorites"]}`} />
            </div>
            <div className={s["nav-icon-box"]} onClick={handleHistory}>
              <svg className={`${s["nav-icon"]} ${s["nav-icon-history"]}`} />
            </div>
            <div className={s["nav-icon-box"]} onClick={handleSignOut}>
              <svg className={`${s["nav-icon"]} ${s["nav-icon-logout"]}`} />
            </div>
          </>
        )}
        {!currentUser && (
          <>
            <div className={s["nav-icon-box"]}>
              <h2 className="heading-3" onClick={handleSignIn}>
                Sign in
              </h2>
            </div>
            <div className={s["nav-icon-box"]} onClick={handleSignUp}>
              <h2 className="heading-3">Sign up</h2>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
