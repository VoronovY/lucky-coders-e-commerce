import styles from './AddressFields.module.scss';

import Button from '../button/Button';

interface AddressButtonsProps {
  firstBtnText: string;
  secondBtnText: string;
  handleFirstBtn: () => void;
  handleSecondBtn: () => void;
  firstBtnDisable: boolean;
  secondBtnDisable: boolean;
}

function AddressButtons(props: AddressButtonsProps): JSX.Element {
  const { firstBtnDisable, secondBtnDisable, firstBtnText, secondBtnText, handleFirstBtn, handleSecondBtn } = props;
  return (
    <div className={styles.btnConteiner}>
      <Button disabled={firstBtnDisable} type="button" width="40%" height="50px" onClick={handleFirstBtn}>
        {firstBtnText}
      </Button>
      <Button disabled={secondBtnDisable} type="button" width="40%" height="50px" onClick={handleSecondBtn}>
        {secondBtnText}
      </Button>
    </div>
  );
}

export default AddressButtons;
