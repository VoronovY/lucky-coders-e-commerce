import styles from './PromoElements.module.scss';

import Promo1Img from '../../../../public/assets/promo1.png';

function PromoElement(): JSX.Element {
  return (
    <div className={styles.promoWrapper}>
      <div className={styles.promoImg}>
        <img src={Promo1Img} alt="Promo" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.promoInfo}>
        <span className={styles.promoText}>10% discount on all types of stones.</span>
        <div className={styles.promoCodeWrapper}>
          <span>PROMO CODE</span>
          <span className={styles.code}>STONE10</span>
        </div>
      </div>
    </div>
  );
}

export default PromoElement;
