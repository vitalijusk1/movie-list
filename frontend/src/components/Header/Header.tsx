import { useEffect, useState } from "react";
import { paths } from "../../router/paths";
import { useAppDispatch } from "../../store/hooks";
import { logoutAsync } from "../../store/slices/AuthSlice/authThunk";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate(paths.login());
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={` ${styles.headerWrapper}`}>
        <Logo />
        <nav className={styles.nav}>
          <Button onClick={handleLogout}>Logout</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
