import styles from "./Pagination.module.css";
import Button from "../../../../components/Button/Button";

const perPageOptions = [8, 12, 24, 48];

const Pagination = () => {
  return (
    <section className={styles.PaginationWrapper}>
      <div className={styles.Pagination}>
        <span className={styles.Info}>Page 1 of 1</span>
        <div className={styles.Controls}>
          <select
            aria-label="Items per page"
            className={styles.Select}
            defaultValue={12}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>

          <div className={styles.ButtonGroup}>
            <div className={styles.PageNumbers}>
              <Button variant="secondary">1</Button>
              <Button variant="default" disabled>
                2
              </Button>
              <Button variant="secondary">3</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
