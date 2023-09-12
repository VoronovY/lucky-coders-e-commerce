import styles from './Pagination.module.scss';

export interface PaginationPageButton {
  title: number;
  id: string;
}

export interface PaginationProps {
  pagesButtons: PaginationPageButton[];
  currentPage: number;
  onBtnClick: (newOffset: number) => void;
}

function Pagination({ pagesButtons, currentPage, onBtnClick }: PaginationProps): JSX.Element {
  const handlePreviousPage = (): void => {
    onBtnClick(currentPage - 1);
  };
  const handleNextPage = (): void => {
    onBtnClick(currentPage + 1);
  };

  if (pagesButtons.length === 0) return <div />;

  return (
    <div className={styles.paginationWrapper}>
      <button className={styles.prevPage} type="button" onClick={handlePreviousPage}>
        previousPage
      </button>
      {pagesButtons.map(({ title, id }, idx) => {
        const handlePagination = (): void => {
          const newOffset = Math.floor(idx + 1);
          onBtnClick(newOffset);
        };

        return (
          <button key={id} onClick={handlePagination} type="button">
            {title}
          </button>
        );
      })}
      <button className={styles.nextPage} type="button" onClick={handleNextPage}>
        next page
      </button>
    </div>
  );
}
export default Pagination;
