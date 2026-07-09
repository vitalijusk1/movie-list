import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../../../../utils/useDebounce";
import styles from "./SearchInput.module.css";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debouncedValue.trim()) {
        next.set("search", debouncedValue.trim());
      } else {
        next.delete("search");
      }
      return next;
    });
  }, [debouncedValue]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.SearchInput}
    />
  );
};

export default SearchInput;
