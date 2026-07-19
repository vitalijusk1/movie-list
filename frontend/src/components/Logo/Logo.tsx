import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo-icon.svg";
import { paths } from "../../router/paths";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to={paths.movieList()} className={styles.Logo} aria-label="FilmFaves">
      <img className={styles.Icon} src={logoIcon} alt="" />
      <span className={styles.Wordmark}>FilmFaves</span>
    </Link>
  );
};

export default Logo;
