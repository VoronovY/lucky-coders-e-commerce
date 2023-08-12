import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { FieldError } from 'react-hook-form';

import styles from './DateInput.module.scss';

export interface DateInputProps {
  value: Date;
  title?: string | null;
  onChange: (date: Date) => void;
  error?: FieldError;
}

function DateInput({ value, title = null, onChange, error }: DateInputProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <DatePicker className={styles.input} dateFormat="dd.MM.yyyy" selected={value} onChange={onChange} showTimeInput />
      {error && <div>{error.message}</div>}
    </div>
  );
}

export { DateInput };
