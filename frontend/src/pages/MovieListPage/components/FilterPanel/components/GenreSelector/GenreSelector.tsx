import { useSearchParams } from "react-router-dom";
import styles from "./GenreSelector.module.css";
import Button from "../../../../../../components/Button/Button";
import { useAppSelector } from "../../../../../../store/hooks";

const GenreSelector = () => {
  const genres = useAppSelector((state) => state.movies.genres);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIds = searchParams.get("genreIds")?.split(",") ?? [];

  const toggleGenre = (id: string) => {
    const next = new URLSearchParams(searchParams);
    const isAlreadySelected = selectedIds.includes(id);

    if (isAlreadySelected) {
      const withoutId = selectedIds.filter((g) => g !== id);
      withoutId.length > 0
        ? next.set("genreIds", withoutId.join(","))
        : next.delete("genreIds");
    } else {
      next.set("genreIds", [...selectedIds, id].join(","));
    }

    setSearchParams(next);
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
