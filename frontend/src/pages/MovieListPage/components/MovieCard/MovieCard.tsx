import type { FC } from "react";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  rating: number;
  posterUrl?: string;
}

const MovieCard: FC<MovieCardProps> = ({ id, title, rating, posterUrl }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.MovieCardWrapper}
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
      <div
        className={styles.MovieCardPoster}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
      <h3 className={styles.MovieTitle}>{title}</h3>
      <span className={styles.MovieRating}>⭐ {rating}</span>
    </div>
  );
};

export default MovieCard;
