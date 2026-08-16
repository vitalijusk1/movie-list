import Button from "../../components/Button/Button";
import { paths } from "../../router/paths";
import { useAppSelector } from "../../store/hooks";
import utilsStyles from "../../styles/Utils.module.css";
import styles from "./InvalidPage.module.css";

const InvalidPage = () => {
  const currentUser = useAppSelector((state) => state.user.user);

  return (
    <div
      className={`${utilsStyles.page} ${utilsStyles.flexCenter} ${utilsStyles.container}`}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Page not found</p>
        <Button to={currentUser ? paths.movieList() : paths.login()}>
          {currentUser ? "Go to movies" : "Go to login"}
        </Button>
      </div>
    </div>
  );
};

export default InvalidPage;
