import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from './appStore';

import getProductAction from '../../features/selectedProduct/model/productActions';
import selectProduct from '../../features/selectedProduct/model/productSelectors';
import { SelectedProductData } from '../../shared/types/types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLoadProduct: () => SelectedProductData = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductAction(id));
  }, [dispatch]);

  const product = useAppSelector(selectProduct);
  return product;
};
