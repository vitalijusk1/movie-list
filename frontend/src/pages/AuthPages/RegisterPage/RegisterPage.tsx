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
import { useAppDispatch } from "../../../store/hooks";
import { registerAsync } from "../../../store/slices/UserSlice/userThunk";
import utilsStyles from "../../../styles/Utils.module.css";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await dispatch(registerAsync(data)).unwrap();
      navigate(paths.registerSuccess());
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
          <Button type="submit">Register</Button>
          <p className={authStyles.authLink}>
            Already have an account? <Link to={paths.login()}>Login</Link>
          </p>
        </>
      </AuthForm>
    </section>
  );
};

export default RegisterPage;
