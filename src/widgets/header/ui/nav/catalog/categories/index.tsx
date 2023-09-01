import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './categories.module.scss';

import RoutesName from '../../../../../../shared/routing';
import { CrossIcon, CategoriesArrowIcon } from '../../../../../../app/layouts/images';

// import createCategories from '../../../../../../shared/categories/createCategories';
// import { NewCategory } from '../../../../../../shared/types/types';
import getCategoriesAction from '../../../../../../shared/categories/categoriesAction';
import { store } from '../../../../../../app/appStore/appStore';
import selectCategories from '../../../../../../shared/categories/categoriesSelectors';

function Categories({ setIsOpen }: { setIsOpen: (state: boolean) => void }): JSX.Element {
  // const [categories, setCategories] = useState<NewCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function fetchCategories(): Promise<void> {
  //     const fetchedCategories = await createCategories();
  //     setCategories(fetchedCategories);
  //   }

  //   fetchCategories();
  // }, []);

  useEffect(() => {
    store.dispatch(getCategoriesAction());
  }, [dispatch]);

  const categories = useSelector(selectCategories);

  // console.log(categories);
  const onClick = (): void => {
    setIsOpen(false);
  };

  const onMouseEnter = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  // const onMouseLeave = (): void => {
  //   setSelectedCategory(null);
  // };

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
                    <button
                      type="button"
                      className={`${styles.arrow} ${selectedCategory === item.id ? styles.rotatedArrow : ''}`}
                    >
                      <CategoriesArrowIcon />
                    </button>
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
