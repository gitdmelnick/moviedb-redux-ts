import cl from "./Header.module.css";
import Button from "../../common/sharedComponents/Button/Button";
import Search from "../search/Search";

const Header = () => {
  return (
    <header className={cl.header}>
      <h1>MovieDB</h1>
      <nav className={cl.customNav}>
        {/* Conditional rendering here */}
        <Button onClick={() => {}}>Login</Button>
        <Button onClick={() => {}}>Register</Button>
      </nav>
    </header>
  );
};

export default Header;
