import Selector from "../../../../../../components/Selector/Selector";
import useFilterParam from "../../../../../../hooks/useFilterParam";
import styles from "./RatingSelector.module.css";

const ratingOptions = Array.from({ length: 10 }, (_, index) => index + 1);

const RatingSelector = () => {
  const [minRating, setMinRating] = useFilterParam("minRating");
  const [maxRating, setMaxRating] = useFilterParam("maxRating");

  return (
    <div className={styles.RatingSelector}>
      <div className={styles.Dropdowns}>
        <Selector
          ariaLabel="Minimum rating"
          value={minRating}
          onChange={setMinRating}
          options={[
            { value: "", label: "From" },
            ...ratingOptions.map((rating) => ({
              value: String(rating),
              label: String(rating),
              disabled: Boolean(maxRating) && rating > Number(maxRating),
            })),
          ]}
        />
        <Selector
          ariaLabel="Maximum rating"
          value={maxRating}
          onChange={setMaxRating}
          options={[
            { value: "", label: "To" },
            ...ratingOptions.map((rating) => ({
              value: String(rating),
              label: String(rating),
              disabled: Boolean(minRating) && rating < Number(minRating),
            })),
          ]}
        />
      </div>
    </div>
  );
};

export default RatingSelector;
