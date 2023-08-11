import { Link } from 'react-router-dom';

import styles from './RegistrationForm.module.scss';

import RoutesName from '../../../../shared/routing';

import { TextInput, PasswordInput, SelectInput, DateInput } from '../../../../shared/ui';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function RegistratinonForm(): JSX.Element {
  return (
    <form className={styles.formWrapper}>
      <h3 className={styles.title}>Create An account</h3>
      <div className={styles.line} />
      <TextInput id="1" placeholder="Email" label="Email *" name="Email" value="Email" />
      <PasswordInput id="2" placeholder="Password" label="Password" name="Password" value="Password" />
      <TextInput id="3" placeholder="First name" label="First name" name="First name" value="First name" />
      <TextInput id="4" placeholder="Last name" label="Last name" name="Last name" value="Last name" />
      <DateInput title="Birth date" />
      <SelectInput options={options} title="Select Country" />
      <TextInput id="5" placeholder="City" label="City" name="City" value="City" />
      <TextInput id="5" placeholder="Street" label="Street" name="Street" value="Street" />
      <TextInput id="6" placeholder="Postal" label="Postal" name="Postal" value="Postal" />
      <p className={styles.signInText}>
        Already have an account?{' '}
        <Link to={RoutesName.login} className={styles.signInLink}>
          Sign in
        </Link>
      </p>
      <button type="button" className={styles.signUpButton}>
        Sign up
      </button>
    </form>
  );
}

export default RegistratinonForm;
