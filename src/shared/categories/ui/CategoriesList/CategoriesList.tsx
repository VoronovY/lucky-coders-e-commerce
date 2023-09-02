import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import styles from './CategoriesList.module.scss';

import selectCategories from '../../model/categoriesSelectors';
import RoutesName from '../../../routing';
import { CollapseArrowDown } from '../../../../app/layouts/images';

function CategoriesList(): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = useSelector(selectCategories);
  const toggleCategory = (categoryId: string): void => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <>
      {categories.map((item) => {
        const isOpen = selectedCategories.includes(item.id);

        return (
          <button type="button" className={styles.categoriesItem} key={item.id}>
            <div className={styles.link}>
              <Link to={`${RoutesName.catalog}/${item.key}`} className={styles.link}>
                {item.name.en}
              </Link>
              <div
                className={styles.button}
                role="button"
                tabIndex={0}
                onKeyUp={(): void => toggleCategory(item.id)}
                onClick={(): void => toggleCategory(item.id)}
              >
                <CollapseArrowDown className={`${styles.arrow} ${isOpen ? styles.rotatedArrow : ''}`} />
              </div>
            </div>
            {isOpen && (
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

export default CategoriesList;
