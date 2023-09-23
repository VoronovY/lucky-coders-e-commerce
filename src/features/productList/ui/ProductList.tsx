import { useEffect, useMemo, useState } from 'react';

import Select, { OnChangeValue, Theme } from 'react-select';

import { useNavigate, useParams } from 'react-router-dom';

import styles from './ProductList.module.scss';

import { useAppDispatch, useAppSelector } from '../../../app/appStore/hooks';
import getProductListAction from '../model/productListActions';
import ProductCard from '../../../entities';
import {
  selectFilters,
  selectIsProductListError,
  selectIsProductListLoading,
  selectProductList,
  selectProductListErrorMessage,
  selectProductsOffset,
  selectProductsTotalCount,
  selectSearchValue,
  selectSortValue,
} from '../model/productListSelectors';
import { getSearchWords } from '../api/getProductList';
import { OptionInput } from '../../../shared/ui/select/SelectInput';
import {
  updateError,
  updateErrorMessage,
  updateSearchValue,
  updateSelectedCategoryId,
  updateSortValue,
} from '../model/productListSlice';
import { sortingOptions } from '../../../shared/constants/sort';
import { ModalInfo } from '../../../shared/ui';
import selectCategories from '../../../shared/categories/model/categoriesSelectors';
import findCategoryIdByKey from '../../../shared/helpers/products';
import { PRODUCTS_ON_PAGE } from '../../../shared/constants/products';
import Pagination from '../../pagination';
import SkeletonCards from '../../../entities/product/ui/ProductCard/SceletonProductCards';

export interface ProductListProps {}

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const initSearchValue = useAppSelector(selectSearchValue);
  const [searchValue, setSearchValue] = useState<OptionInput>({
    value: initSearchValue,
    label: initSearchValue,
  });
  const [searchOptions, setSearchOptions] = useState<OptionInput[]>([]);
  const [notFoundCategory, setNotFoundCategory] = useState<boolean>(false);

  const filters = useAppSelector(selectFilters);

  const productList = useAppSelector(selectProductList);
  const sortValue = useAppSelector(selectSortValue);
  const isError = useAppSelector(selectIsProductListError);
  const errorMessage = useAppSelector(selectProductListErrorMessage);
  const categories = useAppSelector(selectCategories);
  const offset = useAppSelector(selectProductsOffset);
  const totalProductsCount = useAppSelector(selectProductsTotalCount);
  const isCatalogLoading = useAppSelector(selectIsProductListLoading);
  const navigate = useNavigate();

  const { category, subcategory } = useParams();

  let curCategory = '';

  if (category) curCategory = category;
  if (subcategory) curCategory = subcategory;

  const categoryId = useMemo((): string | null => {
    if (!curCategory) return '';
    return findCategoryIdByKey(curCategory, categories);
  }, [curCategory, categories]);

  useEffect(() => {
    dispatch(updateSelectedCategoryId(categoryId));
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (categoryId === null) {
      setNotFoundCategory(true);
      return;
    }
    setNotFoundCategory(false);
    if ((category || subcategory) && !categoryId) return;
    dispatch(
      getProductListAction({
        filters,
        searchValue: searchValue?.value,
        sortBy: sortValue?.value || '',
        categoryId,
      }),
    );
  }, [dispatch, searchValue, sortValue, filters, category, subcategory, categoryId, navigate]);

  const paginationList = useMemo(() => {
    const pageCount = Math.ceil(totalProductsCount / PRODUCTS_ON_PAGE);
    return new Array(pageCount).fill(0).map((_: undefined, idx: number) => ({ title: idx + 1, id: `id-${idx + 1}` }));
  }, [totalProductsCount]);

  const handleSearch = (value: string): void => {
    if (value) {
      setSearchValue({ value, label: value });
      getSearchWords(value).then((data) => {
        const response = data.body;

        const allPhrases = new Set<string>();
        response['searchKeywords.en-US'].forEach((phrase) => {
          allPhrases.add(phrase.text);
          phrase.text.split(' ').forEach((word) => allPhrases.add(word));
        });
        const newSearchOptions = Array.from(allPhrases).map((word: string) => ({ value: word, label: word }));
        setSearchOptions(newSearchOptions);
      });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(updateSearchValue(''));
    };
  }, [dispatch]);

  const handleSearchInput = (newValue: OnChangeValue<OptionInput, boolean>): void => {
    const selectedValue = Array.isArray(newValue) ? newValue[0] : newValue;
    setSearchValue(selectedValue);
    dispatch(updateSearchValue(selectedValue?.value));
  };

  const handleSortInput = (newSortValue: OnChangeValue<OptionInput, boolean>): void => {
    const currentSortValue: OptionInput = Array.isArray(newSortValue) ? newSortValue[0] : newSortValue;
    dispatch(updateSortValue(currentSortValue));
  };

  const handleModalInfo = (): void => {
    dispatch(updateError(false));
    dispatch(updateErrorMessage(''));
  };

  const handlePaginationBtn = (newPage: number): void => {
    const newOffset = Math.floor(newPage * PRODUCTS_ON_PAGE);
    dispatch(
      getProductListAction({
        filters,
        searchValue: searchValue?.value,
        sortBy: sortValue?.value || '',
        categoryId,
        newOffset,
      }),
    );
  };

  const cardList = isCatalogLoading ? (
    <SkeletonCards cardNumber={PRODUCTS_ON_PAGE} />
  ) : (
    productList.map((product) => {
      return <ProductCard key={product.id} product={product} />;
    })
  );

  const layout = notFoundCategory ? (
    <div className={styles.notFound}>Category not found</div>
  ) : (
    <div className={styles.productListWrapper}>
      <div className={styles.productListHeader}>
        <Select
          options={searchOptions}
          value={searchValue}
          onInputChange={handleSearch}
          onChange={handleSearchInput}
          id="search-12"
          placeholder="Search"
          isClearable
          defaultValue={undefined}
          theme={(theme): Theme => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary25: 'neutral10',
              primary: 'black',
            },
          })}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              paddingLeft: '20px',
            }),
          }}
          className={styles.select}
        />
        <Select
          options={sortingOptions}
          isSearchable={false}
          value={sortValue}
          onChange={handleSortInput}
          id="sort-12"
          placeholder="Default"
          isClearable
          defaultValue={undefined}
          theme={(theme): Theme => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary25: 'neutral10',
              primary: 'black',
            },
          })}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              paddingLeft: '50px',
            }),
          }}
          className={styles.sort}
        />
      </div>
      {cardList}
      {paginationList.length > 1 && (
        <Pagination
          pagesButtons={paginationList}
          onBtnClick={handlePaginationBtn}
          currentPage={Math.floor(offset / PRODUCTS_ON_PAGE)}
          disableOnLoading={isCatalogLoading}
        />
      )}
      <ModalInfo isOpen={isError} setIsOpen={handleModalInfo} message={errorMessage} withIcon={false} />
    </div>
  );

  return layout;
}

export { ProductList };
