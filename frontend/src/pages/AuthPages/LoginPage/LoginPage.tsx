import { useEffect, useRef } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginAsync } from "../../../store/slices/UserSlice/userThunk";
import { clearAuthError } from "../../../store/slices/UserSlice/userSlice";
import utilsStyles from "../../../styles/Utils.module.css";
import Loader from "../../../components/Loader/Loader";
import AuthFormFields from "../components/AuthFormFields/AuthFormFields";

const LoginPage = () => {
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
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const previousEmailRef = useRef(watchEmail);
  const previousPasswordRef = useRef(watchPassword);

  useEffect(() => {
    const emailChanged = watchEmail !== previousEmailRef.current;
    const passwordChanged = watchPassword !== previousPasswordRef.current;

    if ((emailChanged || passwordChanged) && authError) {
      dispatch(clearAuthError());
    }

    previousEmailRef.current = watchEmail;
    previousPasswordRef.current = watchPassword;
  }, [watchEmail, watchPassword, authError, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(loginAsync(data)).unwrap();
    navigate(paths.movieList());
  };

  return (
    <section
      className={`${utilsStyles.page} ${utilsStyles.flexCenter} ${utilsStyles.container}`}
    >
      <AuthForm title="Login" handleSubmit={handleSubmit(onSubmit)}>
        <>
          <AuthFormFields
            fields={loginFields}
            register={register}
            errors={errors}
          />
          {authError && (
            <span className={authFormStyles.error}>{authError}</span>
          )}
          <Button
            type="submit"
            style={{ height: "var(--control-height-sm)" }}
            disabled={isAuthFormLoading}
          >
            {isAuthFormLoading ? <Loader /> : "Login"}
          </Button>
          <p className={authStyles.authLink}>
            Don't have an account? <Link to={paths.register()}>Register</Link>
          </p>
        </>
      </AuthForm>
    </section>
  );
};

export default LoginPage;
