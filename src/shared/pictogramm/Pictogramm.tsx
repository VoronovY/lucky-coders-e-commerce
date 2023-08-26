import { ReactElement } from 'react';

import styles from './Pictogramm.module.scss';

export interface PictogrammProps {
  icon: ReactElement;
  text: string;
}

function Pictogramm({ icon, text }: PictogrammProps): JSX.Element {
  return (
    <div className={styles.pictogramm}>
      {icon}
      <div className={styles.pictogrammText}>{text}</div>
    </div>
  );
}

export { Pictogramm };
