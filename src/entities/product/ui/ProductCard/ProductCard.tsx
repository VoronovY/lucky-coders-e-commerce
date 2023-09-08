import { Link } from 'react-router-dom';

import { ReactElement, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import styles from './ProductCard.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { WeightIcon, PaintIcon } from '../../../../app/layouts/images';
import { Pictogramm } from '../../../../shared/pictogramm/Pictogramm';
import { ProductCardData } from '../../../../shared/types/types';

import RoutesName from '../../../../shared/routing';

import selectCategories from '../../../../shared/categories/model/categoriesSelectors';
import getCategoryName from '../../../../shared/helpers/getCategoryName';
import { createAnonymousCart, getUserCart, updateUserCart } from '../../../cart/api/cartApi';
import myTokenCache from '../../../../shared/api/auth/tokenCache';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';

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

  const pictogrammNames: PictogrammNames = useMemo(
    () => ({
      color: <PaintIcon className={styles.pictogrammImage} />,
      weight: <WeightIcon className={styles.pictogrammImage} />,
    }),
    [],
  );

  const categoriesNames = useSelector(selectCategories);
  const [errorMessage, setErrorMessage] = useState('');

  const category = getCategoryName(categories[1]?.id, categoriesNames);
  const subCategory = getCategoryName(categories[0]?.id, categoriesNames);

  const onClickCartButton = (): void => {
    setErrorMessage('');
    const productId = id;

    if (!localStorage.getItem('anonymousCartId') && !localStorage.getItem('accessToken')) {
      createAnonymousCart()
        .then(async (response) => {
          localStorage.setItem('anonymousCartId', response.body.id);
          localStorage.setItem('anonymousToken', myTokenCache.store.token);
          await updateUserCart(response.body.id, productId, response.body.version);
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    } else {
      getUserCart()
        .then(async (response) => {
          const cartId = response.body.id;
          const cartVersion = response.body.version;
          await updateUserCart(cartId, productId, cartVersion);
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    }
  };

  return (
    <div className={styles.productCardWrapper}>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
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
        <div className={styles.cardButtons}>
          <Link className={styles.link} to={`${RoutesName.catalog}/${category}/${subCategory}/${key}`}>
            <Button className={styles.button}>More info</Button>
          </Link>
          <Button onClick={onClickCartButton} hasCartIcon>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
