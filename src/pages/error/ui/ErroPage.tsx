import styles from './ErrorPage.module.scss';

import notFoundImg from '../../../../public/assets/not-found.png';

interface ErrorPageProps {
  message: string;
}

function ErrorPageLayout({ message }: ErrorPageProps): JSX.Element {
  return (
    <div className={styles.errorPage}>
      <img className={styles.notFoundImg} src={notFoundImg} alt="Not found" />
      <span className={styles.notFoundText}>{message}</span>
      <button type="button">Back Home</button>
    </div>
  );
}

export default ErrorPageLayout;
