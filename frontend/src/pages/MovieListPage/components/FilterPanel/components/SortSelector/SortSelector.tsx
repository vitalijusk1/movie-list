import { useSearchParams } from "react-router-dom";
import Selector from "../../../../../../components/Selector/Selector";

const sortOptions = [
  { value: "", label: "Default" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "rating-desc", label: "Rating (high to low)" },
  { value: "rating-asc", label: "Rating (low to high)" },
  { value: "year-desc", label: "Year (newest first)" },
  { value: "year-asc", label: "Year (oldest first)" },
];

const SortSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("sort") ?? "";

  const handleChange = (sort: string) => {
    const next = new URLSearchParams(searchParams);
    if (sort) {
      next.set("sort", sort);
    } else {
      next.delete("sort");
    }
    setSearchParams(next);
  };

  return (
    <Selector
      ariaLabel="Sort by"
      value={value}
      onChange={handleChange}
      options={sortOptions}
    />
  );
};

export default SortSelector;
