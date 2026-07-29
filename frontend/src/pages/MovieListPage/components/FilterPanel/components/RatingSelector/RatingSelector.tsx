import { useSearchParams } from "react-router-dom";
import styles from "./RatingSelector.module.css";

const ratingOptions = Array.from({ length: 10 }, (_, index) => index + 1);

const RatingSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const minRating = searchParams.get("minRating") ?? "";
  const maxRating = searchParams.get("maxRating") ?? "";

  const selectors = [
    {
      name: "minRating" as const,
      label: "Minimum rating",
      placeholder: "From",
      value: minRating,
      isDisabled: (rating: number) =>
        Boolean(maxRating) && rating > Number(maxRating),
    },
    {
      name: "maxRating" as const,
      label: "Maximum rating",
      placeholder: "To",
      value: maxRating,
      isDisabled: (rating: number) =>
        Boolean(minRating) && rating < Number(minRating),
    },
  ];

  const updateRating = (name: "minRating" | "maxRating", value: string) => {
    const next = new URLSearchParams(searchParams);

    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }

    next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <div className={styles.RatingSelector}>
      <div className={styles.Dropdowns}>
        {selectors.map((selector) => (
          <div className={styles.SelectWrapper} key={selector.name}>
            <select
              aria-label={selector.label}
              className={styles.Select}
              value={selector.value}
              onChange={(event) =>
                updateRating(selector.name, event.target.value)
              }
            >
              <option value="">{selector.placeholder}</option>
              {ratingOptions.map((rating) => (
                <option
                  key={rating}
                  value={rating}
                  disabled={selector.isDisabled(rating)}
                >
                  {rating}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className={styles.Chevron}
              viewBox="0 0 16 16"
            >
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSelector;
