import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import authFormStyles from "../AuthForm/AuthForm.module.css";

export interface AuthFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
}

interface AuthFormFieldsProps<T extends FieldValues> {
  fields: AuthFieldConfig<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const AuthFormFields = <T extends FieldValues>({
  fields,
  register,
  errors,
}: AuthFormFieldsProps<T>) => {
  return (
    <>
      {fields.map(({ name, label, type }) => (
        <div key={name} className={authFormStyles.formGroup}>
          <label htmlFor={name} className={authFormStyles.label}>
            {label}
          </label>
          <input
            type={type}
            id={name}
            className={authFormStyles.input}
            {...register(name)}
          />
          {errors[name] && (
            <span className={authFormStyles.error}>
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default AuthFormFields;
