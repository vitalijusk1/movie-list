import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import styles from "./AuthFormFields.module.css";
import Loader from "../../../../components/Loader/Loader";
import Button from "../../../../components/Button/Button";
import { Link } from "react-router-dom";
import type { paths } from "../../../../router/paths";

export interface AuthFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
}

interface AuthFormFieldsProps<T extends FieldValues> {
  fields: AuthFieldConfig<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  authError?: string | null;
  isAuthFormLoading?: boolean;
  submitBtnTxt?: string;
  linkText: string;
  linkLabel: string;
  linkTo: ReturnType<typeof paths.login> | ReturnType<typeof paths.register>;
}

const AuthFormFields = <T extends FieldValues>({
  fields,
  register,
  errors,
  authError,
  isAuthFormLoading = false,
  submitBtnTxt,
  linkText,
  linkLabel,
  linkTo,
}: AuthFormFieldsProps<T>) => {
  return (
    <>
      {fields.map(({ name, label, type }) => (
        <div key={name} className={styles.formGroup}>
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
          <input
            type={type}
            id={name}
            className={styles.input}
            {...register(name)}
          />
          {errors[name] && (
            <span className={styles.error}>
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      ))}
      {authError && <span className={styles.error}>{authError}</span>}
      <Button
        type="submit"
        style={{ height: "var(--control-height-sm)" }}
        disabled={isAuthFormLoading}
      >
        {isAuthFormLoading ? <Loader /> : submitBtnTxt || "Submit"}
      </Button>
      <p className={styles.authLink}>
        {linkText} <Link to={linkTo}>{linkLabel}</Link>
      </p>
    </>
  );
};

export default AuthFormFields;
