import { Link } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

import notFoundImg from '../../../../public/assets/not-found.png';
import Button from '../../../shared/ui/button/Button';

interface ErrorPageProps {
  message: string;
}

function ErrorPageLayout({ message }: ErrorPageProps): JSX.Element {
  return (
    <div className={styles.errorPage}>
      <img className={styles.notFoundImg} src={notFoundImg} alt="Not found" />
      <span className={styles.notFoundText}>{message}</span>
      <Link to="/">
        <Button width="335px" height="65px">
          Back Home
        </Button>
      </Link>
    </div>
  );
}

export default ErrorPageLayout;
