import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import { loginFields } from "./loginFormData";
import { paths } from "../../../router/paths";
import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginAsync } from "../../../store/slices/UserSlice/userThunk";
import { clearAuthError } from "../../../store/slices/UserSlice/userSlice";
import utilsStyles from "../../../styles/Utils.module.css";
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
  }, [watchEmail, watchPassword, authError]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, []);

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
            authError={authError}
            submitBtnTxt="Login"
            isAuthFormLoading={isAuthFormLoading}
            linkText="Don't have an account?"
            linkLabel="Register"
            linkTo={paths.register()}
          />
        </>
      </AuthForm>
    </section>
  );
};

export default LoginPage;
