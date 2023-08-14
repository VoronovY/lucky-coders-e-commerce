import styles from './PasswordErrors.module.scss';

import { CheckedGreenIcon, CheckedRedIcon } from '../../../app/layouts/images';

export interface PasswordErrorsProps {
  value: string;
  errorItems: {
    id: number;
    condition: (value: string) => boolean;
    text: string;
  }[];
}

function PasswordErrors({ value, errorItems }: PasswordErrorsProps): JSX.Element {
  return (
    <>
      <span>The password must contain:</span>
      <div className={styles.errorList}>
        {errorItems.map((error) => (
          <div className={styles.errorItem} key={error.id}>
            {error.condition(value) ? <CheckedRedIcon /> : <CheckedGreenIcon />}
            <span>{error.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export { PasswordErrors };
