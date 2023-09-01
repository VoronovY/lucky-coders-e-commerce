import { useEffect, useState } from 'react';

import Select, { OnChangeValue, Theme } from 'react-select';

import styles from './ProductList.module.scss';

import { useAppDispatch, useAppSelector } from '../../../app/appStore/hooks';
import getProductListAction from '../model/productListActions';
import ProductCard from '../../../entities';
import { selectFilters, selectProductList, selectSearchValue, selectSortValue } from '../model/productListSelectors';
import { getSearchWords } from '../api/getProductList';
import { OptionInput } from '../../../shared/ui/select/SelectInput';
import { updateSearchValue, updateSortValue } from '../model/productListSlice';
import { sortingOptions } from '../../../shared/constants/sort';

export interface ProductListProps {}

function ProductList(): JSX.Element {
  const dispatch = useAppDispatch();
  const initSearchValue = useAppSelector(selectSearchValue);
  const [searchValue, setSearchValue] = useState<OptionInput>({
    value: initSearchValue,
    label: initSearchValue,
  });
  const [searchOptions, setSearchOptions] = useState<OptionInput[]>([]);

  const filters = useAppSelector(selectFilters);

  const productList = useAppSelector(selectProductList);
  const sortValue = useAppSelector(selectSortValue);

  useEffect(() => {
    dispatch(getProductListAction({ filters, searchValue: searchValue?.value, sortBy: sortValue?.value || '' }));
  }, [dispatch, searchValue, sortValue, filters]);

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

  return (
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
      {productList.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export { ProductList };
