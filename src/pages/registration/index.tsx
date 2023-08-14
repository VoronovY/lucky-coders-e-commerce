import styles from './RegistrationPage.module.scss';

import RegistrationForm from '../../widgets/registration/ui/layout/RegistrationForm';

function RegistrationPage(): JSX.Element {
  return (
    <div className={styles.registrationPage}>
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;
