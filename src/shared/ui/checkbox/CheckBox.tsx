import styles from './CheckBox.module.scss';

import { Checked } from '../../../app/layouts/images';

interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string;
  icon?: boolean;
  name?: string;
  disabled?: boolean;
}

function Checkbox({ text, id, icon, name, disabled = false, ...restProps }: ICheckbox): JSX.Element {
  return (
    <label htmlFor={id} className={styles.label}>
      <input className={styles.input} id={id} type="checkbox" {...restProps} disabled={disabled} />
      <span className={styles.box}>
        <Checked className={styles.checkImg} />
      </span>
      <span className={styles.span}>{text}</span>
    </label>
  );
}

export default Checkbox;
