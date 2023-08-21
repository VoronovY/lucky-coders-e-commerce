import { Link } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

import notFoundImg from '../../../../public/assets/not-found.png';
import Button from '../../../shared/ui/button/Button';
import RoutesName from '../../../shared/routing';
import useScrollToTop from '../../../shared/helpers/ScrollToTop';

interface ErrorPageProps {
  message: string;
}

function ErrorPageLayout({ message }: ErrorPageProps): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.errorPage}>
      <img className={styles.notFoundImg} src={notFoundImg} alt="Not found" />
      <span className={styles.notFoundText}>{message}</span>
      <Link to={RoutesName.catalog}>
        <Button width="335px" height="50px">
          Go to Catalog
        </Button>
      </Link>
      <Link to="/">
        <Button width="335px" height="50px">
          Back Home
        </Button>
      </Link>
    </div>
  );
}

export default ErrorPageLayout;
