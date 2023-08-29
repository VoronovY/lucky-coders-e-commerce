import cn from 'classnames';

import styles from './ColorIcon.module.scss';

function ColorIcon({ color }: { color: string }): JSX.Element {
  const iconStyle = cn(styles.colorIcon, {
    [styles.pink]: color === 'Pink',
    [styles.blue]: color === 'Blue',
    [styles.purple]: color === 'Purple',
    [styles.white]: color === 'White',
    [styles.cream]: color === 'Cream',
    [styles.black]: color === 'Black',
    [styles.yellow]: color === 'Yellow',
    [styles.orange]: color === 'Orange',
    [styles.red]: color === 'Red',
    [styles.gray]: color === 'Gray',
    [styles.green]: color === 'Green',
    [styles.turquoise]: color === 'Turquoise',
  });
  return <div className={iconStyle} />;
}

export default ColorIcon;
