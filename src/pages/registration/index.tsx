import styles from './RegistrationPage.module.scss';

import RegistrationForm from '../../widgets/registration/ui/layout/RegistrationForm';
import RedirectToMain from '../../shared/helpers/redirectToMain';

function RegistrationPage(): JSX.Element {
  RedirectToMain();

  return (
    <div className={styles.registrationPage}>
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
