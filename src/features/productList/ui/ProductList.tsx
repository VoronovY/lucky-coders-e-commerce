import { useEffect } from 'react';

import styles from './ProductList.module.scss';

import { useAppDispatch, useAppSelector } from '../../../app/appStore/hooks';
import getProductListAction from '../model/productListActions';
import ProductCard from '../../../entities';
import selectProductList from '../model/productListSelectors';

export interface ProductListProps {}

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);

  const productList = useAppSelector(selectProductList);

  return (
    <div className={styles.productListWrapper}>
      {productList.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export { ProductList };
