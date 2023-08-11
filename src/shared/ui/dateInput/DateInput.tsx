import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateInput.module.scss';

export interface DateInputProps {
  title?: string | null;
}

function DateInput({ title = null }: DateInputProps): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <DatePicker
        className={styles.input}
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={(date: Date): void => setStartDate(date)}
        showTimeInput
      />
    </div>
  );
}

export { DateInput };
