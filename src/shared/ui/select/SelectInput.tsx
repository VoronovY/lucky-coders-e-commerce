import Select, { Theme } from 'react-select';
import cn from 'classnames';

import styles from './Select.module.scss';

type OptionInput = {
  value: string;
  label: string;
};

export interface SelectInputProps {
  options: OptionInput[];
  title?: string | null;
}

function SelectInput({ options, title = null }: SelectInputProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {title && <p>{title}</p>}
      <Select
        options={options}
        theme={(theme): Theme => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary25: 'neutral10',
            primary: 'black',
          },
        })}
        classNames={{
          control: (state): string => {
            return cn(state.isFocused && styles.select);
          },
        }}
        className={styles.select}
      />
    </div>
  );
}

export { SelectInput };
