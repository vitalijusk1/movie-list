import { useSearchParams } from "react-router-dom";
import Selector from "../../../../../../components/Selector/Selector";
import { useAppSelector } from "../../../../../../store/hooks";

const SortSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOptions = useAppSelector((state) => state.movies.sortOptions);
  const value = searchParams.get("sort") ?? "";

  const handleChange = (sort: string) => {
    const next = new URLSearchParams(searchParams);
    if (sort) {
      next.set("sort", sort);
    } else {
      next.delete("sort");
    }
    next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <Selector
      ariaLabel="Sort by"
      value={value}
      onChange={handleChange}
      options={[{ value: "", label: "Default" }, ...sortOptions]}
    />
  );
};

export default SortSelector;
