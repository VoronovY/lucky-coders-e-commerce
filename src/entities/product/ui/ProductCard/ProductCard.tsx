import { Link } from 'react-router-dom';

import {
  ReactElement,
  useMemo,
  //  useState
} from 'react';

import { useSelector } from 'react-redux';

import { Cart, LineItem } from '@commercetools/platform-sdk';

import styles from './ProductCard.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { WeightIcon, PaintIcon, LoadingIcon, CartButtonIcon } from '../../../../app/layouts/images';
import { Pictogramm } from '../../../../shared/pictogramm/Pictogramm';
import { ProductCardData } from '../../../../shared/types/types';

import RoutesName from '../../../../shared/routing';

import selectCategories from '../../../../shared/categories/model/categoriesSelectors';
import getCategoryName from '../../../../shared/helpers/getCategoryName';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import { updateCartAction } from '../../../cart/model/cartActions';
import { selectCart, selectCartError, selectCartErrorMessage, selectCartLoading } from '../../../cart/model/selectCart';
import { ModalInfo } from '../../../../shared/ui';
import { updateCartError, updateCartErrorMessage } from '../../../cart/model/cartSlice';

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
    id,
    categories,
    discountedPrice,
    originalPrice,
    imageLink,
    imageAlt,
    discount,
    description,
    title,
  } = product;

  const dispatch = useAppDispatch();

  const pictogrammNames: PictogrammNames = useMemo(
    () => ({
      color: <PaintIcon className={styles.pictogrammImage} />,
      weight: <WeightIcon className={styles.pictogrammImage} />,
    }),
    [],
  );

  const categoriesNames = useSelector(selectCategories);
  const isCartLoading = useSelector(selectCartLoading);
  const currentCart: Cart | null = useSelector(selectCart);
  const errorMessage = useSelector(selectCartErrorMessage);
  const errorCartLoading = useSelector(selectCartError);

  const category = getCategoryName(categories[1]?.id, categoriesNames);
  const subCategory = getCategoryName(categories[0]?.id, categoriesNames);

  const handleCartButton = (): void => {
    dispatch(updateCartAction(id));
  };

  const handleModalClose = (): void => {
    dispatch(updateCartError(false));
    dispatch(updateCartErrorMessage(''));
  };

  const disableAddBtn = currentCart
    ? currentCart.lineItems.findIndex((lineItem: LineItem) => lineItem.productId === id) !== -1
    : false;

  return (
    <div className={styles.productCardWrapper}>
      <ModalInfo isOpen={errorCartLoading} handleClick={handleModalClose} message={errorMessage} withIcon={false} />
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
        <Button onClick={isCartLoading ? undefined : handleCartButton} disabled={disableAddBtn}>
          {isCartLoading ? (
            <LoadingIcon className={styles.loadingIcon} />
          ) : (
            <>
              Add to cart <CartButtonIcon />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export { ProductCard };
