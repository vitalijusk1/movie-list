import MoviesGrid from "./components/MoviesGrid/MoviesGrid";
import utilsStyles from "../../styles/Utils.module.css";
import { useAppDispatch } from "../../store/hooks";
import {
  getMoviesAsync,
  getGenresAsync,
} from "../../store/slices/MoviesSlice/moviesThunk";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import FilterPanel from "./components/FilterPanel/FilterPanel";

const MovieListPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const [searchParams] = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",").map(Number) ?? [];
  const search = searchParams.get("search") ?? "";
  const minRating = searchParams.get("minRating") ?? undefined;
  const maxRating = searchParams.get("maxRating") ?? undefined;

  useEffect(() => {
    dispatch(getGenresAsync());
  }, []);

  useEffect(() => {
    dispatch(getMoviesAsync({ genreIds, search, minRating, maxRating }));
  }, [searchParams]);

  return (
    <div className={utilsStyles.pageWithHeader}>
      <FilterPanel />
      <MoviesGrid movies={movies} />
    </div>
  );
};

export default MovieListPage;
