import styles from './PasswordErrors.module.scss';

import { CheckedGreenIcon, CheckedRedIcon } from '../../../app/layouts/images';

interface ErrorItems {
  id: number;
  condition: (value: string) => boolean;
  text: string;
}
export interface PasswordErrorsProps {
  value: string;
  errorItems: ErrorItems[];
}

function PasswordErrors({ value, errorItems }: PasswordErrorsProps): JSX.Element | null {
  return value ? (
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
  ) : null;
}

export { PasswordErrors };
