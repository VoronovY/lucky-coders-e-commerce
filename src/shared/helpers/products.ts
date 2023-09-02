import { CatalogCategory } from '../types/types';

function findCategoryIdByKey(key: string, categoriesList: CatalogCategory[] = []): string {
  const foundCategory = categoriesList.find((cat) => cat.key === key);

  if (foundCategory) {
    return foundCategory.id;
  }

  const foundInChild: string = categoriesList.reduce((acc, cat) => {
    if (acc !== '') {
      return acc;
    }
    return findCategoryIdByKey(key, cat.children);
  }, '');

  return foundInChild;
}

export default findCategoryIdByKey;
