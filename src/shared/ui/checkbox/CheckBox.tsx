import { Ref, forwardRef } from 'react';

import styles from './CheckBox.module.scss';

import { Checked } from '../../../app/layouts/images';

interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string;
  icon?: boolean;
  name?: string;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, ICheckbox>((props: ICheckbox, ref: Ref<HTMLInputElement>) => {
  const { text, id, disabled = false, ...restProps } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      <input className={styles.input} id={id} type="checkbox" {...restProps} ref={ref} disabled={disabled} />
      <span className={styles.box}>
        <Checked className={styles.checkImg} />
      </span>
      <span className={styles.span}>{text}</span>
    </label>
  );
});

export default Checkbox;
