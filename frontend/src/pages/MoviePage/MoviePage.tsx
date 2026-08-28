import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMovieAsync } from "../../store/slices/MoviesSlice/moviesThunk";
import { clearCurrentMovie } from "../../store/slices/MoviesSlice/moviesSlice";
import styles from "./MoviePage.module.css";
import utilsStyles from "../../styles/Utils.module.css";
import Loader from "../../components/Loader/Loader";
import MovieBanner from "./components/MovieBanner/MovieBanner";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import RelatedMovies from "./components/RelatedMovies/RelatedMovies";

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.currentMovie);
  const isLoading = useAppSelector((state) => state.movies.isMovieLoading);
  const error = useAppSelector((state) => state.movies.movieError);

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieAsync(movieId));
    }

    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [movieId, dispatch]);

  if (!movieId) {
    return (
      <div
        className={`${utilsStyles.pageWithHeader} ${utilsStyles.flexCenter}`}
      >
        <p className={styles.message}>No movie found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`${utilsStyles.pageWithHeader} ${utilsStyles.flexCenter}`}
      >
        <Loader size={40} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div
        className={`${utilsStyles.pageWithHeader} ${utilsStyles.flexCenter}`}
      >
        <p className={styles.message}>{error ?? "No movie found"}</p>
      </div>
    );
  }

  return (
    <div className={utilsStyles.pageWithHeader}>
      <MovieBanner
        imgUrl={movie.posterUrl}
        title={movie.title}
        rating={movie.rating}
        year={movie.year}
        lengthMinutes={movie.lengthMinutes}
        genres={movie.genres}
      />

      <div className={styles.details}>
        <MovieDescription description={movie.description} />
        <RelatedMovies relatedMovies={movie.relatedMovies} />
      </div>
    </div>
  );
};

export default MoviePage;
