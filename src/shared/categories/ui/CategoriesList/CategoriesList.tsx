import { useState } from 'react';

import { useSelector } from 'react-redux';
import cn from 'classnames';

import { Link, useLocation } from 'react-router-dom';

import styles from './CategoriesList.module.scss';

import selectCategories from '../../model/categoriesSelectors';
import RoutesName from '../../../routing';
import { CollapseArrowDown } from '../../../../app/layouts/images';

function CategoriesList(): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const location = useLocation();
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
        const arrowClassName = cn(styles.arrow, { [styles.rotatedArrow]: isOpen });
        const itemLink = `${RoutesName.catalog}/${item.key}`;
        const itemActiveLink = location.pathname === itemLink ? styles.activeLink : '';

        return (
          <button type="button" className={styles.categoriesItem} key={item.id}>
            <div className={styles.link}>
              <Link to={`${RoutesName.catalog}/${item.key}`} className={`${styles.link} ${itemActiveLink}`}>
                {item.name.en}
              </Link>
              <div
                className={styles.button}
                role="button"
                tabIndex={0}
                onKeyUp={(): void => toggleCategory(item.id)}
                onClick={(): void => toggleCategory(item.id)}
              >
                <CollapseArrowDown className={arrowClassName} />
              </div>
            </div>
            {isOpen ||
            item.children?.some((child) => location.pathname === `${RoutesName.catalog}/${item.key}/${child.key}`) ? (
              <ul className={styles.subCategoriesList}>
                {item.children?.map((child) => {
                  const childLink = `${RoutesName.catalog}/${item.key}/${child.key}`;
                  const childActiveLink = location.pathname === childLink ? styles.activeLink : '';

                  return (
                    <li className={styles.subCategoriesItem} key={child.id}>
                      <Link to={childLink} className={`${styles.link} ${childActiveLink}`}>
                        {child.name['en-US']}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </button>
        );
      })}
    </>
  );
}

export default CategoriesList;
