import { Product } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { WeightIcon, PaintIcon } from '../../../../app/layouts/images';
import { Pictogramm } from '../../../../shared/pictogramm/Pictogramm';

export interface ProductCardProps extends Product {}

export interface ProductProps extends Product {}

function ProductCard(props: ProductCardProps): JSX.Element {
  const { id } = props;
  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.discountWrapper}>
        <div className={styles.discount}>-20%</div>
      </div>
      <picture className={styles.productImgWrapper}>
        <img
          className={styles.productImg}
          src="https://345519.selcdn.ru/pearl-shop/resize_cache/13270/b29965e72c9d454fa9b567abcde10732/iblock/71f/71fe5f62432fb83c65270672e8806b18.jpg"
          alt={`alternative ${1}`}
        />
      </picture>
      <div className={styles.pictogramms}>
        <Pictogramm icon={<WeightIcon className={styles.pictogrammImage} />} text="24 g" />
        <Pictogramm icon={<PaintIcon className={styles.pictogrammImage} />} text="blue" />
      </div>
      <div className={styles.title}>Title</div>
      <div className={styles.description}>{id}</div>
      <div className={styles.prices}>
        <div className={styles.oldPrice}>3400 €</div>
        <div className={styles.actualPrice}>2400 €</div>
      </div>
      <Button className={styles.button}>
        <Link className={styles.link} to="http://google.com">
          More info
        </Link>
      </Button>
    </div>
  );
}

export { ProductCard };
