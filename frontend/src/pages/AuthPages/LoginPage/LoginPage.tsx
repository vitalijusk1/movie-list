import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import authFormStyles from "../components/AuthForm/AuthForm.module.css";
import AuthForm from "../components/AuthForm/AuthForm";
import authStyles from "../styles/Auth.module.css";
import { loginFields } from "./loginFormData";
import Button from "../../../components/Button/Button";
import { paths } from "../../../router/paths";
import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useAppDispatch } from "../../../store/hooks";
import { loginAsync } from "../../../store/slices/AuthSlice/authThunk";
import utilsStyles from "../../../styles/Utils.module.css";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await dispatch(loginAsync(data)).unwrap();
      navigate(paths.movieList());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section
      className={`${utilsStyles.page} ${utilsStyles.flexCenter} ${utilsStyles.container}`}
    >
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
