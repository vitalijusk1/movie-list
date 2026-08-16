import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import authStyles from "../styles/Auth.module.css";
import authFormStyles from "../components/AuthForm/AuthForm.module.css";
import AuthForm from "../components/AuthForm/AuthForm";
import { registerFields } from "./registerFormData";
import Button from "../../../components/Button/Button";
import { paths } from "../../../router/paths";
import { registerSchema, type RegisterFormValues } from "./registerSchema";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { registerAsync } from "../../../store/slices/UserSlice/userThunk";
import { clearAuthError } from "../../../store/slices/UserSlice/userSlice";
import utilsStyles from "../../../styles/Utils.module.css";
import Loader from "../../../components/Loader/Loader";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthFormLoading = useAppSelector(
    (state) => state.user.isAuthFormLoading,
  );
  const authError = useAppSelector((state) => state.user.authError);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const watchUsername = watch("username");
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchRepeatPassword = watch("repeatPassword");

  const previousValuesRef = useRef({
    username: watchUsername,
    email: watchEmail,
    password: watchPassword,
    repeatPassword: watchRepeatPassword,
  });

  useEffect(() => {
    const currentValues = {
      username: watchUsername,
      email: watchEmail,
      password: watchPassword,
      repeatPassword: watchRepeatPassword,
    };

    const hasChanged = Object.keys(currentValues).some(
      (key) =>
        currentValues[key as keyof typeof currentValues] !==
        previousValuesRef.current[key as keyof typeof currentValues],
    );

    if (hasChanged && authError) {
      dispatch(clearAuthError());
    }

    previousValuesRef.current = currentValues;
  }, [
    watchUsername,
    watchEmail,
    watchPassword,
    watchRepeatPassword,
    authError,
    dispatch,
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormValues) => {
    await dispatch(registerAsync(data)).unwrap();
    navigate(paths.registerSuccess());
  };

  return (
    <section
      className={`${utilsStyles.page} ${utilsStyles.flexCenter} ${utilsStyles.container}`}
    >
      <AuthForm title="Register" handleSubmit={handleSubmit(onSubmit)}>
        <>
          {registerFields.map(({ name, label, type }) => (
            <div key={name} className={authFormStyles.formGroup}>
              <label htmlFor={name} className={authFormStyles.label}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                className={authFormStyles.input}
                {...register(name as keyof RegisterFormValues)}
              />
              {errors[name as keyof RegisterFormValues] && (
                <span className={authFormStyles.error}>
                  {errors[name as keyof RegisterFormValues]?.message}
                </span>
              )}
            </div>
          ))}
          {authError && (
            <span className={authFormStyles.error}>{authError}</span>
          )}
          <Button
            type="submit"
            style={{ height: "var(--control-height-sm)" }}
            disabled={isAuthFormLoading}
          >
            {isAuthFormLoading ? <Loader /> : "Register"}
          </Button>
          <p className={authStyles.authLink}>
            Already have an account? <Link to={paths.login()}>Login</Link>
          </p>
        </>
      </AuthForm>
    </section>
  );
};

export default RegisterPage;
