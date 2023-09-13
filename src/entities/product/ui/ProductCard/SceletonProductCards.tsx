import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ProductCard.module.scss';

export interface SkeletonCardsProps {
  cardNumber: number;
}

function SkeletonCards({ cardNumber }: SkeletonCardsProps): JSX.Element {
  return (
    <>
      {Array(cardNumber)
        .fill(1)
        .map((_, index) => (
          <div className={styles.productCardWrapperSkeleton} key={`idx-${index + 1}`}>
            <Skeleton height="100%" />
            <div className={styles.discountWrapperSkeleton}>
              <Skeleton height="100%" width="100%" />
            </div>
            <div className={styles.mainInfo}>
              <picture className={styles.productImgWrapperSkeleton}>
                <Skeleton height="100%" />
              </picture>
              <div className={styles.pictogramms}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.title}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.description}>
                <Skeleton height="100%" count={3} />
              </div>
            </div>
            <div className={styles.footerSkeleton}>
              <div className={styles.prices}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.btnSkeleton}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.btnSkeleton}>
                <Skeleton height="100%" />
              </div>
            </div>
            {/* <h4 className="card-title">
              <Skeleton circle height={50} width={50} />
              <Skeleton height={36} width="80%" />
            </h4>
            <p className="card-channel">
              <Skeleton width="60%" />
            </p>
            <div className="card-metrics">
              <Skeleton width="90%" />
            </div> */}
          </div>
        ))}
    </>
  );
}

export default SkeletonCards;
