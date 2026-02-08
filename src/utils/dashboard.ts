import { TopSellingProduct } from '@@types/index';

export type TopSellingSortType = 'QUANTITY' | 'REVENUE';

export const getSortedTopSellingProducts = (products: TopSellingProduct[], sortType: TopSellingSortType) => {
  return [...products]
    .sort((a, b) => {
      if (sortType === 'REVENUE') {
        const revenueA = a.totalQuantity * a.product.price;
        const revenueB = b.totalQuantity * b.product.price;
        return revenueB - revenueA;
      }
      return b.totalQuantity - a.totalQuantity;
    })
    .slice(0, 5);
};

export const formatProductValue = (item: TopSellingProduct, sortType: TopSellingSortType) => {
  if (sortType === 'QUANTITY') {
    return `${item.totalQuantity}개`;
  }

  const revenue = item.totalQuantity * item.product.price;
  return `${revenue.toLocaleString()}원`;
};
