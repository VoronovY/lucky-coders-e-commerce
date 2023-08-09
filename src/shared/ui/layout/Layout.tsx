import { type ReactNode } from 'react';

import styles from './Layout.module.scss';

interface LayoutProps {
  headerSlot: ReactNode;
  bottomSlot: ReactNode;
  bodySlot: ReactNode;
}

function Layout({ headerSlot, bottomSlot, bodySlot }: LayoutProps): JSX.Element {
  return (
    <div className={styles.root}>
      {headerSlot}
      {bodySlot}
      {bottomSlot}
    </div>
  );
}

export default Layout;
