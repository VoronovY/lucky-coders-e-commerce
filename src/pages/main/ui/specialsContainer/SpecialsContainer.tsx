import styles from './SpecialsContainer.module.scss';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../app/layouts/images';

import Promo1Img from '../../../../../public/assets/promo1.png';
import PromoFirst768Img from '../../../../../public/assets/promo1-768.png';
import GradientImg from '../../../../../public/assets/gradient.png';

function SpecialsContainer(): JSX.Element {
  return (
    <div className={styles.specialsContainer}>
      <h2>Specials</h2>
      <div className={styles.specialsWrapper}>
        <div>
          <ArrowLeftIcon className={styles.arrowNav} />
        </div>
        <div className={styles.promoWrapper}>
          <picture>
            <source srcSet={PromoFirst768Img} media="(max-width: 768px)" />
            <img className={styles.promoImg} src={Promo1Img} alt="Promo" />
          </picture>

          <img className={styles.gradientImg} src={GradientImg} alt="Gradient" />
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
