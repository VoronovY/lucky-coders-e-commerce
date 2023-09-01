import { OptionInput } from '../ui/select/SelectInput';

export enum SortingParams {
  name = 'name.en-US',
  price = 'price',
  weight = 'variants.attributes.weightNumber',
}

export enum SortDirections {
  ascend = 'asc',
  descend = 'desc',
}

export const sortingOptions: OptionInput[] = [
  { value: `${SortingParams.name} asc`, label: 'name: from A to Z' },
  { value: `${SortingParams.name} desc`, label: 'name: from Z to A' },
  { value: `${SortingParams.price} asc`, label: 'price: from low' },
  { value: `${SortingParams.price} desc`, label: 'price: from high' },
  { value: `${SortingParams.weight} asc`, label: 'weigth: from low' },
  { value: `${SortingParams.weight} desc`, label: 'weight: from high' },
];
