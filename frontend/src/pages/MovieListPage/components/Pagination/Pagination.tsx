import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";
import Button from "../../../../components/Button/Button";
import { useAppSelector } from "../../../../store/hooks";

const perPageOptions = [8, 12, 24, 48];

interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
}

const Pagination = ({ page, perPage, total }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams();
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, totalPages);

  const updatePage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  const updatePerPage = (newPerPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("perPage", String(newPerPage));
      next.set("page", "1");
      return next;
    });
  };

  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, currentPage + 1);

  if (end - start < 2) {
    if (start === 1) {
      end = Math.min(totalPages, start + 2);
    } else if (end === totalPages) {
      start = Math.max(1, end - 2);
    }
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <section className={styles.PaginationWrapper}>
      <div className={styles.Pagination}>
        <span className={styles.Info}>
          Page {currentPage} of {totalPages}
        </span>
        <div
          className={`${styles.Controls} ${isLoading ? styles.loading : ""}`}
        >
          <select
            aria-label="Items per page"
            className={styles.Select}
            value={perPage}
            onChange={(event) => updatePerPage(Number(event.target.value))}
            disabled={isLoading}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>

          <div className={styles.ButtonGroup}>
            <Button
              variant="secondary"
              onClick={() => updatePage(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
            >
              Prev
            </Button>

            <div className={styles.PageNumbers}>
              {pages.map((p) => (
                <Button
                  key={p}
                  variant={p === currentPage ? "default" : "secondary"}
                  onClick={() => updatePage(p)}
                  disabled={p === currentPage || isLoading}
                >
                  {p}
                </Button>
              ))}
            </div>

            <Button
              variant="secondary"
              onClick={() => updatePage(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
