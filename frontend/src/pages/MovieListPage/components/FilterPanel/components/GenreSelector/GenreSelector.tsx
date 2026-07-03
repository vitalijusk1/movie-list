import { useState } from "react";
import styles from "./GenreSelector.module.css";

const genres = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
];

const GenreSelector = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleGenre = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((genre) => genre !== value)
        : [...prev, value],
    );
  };

  return (
    <div className={styles.GenreSelector}>
      <span className={styles.Label}>Genre</span>
      <div className={styles.Grid}>
        {genres.map((genre) => {
          const isSelected = selected.includes(genre.value);
          return (
            <label
              key={genre.value}
              className={`${styles.GenreOption} ${isSelected ? styles.Selected : ""}`}
            >
              <input
                type="checkbox"
                value={genre.value}
                checked={isSelected}
                onChange={() => toggleGenre(genre.value)}
              />
              <span>{genre.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default GenreSelector;
