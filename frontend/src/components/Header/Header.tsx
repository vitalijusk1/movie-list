import { paths } from "../../router/paths";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href={paths.movieList()} className={styles.logo}>
        MovieList
      </a>
      <nav className={styles.nav}>
        <a href={paths.login()} className={styles.navLink}>
          Login
        </a>
        <a href={paths.register()} className={styles.navLink}>
          Register
        </a>
      </nav>
    </header>
  );
};

export default Header;
