import MoviesGrid from "./components/MoviesGrid/MoviesGrid";
import utilsStyles from "../../styles/Utils.module.css";
import { useAppDispatch } from "../../store/hooks";
import { getMoviesAsync } from "../../store/slices/MoviesSlice/moviesThunk";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import FilterPanel from "./components/FilterPanel/FilterPanel";

const MovieListPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, []);

  return (
    <section
      className={`${utilsStyles.pageWithHeader} ${utilsStyles.container}`}
    >
      <FilterPanel />
      <MoviesGrid movies={movies} />
    </section>
  );
};

export default MovieListPage;
