import useFilterParam from "../../../../../../hooks/useFilterParam";
import styles from "./GenreSelector.module.css";
import Button from "../../../../../../components/Button/Button";
import { useAppSelector } from "../../../../../../store/hooks";

const GenreSelector = () => {
  const genres = useAppSelector((state) => state.movies.genres);
  const [genreIds, setGenreIds] = useFilterParam("genreIds");
  const selectedIds = genreIds ? genreIds.split(",") : [];

  const toggleGenre = (id: string) => {
    const nextIds = selectedIds.includes(id)
      ? selectedIds.filter((g) => g !== id)
      : [...selectedIds, id];
    setGenreIds(nextIds.join(","));
  };

  return (
    <div className={styles.GenreSelector}>
      <div className={styles.Grid}>
        {genres.map((genre) => {
          const isSelected = selectedIds.includes(genre.id.toString());
          return (
            <Button
              key={genre.id}
              variant={isSelected ? "default" : "secondary"}
              onClick={() => toggleGenre(genre.id.toString())}
            >
              {genre.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreSelector;
