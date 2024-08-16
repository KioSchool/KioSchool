import useSuperAdminWorkspace from '@hooks/SuperAdmin/useSuperAdminWorkspace';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

interface PaginationProps {
  totalPageCount: number;
  itemsPerPage?: number;
}

function Pagination({ totalPageCount, itemsPerPage = 6 }: PaginationProps) {
  const { fetchAllWorkspaces } = useSuperAdminWorkspace();

  useEffect(() => {
    fetchAllWorkspaces(1, itemsPerPage);
  }, []);

  const pageClickHandler = (event: any) => {
    fetchAllWorkspaces(event.selected + 1, itemsPerPage);
  };

  return (
    <ReactPaginate
      pageCount={totalPageCount}
      onPageChange={pageClickHandler}
      pageRangeDisplayed={6}
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
