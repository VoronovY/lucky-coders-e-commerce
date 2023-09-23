import styles from './ModalError.module.scss';

import { WarningIcon } from '../../../app/layouts/images';
import Portal from '../../../widgets/portal/Portal';

interface ModalErrorProps {
  errorMessage: string;
}
function ModalError({ errorMessage }: ModalErrorProps): JSX.Element {
  return (
    <Portal target="modal">
      <div className={styles.modalWrapper}>
        <WarningIcon />
        <div>{errorMessage}</div>
      </div>
    </Portal>
  );
}

export default ModalError;
