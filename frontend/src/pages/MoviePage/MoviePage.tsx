import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { apiRoutes } from "../../api/api";
import type { Movie } from "../../store/slices/MoviesSlice/types";
import styles from "./MoviePage.module.css";
import utilsStyles from "../../styles/Utils.module.css";
import Loader from "../../components/Loader/Loader";
import MovieBanner from "./components/MovieBanner/MovieBanner";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import RelatedMovies from "./components/RelatedMovies/RelatedMovies";

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      try {
        const response = await axiosInstance.get<Movie>(apiRoutes.movie(id));
        setMovie(response.data);
      } catch {
        console.log("error");
      }
    };

    if (movieId) {
      fetchMovie(movieId);
    }
  }, [movieId]);

  if (!movieId) {
    return (
      <div
        className={`${utilsStyles.pageWithHeader} ${utilsStyles.flexCenter}`}
      >
        <p className={styles.message}>No movie found</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        className={`${utilsStyles.pageWithHeader} ${utilsStyles.flexCenter}`}
      >
        <Loader size={40} />
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
