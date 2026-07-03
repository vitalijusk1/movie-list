import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieGrid.module.css";
import type { Movie } from "../../../../store/slices/MoviesSlice/types";
import type { FC } from "react";

interface MoviesGridProps {
  movies: Movie[];
}

const MoviesGrid: FC<MoviesGridProps> = ({ movies }) => {
  return (
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
  );
};

export default MoviesGrid;
