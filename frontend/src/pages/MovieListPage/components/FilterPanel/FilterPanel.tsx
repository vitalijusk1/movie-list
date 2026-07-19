import { Fragment } from "react";
import styles from "./FilterPanel.module.css";
import SearchInput from "./components/SearchInput/SearchInput";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import RatingSelector from "./components/RatingSelector/RatingSelector";
import FilterSection from "./components/FilterSection/FilterSection";
import Seperator from "../../../../components/Seperator/Seperator";

const filterSections = [
  { title: "Search", Component: SearchInput },
  { title: "Genre", Component: GenreSelector },
  { title: "Rating", Component: RatingSelector },
];

const FilterPanel = () => {
  return (
    <div className={styles.FilterPanelWrapper}>
      {filterSections.map(({ title, Component }, index) => (
        <Fragment key={title}>
          <FilterSection title={title}>
            <Component />
          </FilterSection>
          {index < filterSections.length - 1 && <Seperator />}
        </Fragment>
      ))}
    </div>
  );
};

export default FilterPanel;
