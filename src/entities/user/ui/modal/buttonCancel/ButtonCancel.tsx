import styles from './ButtonCancel.module.scss';

import Button from '../../../../../shared/ui/button/Button';

interface ButtonCancelProps {
  onClick: () => void;
}
function ButtonCancel({ onClick }: ButtonCancelProps): JSX.Element {
  return (
    <Button width="100%" height="46px" className={styles.cancelButton} onClick={onClick}>
      Cancel
    </Button>
  );
}

export default ButtonCancel;
