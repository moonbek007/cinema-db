import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";

const Pagination = ({ page, changePage }: PaginationProps) => {
  return (
    <div className="filters__pagination">
      <div className="filters__pagination-container rounded-2xl">
        <button
          disabled={page.currentPage === page.previousPage}
          onClick={() => changePage(page.previousPage)}
        >
          <ChevronLeftIcon />
        </button>
        {page.currentPage - 1 > 1 && (
          <>
            <button onClick={() => changePage(1)}>1</button>
            {page.currentPage - 2 > 2 && (
              <button onClick={() => changePage(2)}>2</button>
            )}
          </>
        )}
        {page.currentPage - 4 > 0 && (
          <button onClick={() => changePage(Math.ceil(page.currentPage / 2))}>
            <EllipsisIcon />
          </button>
        )}
        {page.previousPage < page.currentPage && (
          <button onClick={() => changePage(page.previousPage)}>
            {page.previousPage}
          </button>
        )}
        <button disabled className="active-page rounded-md">
          {page.currentPage}
        </button>
        {page.currentPage < page.nextPage && (
          <>
            <button onClick={() => changePage(page.nextPage)}>
              {page.nextPage}
            </button>
          </>
        )}
        {page.totalPages - page.currentPage >= 4 && (
          <button
            onClick={() =>
              changePage(
                page.currentPage +
                  Math.ceil((page.totalPages - page.currentPage) / 2),
              )
            }
          >
            <EllipsisIcon />
          </button>
        )}
        {page.currentPage < page.totalPages - 1 && (
          <>
            {page.totalPages - 2 > Math.ceil(page.totalPages / 2) && (
              <button onClick={() => changePage(page.totalPages - 1)}>
                {page.totalPages - 1}
              </button>
            )}
            <button onClick={() => changePage(page.totalPages)}>
              {page.totalPages}
            </button>
          </>
        )}
        <button
          disabled={page.currentPage === page.nextPage}
          onClick={() => changePage(page.nextPage)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
