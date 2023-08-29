import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ObjectSchema } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import styles from './FilterMenu.module.scss';

import { Collapse, RangeInputs } from '../../../shared/ui';

import Checkbox from '../../../shared/ui/checkbox/CheckBox';
import Button from '../../../shared/ui/button/Button';
import { useAppDispatch } from '../../../app/appStore/hooks';
import { FilterFields } from '../../../shared/types/types';
import getProductListAction from '../../../features/productList/model/productListActions';

import filterMenuSchema from '../model/filterMenuSchema';
import colors from '../../../shared/constants/colors';
import ColorIcon from '../../../shared/ui/colorIcon/ColorIcon';

const defaultValues: FilterFields = {
  weight: {
    from: 0,
    to: 1000,
  },
  price: {
    from: 0,
    to: 1000,
  },
  colors: [],
};

function FilterMenu(): JSX.Element {
  const methods = useForm<FilterFields>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(filterMenuSchema as ObjectSchema<FilterFields>),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FilterFields> = (data) => {
    dispatch(getProductListAction(data));
  };

  const handleResetFilters = (): void => {
    methods.reset(defaultValues);
  };
  return (
    <FormProvider {...methods}>
      <form className={styles.filterMenuWrapper} onSubmit={methods.handleSubmit(onSubmit)}>
        <Collapse title="Price">
          <RangeInputs namePrefix="price" />
        </Collapse>
        <Collapse title="Weight">
          <RangeInputs namePrefix="weight" />
        </Collapse>
        <Collapse title="Color">
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
          <Button type="submit" height="30px" width="150px">
            Show
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
