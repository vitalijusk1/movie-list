import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieGrid.module.css";
import type { Movie } from "../../../../store/slices/MoviesSlice/types";
import type { FC } from "react";
import utilsStyles from "../../../../styles/Utils.module.css";

interface MoviesGridProps {
  movies: Movie[];
}

const MoviesGrid: FC<MoviesGridProps> = ({ movies }) => {
  return (
    <section className={`${utilsStyles.container}`}>
      <div className={styles.MovieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            posterUrl={movie.posterUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default MoviesGrid;
