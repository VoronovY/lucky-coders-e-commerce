import styles from './ModalErrors.module.scss';

import { WarningIcon } from '../../../app/layouts/images';

interface ModalErrorsProps {
  errorMessage: string;
}
function ModalErrors({ errorMessage }: ModalErrorsProps): JSX.Element {
  return (
    <div className={styles.formModalWrapper}>
      <WarningIcon />
      <div>{errorMessage}</div>
    </div>
  );
}

export default ModalErrors;
