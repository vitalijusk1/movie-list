import { useState } from "react";
import authStyles from "../components/AuthForm/AuthForm.module.css";
import utilStyles from "../../../styles/Utils.module.css";
import styles from "./LoginPage.module.css";
import AuthForm from "../components/AuthForm/AuthForm";
import { loginFields } from "./formData";
import Button from "../../../components/Button/Button";
import { paths } from "../../../router/paths";
import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useAppDispatch } from "../../../store/hooks";
import { loginAsync } from "../../../store/slices/AuthSlice/authThunk";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    dispatch(loginAsync(data));
  };

  return (
    <section className={styles.loginPage}>
      <AuthForm title="Login" handleSubmit={handleSubmit}>
        <>
          {loginFields.map(({ name, label, type }) => (
            <div key={name} className={authStyles.formGroup}>
              <label htmlFor={name} className={authStyles.label}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                className={authStyles.input}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button type="submit">Login</Button>
        </>
      </AuthForm>
    </section>
  );
};

export default LoginPage;
