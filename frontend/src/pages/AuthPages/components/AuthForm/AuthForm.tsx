import styles from "./AuthForm.module.css";

interface AuthFormProps {
  title: string;
  handleSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const AuthForm = ({ title, handleSubmit, children }: AuthFormProps) => {
  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>{title}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
