import { Link } from 'react-router-dom';

import { ReactElement, useMemo } from 'react';

import styles from './ProductCard.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { WeightIcon, PaintIcon } from '../../../../app/layouts/images';
import { Pictogramm } from '../../../../shared/pictogramm/Pictogramm';
import { ProductCardData } from '../../../../shared/types/types';

export interface ProductCardProps {
  product: ProductCardData;
}

export interface PictogrammNames {
  [key: string]: ReactElement;
}

/** TODO
 * добавить правильную ссылку на страницу с детальной информацией
 */

function ProductCard({ product }: ProductCardProps): JSX.Element {
  const { attributes, discountedPrice, originalPrice, imageLink, imageAlt, discount, description, title } = product;

  const pictogrammNames: PictogrammNames = useMemo(
    () => ({
      color: <PaintIcon className={styles.pictogrammImage} />,
      weight: <WeightIcon className={styles.pictogrammImage} />,
    }),
    [],
  );
  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.discountWrapper}>
        {discountedPrice > 0 && <div className={styles.discount}>{`-${discount}%`}</div>}
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
          {discountedPrice ? <div className={styles.oldPrice}>{originalPrice} €</div> : null}
          <div className={styles.actualPrice}>{discountedPrice || originalPrice} €</div>
        </div>
        <Button className={styles.button}>
          <Link className={styles.link} to="http://google.com">
            More info
          </Link>
        </Button>
      </div>
    </div>
  );
}

export { ProductCard };
