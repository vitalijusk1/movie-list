import type { CSSProperties, FC } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  style?: CSSProperties;

  type?: "button" | "submit" | "reset";
  to?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  style,
  type = "button",
  onClick,
  to,
}) => {
  const variantClass =
    variant === "secondary" ? styles.secondary : styles.default;

  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`${styles.button} ${variantClass} ${styles.link}`}
          style={style}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={`${styles.button} ${variantClass}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
