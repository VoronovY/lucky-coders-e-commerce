import { Outlet } from 'react-router-dom';

import styles from './LayoutBody.module.scss';

function LayoutBody(): JSX.Element {
  return (
    <div className={styles.mainBody}>
      <Outlet />
    </div>
  );
}

export default LayoutBody;
