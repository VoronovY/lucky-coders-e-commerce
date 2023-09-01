import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import styles from './CategoriesListHeader.module.scss';

import selectCategories from '../../model/categoriesSelectors';
import { CategoriesArrowIcon } from '../../../../app/layouts/images';
import RoutesName from '../../../routing';

interface CategoriesListProps {
  onClick: () => void;
}
function CategoriesListHeader({ onClick }: CategoriesListProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useSelector(selectCategories);

  const onMouseEnter = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
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
    </>
  );
}

export default CategoriesListHeader;
