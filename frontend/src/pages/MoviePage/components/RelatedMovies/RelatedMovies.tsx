import type { FC } from "react";
import type { Movie } from "../../../../store/slices/MoviesSlice/types";
import styles from "./RelatedMovies.module.css";
import MovieCard from "../../../MovieListPage/components/MovieCard/MovieCard";
import utilStyles from "../../../../styles/utils.module.css";

interface RelatedMoviesProps {
  relatedMovies: Movie[];
}

const RelatedMovies: FC<RelatedMoviesProps> = ({ relatedMovies }) => {
  if (relatedMovies.length === 0) {
    return null;
  }

  return (
    <section className={utilStyles.container}>
      <div className={styles.relatedMoviesWrapper}>
        <h2 className={styles.relatedMoviesTitle}>Related Movies</h2>
        <ul className={styles.carousel}>
          {relatedMovies.map((related) => (
            <li key={related.id} className={styles.carouselItem}>
              <MovieCard
                id={related.id}
                title={related.title}
                rating={related.rating}
                posterUrl={related.posterUrl}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedMovies;
