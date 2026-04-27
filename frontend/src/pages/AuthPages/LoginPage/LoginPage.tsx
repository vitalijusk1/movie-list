import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import authFormStyles from "../components/AuthForm/AuthForm.module.css";
import AuthForm from "../components/AuthForm/AuthForm";
import authStyles from "../styles/Auth.module.css";
import { loginFields } from "./loginFormData";
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
    <section className={authStyles.authPage}>
      <AuthForm title="Login" handleSubmit={handleSubmit(onSubmit)}>
        <>
          {loginFields.map(({ name, label, type }) => (
            <div key={name} className={authFormStyles.formGroup}>
              <label htmlFor={name} className={authFormStyles.label}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                className={authFormStyles.input}
                {...register(name as keyof LoginFormValues)}
              />
              {errors[name as keyof LoginFormValues] && (
                <span className={authFormStyles.error}>
                  {errors[name as keyof LoginFormValues]?.message}
                </span>
              )}
            </div>
          ))}
          <Button type="submit">Login</Button>
          <p className={authStyles.authLink}>
            Don't have an account? <Link to={paths.register()}>Register</Link>
          </p>
        </>
      </AuthForm>
    </section>
  );
};

export default LoginPage;
