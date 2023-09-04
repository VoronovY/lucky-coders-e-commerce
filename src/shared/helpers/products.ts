import { CatalogCategory } from '../types/types';

function findCategoryIdByKey(key: string, categoriesList: CatalogCategory[] = []): string | null {
  const foundCategory = categoriesList.find((cat) => cat.key === key);

  if (foundCategory) {
    return foundCategory.id;
  }

  const foundInChild = categoriesList.reduce<string | null>((acc, cat) => {
    if (acc !== null) {
      return acc;
    }
    return findCategoryIdByKey(key, cat.children);
  }, null);

  return foundInChild;
}

export default findCategoryIdByKey;
