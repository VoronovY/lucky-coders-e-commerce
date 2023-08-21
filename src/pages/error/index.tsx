import { useRouteError } from 'react-router-dom';

import ErrorPageLayout from './ui/ErrorPage';

import getErrorMessage from '../../shared/helpers/routerHelpres';
import LayoutHeader from '../../widgets/header';
import LayoutFooter from '../../widgets/footer';
import { Layout } from '../../shared/ui';

function ErrorPage(): JSX.Element {
  const error = useRouteError();

  const message = getErrorMessage(error);

  return (
    <Layout
      headerSlot={<LayoutHeader />}
      bodySlot={<ErrorPageLayout message={message} />}
      bottomSlot={<LayoutFooter />}
    />
  );
}

export default ErrorPage;
