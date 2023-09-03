import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

function Breadcrumbs(): React.ReactNode {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x);

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className={styles.breadcrumbs}>
      {pathname !== '/' && (
        <span className={styles.crumb}>
          <Link to="/">Home</Link>
        </span>
      )}
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const displayValue = capitalize(value.replace(/-/g, ' '));

        return last ? (
          <span className={styles.crumb}>{displayValue}</span>
        ) : (
          <span className={styles.crumb}>
            <Link to={to}>{displayValue}</Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
