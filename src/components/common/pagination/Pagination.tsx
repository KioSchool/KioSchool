import ReactPaginate from 'react-paginate';
import './Pagination.css';

interface PaginationProps {
  totalPageCount: number;
  paginateFunction: (page: number) => void;
}

function Pagination({ totalPageCount, paginateFunction }: PaginationProps) {
  const pageClickHandler = (e: { selected: number }) => {
    paginateFunction(e.selected + 1);
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
