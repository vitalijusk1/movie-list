import type { FC } from "react";
import styles from "./MovieDescription.module.css";
import utilsStyles from "../../../../styles/Utils.module.css";

interface MovieDescriptionProps {
  description: string;
}

const MovieDescription: FC<MovieDescriptionProps> = ({ description }) => {
  return (
    <section className={utilsStyles.container}>
      <div className={styles.movieDescriptionWrapper}>
        <h2 className={styles.movieDescriptionTitle}>About</h2>
        <p className={styles.movieDescription}>{description}</p>
      </div>
    </section>
  );
};

export default MovieDescription;
