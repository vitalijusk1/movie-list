import MoviesGrid from "./components/MoviesGrid/MoviesGrid";
import utilsStyles from "../../styles/Utils.module.css";
import { useAppDispatch } from "../../store/hooks";
import {
  getMoviesAsync,
  getGenresAsync,
} from "../../store/slices/MoviesSlice/moviesThunk";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Pagination from "./components/Pagination/Pagination";

const MovieListPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const total = useAppSelector((state) => state.movies.total);
  const [searchParams] = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",").map(Number) ?? [];
  const search = searchParams.get("search") ?? "";
  const minRating = searchParams.get("minRating") ?? undefined;
  const maxRating = searchParams.get("maxRating") ?? undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const perPage = Math.max(1, Number(searchParams.get("perPage")) || 12);
  const sort = searchParams.get("sort") ?? undefined;

  useEffect(() => {
    dispatch(getGenresAsync());
  }, []);

  const sortedMovies = useMemo(() => {
    if (!sort) return movies;
    const [field, order] = sort.split("-");
    const sorted = [...movies];
    sorted.sort((a, b) => {
      let comparison = 0;
      if (field === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (field === "rating") {
        comparison = a.rating - b.rating;
      } else if (field === "year") {
        comparison = a.year - b.year;
      }
      return order === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [movies, sort]);

  useEffect(() => {
    dispatch(
      getMoviesAsync({ genreIds, search, minRating, maxRating, page, perPage }),
    );
  }, [searchParams, page, perPage]);

  return (
    <div className={utilsStyles.pageWithHeader}>
      <FilterPanel />
      <MoviesGrid movies={sortedMovies} />
      <Pagination page={page} perPage={perPage} total={total} />
    </div>
  );
};

export default MovieListPage;
