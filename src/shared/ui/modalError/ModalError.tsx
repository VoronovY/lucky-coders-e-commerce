import styles from './ModalError.module.scss';

import { WarningIcon } from '../../../app/layouts/images';

interface ModalErrorProps {
  errorMessage: string;
}
function ModalError({ errorMessage }: ModalErrorProps): JSX.Element {
  return (
    <div className={styles.modalWrapper}>
      <WarningIcon />
      <div>{errorMessage}</div>
    </div>
  );
}

export default ModalError;
