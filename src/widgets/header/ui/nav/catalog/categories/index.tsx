import { Link } from 'react-router-dom';

import styles from './categories.module.scss';

import RoutesName from '../../../../../../shared/routing';
import { CrossIcon, CategoriesArrowIcon } from '../../../../../../app/layouts/images';

function Categories({ setIsOpen }: { setIsOpen: (state: boolean) => void }): JSX.Element {
  const onClick = (): void => {
    setIsOpen(false);
  };
  const categoriesArr = [
    { id: 1, url: RoutesName.catalog, text: 'All Categories' },
    { id: 2, url: RoutesName.catalog, text: 'Pearl' },
    { id: 3, url: RoutesName.catalog, text: 'Collectible Minerals' },
    { id: 4, url: RoutesName.catalog, text: 'Beads' },
    { id: 5, url: RoutesName.catalog, text: 'Magical Stones' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.categoriesWrapper}>
        <div>
          <div className={styles.close}>
            <button type="button" onClick={onClick} className={styles.closeButton}>
              <CrossIcon />
            </button>
          </div>
          <ul className={styles.categories}>
            {categoriesArr.map((item, index) => {
              return (
                <li className={styles.categoriesItem} key={item.id}>
                  <Link to={item.url} className={styles.link}>
                    {item.text}
                  </Link>
                  {index > 0 ? (
                    <button type="button" className={styles.arrow}>
                      <CategoriesArrowIcon />
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories;
