import { Link } from 'react-router-dom';

import styles from './categories.module.scss';

import RoutesName from '../../../../../../shared/routing';
import { CrossIcon } from '../../../../../../app/layouts/images';

import CategoriesList from '../../../../../../shared/categories/ui/CategoriesList';

function Categories({ setIsOpen }: { setIsOpen: (state: boolean) => void }): JSX.Element {
  const onClick = (): void => {
    setIsOpen(false);
  };

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent): void => {
    event.stopPropagation();
  };

  return (
    <div className={styles.container} role="button" tabIndex={0} onClick={onClick} onKeyUp={onClick}>
      <div
        className={styles.categoriesWrapper}
        role="button"
        tabIndex={0}
        onClick={handleWrapperClick}
        onKeyUp={handleWrapperClick}
      >
        <div>
          <div className={styles.close}>
            <button type="button" onClick={onClick} className={styles.closeButton}>
              <CrossIcon />
            </button>
          </div>
          <ul className={styles.categories}>
            <li className={styles.categoriesItem}>
              <Link to={RoutesName.catalog} className={styles.link} onClick={onClick}>
                All Categories
              </Link>
            </li>
            <CategoriesList onClick={onClick} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories;
