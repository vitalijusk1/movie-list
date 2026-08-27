import Selector from "../../../../../../components/Selector/Selector";
import useFilterParam from "../../../../../../hooks/useFilterParam";
import { useAppSelector } from "../../../../../../store/hooks";

const SortSelector = () => {
  const sortOptions = useAppSelector((state) => state.movies.sortOptions);
  const [value, setValue] = useFilterParam("sort");

  return (
    <Selector
      ariaLabel="Sort by"
      value={value}
      onChange={setValue}
      options={[{ value: "", label: "Default" }, ...sortOptions]}
    />
  );
};

export default SortSelector;
