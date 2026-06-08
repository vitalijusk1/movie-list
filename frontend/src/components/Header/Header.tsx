import { paths } from "../../router/paths";
import { useAppDispatch } from "../../store/hooks";
import { logoutAsync } from "../../store/slices/AuthSlice/authThunk";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate(paths.login());
  };
  
  return (
    <header className={styles.header}>
      <a href={paths.movieList()} className={styles.logo}>
        MovieList
      </a>
      <nav className={styles.nav}>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  );
};

export default Header;
