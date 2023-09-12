import cn from 'classnames';

import styles from './Pagination.module.scss';

export interface PaginationPageButton {
  title: number;
  id: string;
}

export interface PaginationProps {
  pagesButtons: PaginationPageButton[];
  currentPage: number;
  onBtnClick: (newOffset: number) => void;
  disableOnLoading?: boolean;
}

function Pagination({ pagesButtons, currentPage, onBtnClick, disableOnLoading = false }: PaginationProps): JSX.Element {
  const handlePreviousPage = (): void => {
    onBtnClick(currentPage - 1);
  };
  const handleNextPage = (): void => {
    onBtnClick(currentPage + 1);
  };

  const prevBtnStyle = cn(styles.prevPage);
  const nextBtnStyle = cn(styles.nextPage);

  const disableNextBtn = currentPage >= pagesButtons.length - 1 || disableOnLoading;
  const disablePrevBtn = currentPage <= 0 || disableOnLoading;

  if (pagesButtons.length === 0) return <div className={styles.paginationWrapper} />;

  return (
    <div className={styles.paginationWrapper}>
      <button className={prevBtnStyle} type="button" onClick={handlePreviousPage} disabled={disablePrevBtn}>
        previousPage
      </button>
      <div className={styles.buttonsWrapper}>
        {pagesButtons.map(({ title, id }, idx) => {
          const handlePagination = (): void => {
            const newOffset = idx;
            onBtnClick(newOffset);
          };

          const btnStyle = cn(styles.paginationBtn, {
            [styles.active]: idx === currentPage,
          });

          const disabledCurrentPage = idx === currentPage || disableOnLoading;

          const notFirstOrLastBtn =
            idx !== 0 && idx !== 1 && idx !== pagesButtons.length - 2 && idx !== pagesButtons.length - 1;

          const isShortList = pagesButtons.length < 6;

          if (!isShortList && (idx === currentPage - 2 || idx === currentPage + 2) && notFirstOrLastBtn)
            return <div key={id}>...</div>;
          if (!isShortList && (idx < currentPage - 2 || idx > currentPage + 1) && notFirstOrLastBtn) return null;

          return (
            <button
              className={btnStyle}
              key={id}
              onClick={handlePagination}
              type="button"
              disabled={disabledCurrentPage}
            >
              {title}
            </button>
          );
        })}
      </div>

      <button className={nextBtnStyle} type="button" onClick={handleNextPage} disabled={disableNextBtn}>
        next page
      </button>
    </div>
  );
}
export default Pagination;
