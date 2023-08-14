import styles from './PasswordErrors.module.scss';

import { CheckedGreenIcon, CheckedRedIcon } from '../../../app/layouts/images';

export interface PasswordErrorsProps {
  value: string;
}
function PasswordErrors({ value }: PasswordErrorsProps): JSX.Element {
  const errorItems = [
    {
      id: 1,
      condition: value.length < 8,
      text: 'at least 8 characters',
    },
    {
      id: 2,
      condition: !/[A-Z]/.test(value),
      text: 'at least one uppercase letter (A-Z)',
    },
    {
      id: 3,
      condition: !/[a-z]/.test(value),
      text: 'at least one lowercase letter (a-z)',
    },
    {
      id: 4,
      condition: !/\d/.test(value),
      text: 'at least one digit (0-9)',
    },
  ];

  return (
    <>
      <span>The password must contain:</span>
      <div className={styles.errorList}>
        {errorItems.map((error) => (
          <div className={styles.errorItem} key={error.id}>
            {error.condition ? <CheckedRedIcon /> : <CheckedGreenIcon />}
            <span>{error.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export { PasswordErrors };
