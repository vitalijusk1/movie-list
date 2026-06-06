import utilsStyles from "../../../styles/Utils.module.css";
import styles from "./RegisterSuccessPage.module.css";
import Button from "../../../components/Button/Button";
import { paths } from "../../../router/paths";

const RegisterSuccessPage = () => {
  return (
    <section
      className={`${utilsStyles.page} ${utilsStyles.flexCenter} ${utilsStyles.flexColumn} ${utilsStyles.container}`}
    >
      <h1 className={styles.messageText}>Welcome to the platform!</h1>
      <p className={styles.messageText}>
        You have successfully registered. You can now login to your account.
      </p>

      <Button style={{ marginTop: "var(--space-xl)" }} to={paths.login()}>
        Login
      </Button>
    </section>
  );
};

export default RegisterSuccessPage;
