import { CatalogCategory } from '../types/types';

const getCategoryName = (categoryId: string, categoriesNames: CatalogCategory[]): string | null => {
  const category = categoriesNames.find((cat) => cat.id === categoryId);
  if (category) {
    return category.key || null;
  }
  let categoryName = null;
  categoriesNames.forEach((parentCategory) => {
    const childCategory = parentCategory.children?.find((child) => child.id === categoryId);
    if (childCategory) {
      categoryName = childCategory.key;
    }
  });
  return categoryName;
};

export default getCategoryName;
