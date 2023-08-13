import styles from './Specials.module.scss';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../app/layouts/images';

function SpecialsContainer(): JSX.Element {
  return (
    <div className={styles.specialsContainer}>
      <h2>Specials</h2>
      <div className={styles.specialsWrapper}>
        <div>
          <ArrowLeftIcon className={styles.arrowNav} />
        </div>
        <div className={styles.promoWrapper}>
          <div className={styles.specialsContent}>
            <div>
              <span>Explore the world of stones!</span>
            </div>
            <div>
              <span>Add a touch of natural beauty to your life!</span>
            </div>
            <div>
              <span>10% </span>
              <span>discount on all types of stones.</span>
            </div>
            <div>
              <span>PROMOCODE </span>
              <span>STONE10</span>
            </div>
          </div>
        </div>
        <div>
          <ArrowRightIcon className={styles.arrowNav} />
        </div>
      </div>
    </div>
  );
}

export default SpecialsContainer;
