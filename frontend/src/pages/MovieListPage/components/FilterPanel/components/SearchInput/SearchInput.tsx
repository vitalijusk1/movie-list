import styles from "./SearchInput.module.css";

const SearchInput = () => {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className={styles.SearchInput}
    />
  );
};

export default SearchInput;
