import type { CSSProperties, FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  style?: CSSProperties;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  style,
  className = "",
  type = "button",
  onClick,
}) => {
  const variantClass =
    variant === "secondary" ? styles.secondary : styles.default;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
