import { Link } from 'react-router-dom';

import { ReactElement, useMemo } from 'react';

import { useSelector } from 'react-redux';

import styles from './ProductCard.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { WeightIcon, PaintIcon } from '../../../../app/layouts/images';
import { Pictogramm } from '../../../../shared/pictogramm/Pictogramm';
import { ProductCardData } from '../../../../shared/types/types';

import RoutesName from '../../../../shared/routing';

import selectCategories from '../../../../shared/categories/model/categoriesSelectors';

export interface ProductCardProps {
  product: ProductCardData;
}

export interface PictogrammNames {
  [key: string]: ReactElement;
}

function ProductCard({ product }: ProductCardProps): JSX.Element {
  const {
    attributes,
    key,
    categories,
    discountedPrice,
    originalPrice,
    imageLink,
    imageAlt,
    discount,
    description,
    title,
  } = product;

  const pictogrammNames: PictogrammNames = useMemo(
    () => ({
      color: <PaintIcon className={styles.pictogrammImage} />,
      weight: <WeightIcon className={styles.pictogrammImage} />,
    }),
    [],
  );

  const categoriesNames = useSelector(selectCategories);

  const getCategoryName = (categoryId: string): string | undefined => {
    const category = categoriesNames.find((cat) => cat.id === categoryId);
    if (category) {
      return category.key;
    }
    let categoryName;
    categoriesNames.forEach((parentCategory) => {
      const childCategory = parentCategory.children?.find((child) => child.id === categoryId);
      if (childCategory) {
        categoryName = childCategory.key;
      }
    });
    return categoryName;
  };

  const category = getCategoryName(categories[1]?.id);
  const subCategory = getCategoryName(categories[0]?.id);

  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.discountWrapper}>
        {discount !== 0 && <div className={styles.discount}>{`-${discount}%`}</div>}
      </div>
      <div className={styles.mainInfo}>
        <picture className={styles.productImgWrapper}>
          <img className={styles.productImg} src={imageLink} alt={imageAlt} />
        </picture>
        <div className={styles.pictogramms}>
          {attributes?.map((pictogramm, idx) => {
            if (pictogrammNames[pictogramm.name] !== undefined) {
              return (
                <Pictogramm
                  key={`${idx + 1}pictogramm.value`}
                  icon={pictogrammNames[pictogramm.name]}
                  text={pictogramm?.value?.label}
                />
              );
            }
            return null;
          })}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.prices}>
          {discount !== 0 ? <div className={styles.oldPrice}>{originalPrice} €</div> : null}
          <div className={styles.actualPrice}>{discount !== 0 ? discountedPrice : originalPrice} €</div>
        </div>
        <Link className={styles.link} to={`${RoutesName.catalog}/${category}/${subCategory}/${key}`}>
          <Button className={styles.button}>More info</Button>
        </Link>
      </div>
    </div>
  );
}

export { ProductCard };
