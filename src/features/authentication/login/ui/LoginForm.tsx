import styles from './LoginForm.module.scss';

function LoginForm(): JSX.Element {
  return (
    <form className={styles.formWrapper}>
      <h3 className={styles.title}>Log in to your account</h3>
      <div className={styles.line} />
    </form>
  );
}

export default LoginForm;
