import { Outlet } from 'react-router-dom';

import styles from './LayoutBody.module.scss';

function LayoutBody(): JSX.Element {
  return (
    <main className={styles.mainBody}>
      <Outlet />
    </main>
  );
}

export default LayoutBody;
