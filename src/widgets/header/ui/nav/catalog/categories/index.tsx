import { Link } from 'react-router-dom';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import styles from './categories.module.scss';

import RoutesName from '../../../../../../shared/routing';
import { CrossIcon, CategoriesArrowIcon } from '../../../../../../app/layouts/images';

import selectCategories from '../../../../../../shared/categories/categoriesSelectors';

function Categories({ setIsOpen }: { setIsOpen: (state: boolean) => void }): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useSelector(selectCategories);

  const onClick = (): void => {
    setIsOpen(false);
  };

  const onMouseEnter = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

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
            <li className={styles.categoriesItem}>
              <Link to={RoutesName.catalog} className={styles.link} onClick={onClick}>
                All Categories
              </Link>
            </li>
            {categories.map((item) => {
              return (
                <button
                  type="button"
                  className={styles.categoriesItem}
                  key={item.id}
                  onMouseEnter={(): void => onMouseEnter(item.id)}
                  onClick={onClick}
                >
                  <div className={styles.link}>
                    <Link to={`${RoutesName.catalog}/${item.key}`} className={styles.link}>
                      {item.name.en}
                    </Link>
                    <div className={`${styles.arrow} ${selectedCategory === item.id ? styles.rotatedArrow : ''}`}>
                      <CategoriesArrowIcon />
                    </div>
                  </div>
                  {selectedCategory === item.id && (
                    <ul className={styles.subCategoriesList}>
                      {item.children?.map((child) => (
                        <li className={styles.subCategoriesItem} key={child.id}>
                          <Link to={`${RoutesName.catalog}/${item.key}/${child.key}`}>{child.name['en-US']}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories;
