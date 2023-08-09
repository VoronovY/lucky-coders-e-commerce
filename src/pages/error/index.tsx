import { useRouteError } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

import getErrorMessage from '../../shared/helpers/routerHelpres';

function ErrorPage(): JSX.Element {
  const error = useRouteError();

  const message = getErrorMessage(error);

  return <div className={styles.error_page}>{message}</div>;
}

export default ErrorPage;
