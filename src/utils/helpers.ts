import { Product } from '../types/productTypes';

export const getCategory: (data: Product[]) => string[] = data => {
  const temp: string[] = ['all'];
  for (const item of data) {
    if (!temp.includes(item.category)) {
      temp.push(item.category);
    }
  }
  return temp;
};

export const getProduct: (data: Product[], category: string) => Product[] = (
  data,
  category,
) => {
  const temp: Product[] = [];
  if (category === 'all') {
    return data;
  }
  for (const item of data) {
    if (item.category === category) {
      temp.push(item);
    }
  }
  return temp;
};

export const getFavorite: (data: Product[]) => Product[] = data => {
  const temp: Product[] = [];
  for (const item of data) {
    if (item.favorite) {
      temp.push(item);
    }
  }
  return temp;
};

export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
};
