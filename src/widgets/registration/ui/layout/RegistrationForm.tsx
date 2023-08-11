import styles from './RegistrationForm.module.scss';

import { TextInput, PasswordInput } from '../../../../shared/ui';

function RegistratinonForm(): JSX.Element {
  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>Create An account</h3>
      <div className={styles.line} />
      <PasswordInput id="1" placeholder="Field 2" label="First name *" name="Field 1" value="field 1 value" />
      <TextInput id="1" placeholder="Field 2" label="First name *" name="Field 1" value="field 1 value" />
      <TextInput id="1" placeholder="Field 2" label="Last name" name="Field 1" value="field 1 value" />
      <TextInput id="1" placeholder="City" label="City" name="Field 1" value="field 1 value" />
      <TextInput id="1" placeholder="Street" label="Street" name="Field 1" value="field 1 value" />
      <TextInput id="1" placeholder="Postal" label="Postal" name="Field 1" value="field 1 value" />
    </div>
  );
}

export default RegistratinonForm;
