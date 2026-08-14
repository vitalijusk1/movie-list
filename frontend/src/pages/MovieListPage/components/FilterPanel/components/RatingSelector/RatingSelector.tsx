import { useSearchParams } from "react-router-dom";
import Selector from "../../../../../../components/Selector/Selector";
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
          <Selector
            key={selector.name}
            ariaLabel={selector.label}
            value={selector.value}
            onChange={(value) => updateRating(selector.name, value)}
            options={[
              { value: "", label: selector.placeholder },
              ...ratingOptions.map((rating) => ({
                value: String(rating),
                label: String(rating),
                disabled: selector.isDisabled(rating),
              })),
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingSelector;
