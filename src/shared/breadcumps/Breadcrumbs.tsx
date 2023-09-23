import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Breadcrumbs.module.scss';

import { selectProductList } from '../../features/productList/model/productListSelectors';

function Breadcrumbs(): JSX.Element | null {
  const { pathname } = useLocation();
  const products = useSelector(selectProductList);
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
        let displayValue = capitalize(value.replace(/-/g, ' '));

        const product = products.find((p) => p.id === value);
        if (product) {
          displayValue = product.title;
        }

        return last ? (
          <span key={`${value}-last`} className={styles.crumb}>
            {displayValue}
          </span>
        ) : (
          <span key={`${value}-next`} className={styles.crumb}>
            <Link to={to}>{displayValue}</Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
