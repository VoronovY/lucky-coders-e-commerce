import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from './store';

import getProductAction from '../../features/selectedProduct/model/productActions';
import selectProduct from '../../features/selectedProduct/model/productSelectors';
import { SelectedProductData } from '../../shared/types/types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLoadProduct: () => SelectedProductData | null = () => {
  const dispatch = useAppDispatch();
  const { key } = useParams();
  useEffect(() => {
    dispatch(getProductAction(key));
  }, [dispatch, key]);

  const product = useAppSelector(selectProduct);
  return product;
};
