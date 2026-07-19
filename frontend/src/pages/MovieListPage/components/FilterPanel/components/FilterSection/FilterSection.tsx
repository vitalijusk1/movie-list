import type { ReactNode } from "react";
import styles from "./FilterSection.module.css";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
  return (
    <section className={styles.FilterSection}>
      <h2 className={styles.Title}>{title}</h2>
      {children}
    </section>
  );
};

export default FilterSection;
