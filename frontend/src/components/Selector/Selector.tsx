import type { FC, ReactNode } from "react";
import styles from "./Selector.module.css";

export interface SelectorOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
  ariaLabel?: string;
}

const Selector: FC<SelectorProps> = ({
  value,
  onChange,
  options,
  ariaLabel,
}) => {
  return (
    <div className={styles.SelectWrapper}>
      <select
        aria-label={ariaLabel}
        className={styles.Select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" className={styles.Chevron} viewBox="0 0 16 16">
        <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" />
      </svg>
    </div>
  );
};

export default Selector;
