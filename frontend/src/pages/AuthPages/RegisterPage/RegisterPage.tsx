import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import { registerFields } from "./registerFormData";
import { paths } from "../../../router/paths";
import { registerSchema, type RegisterFormValues } from "./registerSchema";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { registerAsync } from "../../../store/slices/UserSlice/userThunk";
import { clearAuthError } from "../../../store/slices/UserSlice/userSlice";
import utilsStyles from "../../../styles/Utils.module.css";
import AuthFormFields from "../components/AuthFormFields/AuthFormFields";

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
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, []);

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
          <AuthFormFields
            fields={registerFields}
            register={register}
            errors={errors}
            authError={authError}
            submitBtnTxt="Register"
            isAuthFormLoading={isAuthFormLoading}
            linkText="Already have an account?"
            linkLabel="Login"
            linkTo={paths.login()}
          />
        </>
      </AuthForm>
    </section>
  );
};

export default RegisterPage;
