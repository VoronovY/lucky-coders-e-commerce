import styles from './ButtonCancel.module.scss';

import Button from '../../../../../shared/ui/button/Button';

interface ButtonCancelProps {
  onClick: () => void;
  name: string;
  width: string;
}
function ButtonCancel({ onClick, name, width }: ButtonCancelProps): JSX.Element {
  return (
    <Button width={width} height="46px" className={styles.cancelButton} onClick={onClick}>
      {name}
    </Button>
  );
}

export default ButtonCancel;
