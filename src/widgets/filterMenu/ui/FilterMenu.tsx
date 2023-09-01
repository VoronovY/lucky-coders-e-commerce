import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ObjectSchema } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import styles from './FilterMenu.module.scss';

import { Collapse, RangeInputs } from '../../../shared/ui';

import Checkbox from '../../../shared/ui/checkbox/CheckBox';
import Button from '../../../shared/ui/button/Button';
import { useAppDispatch, useAppSelector } from '../../../app/appStore/hooks';
import { FilterFields } from '../../../shared/types/types';
import getProductListAction from '../../../features/productList/model/productListActions';

import filterMenuSchema from '../model/filterMenuSchema';
import colors from '../../../shared/constants/colors';
import ColorIcon from '../../../shared/ui/colorIcon/ColorIcon';
import { selectSearchValue, selectSortValue } from '../../../features/productList/model/productListSelectors';
import { updateFilters } from '../../../features/productList/model/productListSlice';
import defaultFilters from '../../../shared/constants/products';

function FilterMenu(): JSX.Element {
  const methods = useForm<FilterFields>({
    mode: 'onChange',
    defaultValues: defaultFilters,
    resolver: yupResolver(filterMenuSchema as ObjectSchema<FilterFields>),
  });

  const searchValue = useAppSelector(selectSearchValue);
  const sortValue = useAppSelector(selectSortValue);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FilterFields> = (data) => {
    const updateData = {
      filters: data,
      searchValue,
      sortBy: sortValue?.value || '',
    };
    dispatch(updateFilters(data));
    dispatch(getProductListAction(updateData));
    methods.reset(data);
  };

  const handleResetFilters = (): void => {
    methods.reset(defaultFilters);
  };

  const showBtnDisabled = Object.values(methods.formState.errors).length > 0;

  return (
    <FormProvider {...methods}>
      <form className={styles.filterMenuWrapper} onSubmit={methods.handleSubmit(onSubmit)}>
        <Collapse title="Price" initialCollapsed={false}>
          <RangeInputs namePrefix="price" />
        </Collapse>
        <Collapse title="Weight" initialCollapsed={false}>
          <RangeInputs namePrefix="weight" />
        </Collapse>
        <Collapse title="Color" initialCollapsed={false}>
          <Controller
            name="colors"
            control={methods.control}
            render={({ field: { value, onChange } }): JSX.Element => (
              <>
                {colors.map((color) => (
                  <div key={color.id} className={styles.colorFilter}>
                    <Checkbox
                      text={color.color}
                      id={String(color.id)}
                      checked={value.includes(color.name)}
                      onChange={(e): void => {
                        if (e.target.checked) {
                          onChange([...value, color.name]);
                        } else {
                          onChange(value.filter((selectedColor) => selectedColor !== color.name));
                        }
                      }}
                    />
                    <ColorIcon color={color.color} />
                  </div>
                ))}
              </>
            )}
          />
        </Collapse>
        <div className={styles.buttons}>
          <Button type="submit" height="30px" width="150px" disabled={showBtnDisabled}>
            Accept
          </Button>
          <Button type="button" height="30px" width="150px" onClick={handleResetFilters}>
            Clear
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FilterMenu;
