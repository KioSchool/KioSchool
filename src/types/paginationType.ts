import { PaginationResponse } from '.';

export const defaultPaginationValue: PaginationResponse<any> = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 6,
    sort: {
      sorted: false,
      empty: true,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 0,
  totalElements: 0,
  last: false,
  number: 0,
  size: 6,
  numberOfElements: 0,
  sort: {
    sorted: false,
    empty: true,
    unsorted: true,
  },
  first: true,
  empty: true,
};
