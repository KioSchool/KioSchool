import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

interface PaginationProps {
  totalPageCount: number;
  itemsPerPage?: number;
  name?: string;
  paginateFunction: (...args: any[]) => void;
}

function Pagination({ totalPageCount, itemsPerPage = 6, paginateFunction }: PaginationProps) {
  useEffect(() => {
    paginateFunction(1, itemsPerPage);
  }, []);

  const pageClickHandler = (e: { selected: number }) => {
    paginateFunction(e.selected + 1, itemsPerPage);
  };

  return (
    <ReactPaginate
      pageCount={totalPageCount}
      onPageChange={pageClickHandler}
      pageRangeDisplayed={3}
      previousLabel="<"
      nextLabel=">"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}

export default Pagination;
