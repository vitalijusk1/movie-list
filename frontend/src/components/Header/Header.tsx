import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutAsync } from "../../store/slices/UserSlice/userThunk";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Loader from "../Loader/Loader";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const isLogoutLoading = useAppSelector((state) => state.user.isLogoutLoading);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={` ${styles.headerWrapper}`}>
        <Logo />
        <nav className={styles.nav}>
          <Button
            onClick={handleLogout}
            style={{
              height: "var(--control-height-sm)",
              width: "var(--control-width-sm)",
            }}
            disabled={isLogoutLoading}
          >
            {isLogoutLoading ? <Loader /> : "Logout"}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
