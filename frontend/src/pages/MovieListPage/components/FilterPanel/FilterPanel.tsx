import styles from "./FilterPanel.module.css";
import SearchInput from "./components/SearchInput/SearchInput";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import Seperator from "../../../../components/Seperator/Seperator";

const FilterPanel = () => {
  return (
    <div className={styles.FilterPanelWrapper}>
      <SearchInput />
      <Seperator />
      <GenreSelector />
    </div>
  );
};

export default FilterPanel;
