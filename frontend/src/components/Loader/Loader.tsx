import type { CSSProperties, FC } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

const Loader: FC<LoaderProps> = ({
  size = 16,
  color = "var(--violet-50)",
  style,
}) => {
  return (
    <div className={styles.loaderWrapper} style={style}>
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
