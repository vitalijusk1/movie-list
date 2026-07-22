import styles from "./Seperator.module.css";

interface SeperatorProps {
  vertical?: boolean;
}

const Seperator = ({ vertical = false }: SeperatorProps) => {
  return (
    <div
      className={`${styles.Seperator} ${
        vertical ? styles.vertical : styles.horizontal
      }`}
    />
  );
};

export default Seperator;
