import type { CSSProperties, FC } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
  fullScreen?: boolean;
  style?: CSSProperties;
}

const Loader: FC<LoaderProps> = ({
  size = 40,
  color = "var(--accent-primary)",
  fullScreen = false,
  style,
}) => {
  return (
    <div
      className={fullScreen ? styles.fullScreen : styles.container}
      style={style}
    >
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
