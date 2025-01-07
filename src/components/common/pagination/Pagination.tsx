import ReactPaginate from 'react-paginate';
import './Pagination.css';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  totalPageCount: number;
  paginateFunction: (page: number) => void;
}

function Pagination({ totalPageCount, paginateFunction }: PaginationProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const pageClickHandler = (e: { selected: number }) => {
    paginateFunction(e.selected);
  };

  return (
    <ReactPaginate
      pageCount={totalPageCount}
      onPageChange={pageClickHandler}
      pageRangeDisplayed={3}
      forcePage={currentPage}
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
