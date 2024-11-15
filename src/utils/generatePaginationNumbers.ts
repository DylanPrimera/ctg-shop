// [1,2,3,4,'...', 50]

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // if the total pages is less than 7
  // we're gonna show all the pages without the dots
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if the current page is between the first 3 pages
  // we're gonna show the first 3 pages, the last 2 pages and the last page
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // if the current page is between the last 3 pagees
  // we're gonna show the first 2 pages, dots and the last pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if the current page is another site
  // we're gonna show the first page, dots, the current page and the 2 pages after
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
