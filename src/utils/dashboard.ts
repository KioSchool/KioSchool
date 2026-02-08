import { TopSellingProduct } from '@@types/index';
import _ from 'lodash';

export type TopSellingSortType = 'QUANTITY' | 'REVENUE';

export const getSortedTopSellingProducts = (products: TopSellingProduct[], sortType: TopSellingSortType) => {
  if (sortType === 'REVENUE') {
    return _.orderBy(products, [(item) => item.totalQuantity * item.product.price], ['desc']).slice(0, 5);
  }
  return _.orderBy(products, ['totalQuantity'], ['desc']).slice(0, 5);
};

export const formatProductValue = (item: TopSellingProduct, sortType: TopSellingSortType) => {
  if (sortType === 'QUANTITY') {
    return `${item.totalQuantity}개`;
  }

  const revenue = item.totalQuantity * item.product.price;
  return `${revenue.toLocaleString()}원`;
};

export const getBusinessStartDate = (date: Date = new Date()) => {
  const nineAM = setHours(setMinutes(setSeconds(setMilliseconds(new Date(date), 0), 0), 0), 9);
  const businessDate = isBefore(date, nineAM) ? subDays(date, 1) : date;

  return format(businessDate, 'yyyy. MM. dd.');
};
