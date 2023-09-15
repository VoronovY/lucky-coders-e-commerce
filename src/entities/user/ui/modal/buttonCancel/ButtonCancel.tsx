import styles from './ButtonCancel.module.scss';

import Button from '../../../../../shared/ui/button/Button';

interface ButtonCancelProps {
  onClick: () => void;
  name: string;
}
function ButtonCancel({ onClick, name }: ButtonCancelProps): JSX.Element {
  return (
    <Button width="100%" height="46px" className={styles.cancelButton} onClick={onClick}>
      {name}
    </Button>
  );
}

export default ButtonCancel;
