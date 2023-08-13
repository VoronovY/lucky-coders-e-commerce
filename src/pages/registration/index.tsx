import styles from './RegistrationPage.module.scss';

import RegistratinonForm from '../../widgets/registration/ui/layout/RegistrationForm';

function RegistrationPage(): JSX.Element {
  return (
    <div className={styles.registrationPage}>
      <RegistratinonForm />
    </div>
  );
}

export default RegistrationPage;
