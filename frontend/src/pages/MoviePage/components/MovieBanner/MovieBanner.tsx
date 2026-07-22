import type { FC } from "react";
import type { Genre } from "../../../../store/slices/MoviesSlice/types";
import styles from "./MovieBanner.module.css";
import Seperator from "../../../../components/Seperator/Seperator";

interface MovieBannerProps {
  imgUrl?: string;
  title: string;
  rating: number;
  year: number;
  lengthMinutes: number;
  genres: Genre[];
}

const MovieBanner: FC<MovieBannerProps> = ({
  imgUrl,
  title,
  rating,
  year,
  lengthMinutes,
  genres,
}) => {
  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
        <div
          className={styles.poster}
          style={{ backgroundImage: `url(${imgUrl})` }}
          role="img"
          aria-label={`${title} poster`}
        />
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span className={styles.rating}>
              ⭐ {Number(rating).toFixed(1)}
            </span>
            <Seperator vertical />
            <span>{year}</span>
            <Seperator vertical />
            <span>{lengthMinutes} min</span>
          </div>
          <div className={styles.genres}>
            {genres.map((genre) => (
              <span key={genre.id} className={styles.genreTag}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieBanner;
