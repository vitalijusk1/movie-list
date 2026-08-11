import type { FC } from "react";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  rating: number;
  posterUrl?: string;
}

const MovieCard: FC<MovieCardProps> = ({ id, title, rating, posterUrl }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const showPoster = Boolean(posterUrl) && !imageError;
  return (
    <div
      className={styles.MovieCardWrapper}
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
      <div
        className={`${styles.MovieCardPoster} ${
          !showPoster ? styles.MovieCardPosterPlaceholder : ""
        }`}
      >
        {showPoster ? (
          <img
            src={posterUrl}
            alt={title}
            className={styles.MovieCardPosterImage}
            // if url returns 404
            onError={() => setImageError(true)}
          />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <h3 className={styles.MovieTitle}>{title}</h3>
      <span className={styles.MovieRating}>⭐ {rating}</span>
    </div>
  );
};

export default MovieCard;
