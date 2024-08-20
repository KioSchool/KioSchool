import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

interface PaginationProps {
  totalPageCount: number;
  itemsPerPage?: number;
  name?: string;
}

function Pagination({ totalPageCount, itemsPerPage = 6, name }: PaginationProps) {
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  useEffect(() => {
    fetchAllWorkspaces(1, itemsPerPage);
  }, []);

  const pageClickHandler = (e: { selected: number }) => {
    fetchAllWorkspaces(e.selected + 1, itemsPerPage, name);
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
