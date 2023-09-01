import { Category } from '@commercetools/platform-sdk';

import getCategories from '../api/categories/getCategories';
import { CategoriesObject, NewCategory } from '../types/types';

function createCategories(): Promise<NewCategory[]> {
  return new Promise((resolve) => {
    const categories: CategoriesObject = {};

    getCategories().then((data) => {
      const { results } = data.body;

      results
        .filter((cat: Category) => !cat.parent)
        .forEach((el: Category) => {
          const name = el.name['en-US'];
          categories[name] = el;
        });

      Object.values(categories).forEach((cat) => {
        const { id } = cat;
        const subCategories = results.filter((curCat) => {
          if (curCat?.parent) {
            return curCat.parent.id === id;
          }
          return false;
        });

        const curCat = cat;

        curCat.children = subCategories;
      });

      const categoryArray = Object.values(categories) as NewCategory[];
      resolve(categoryArray);
    });
  });
}

export default createCategories;
