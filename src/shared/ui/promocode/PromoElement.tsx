import styles from './PromoElements.module.scss';

import Promo1Img from '../../../../public/assets/promo1.png';
import Promo2Img from '../../../../public/assets/promo2.png';
import Promo3Img from '../../../../public/assets/promo3.png';

type PromoElementProps = {
  promoText: string;
  promoCode: string;
  index: number;
};

function PromoElement({ promoText, promoCode, index }: PromoElementProps): JSX.Element {
  const promoWrapperClasses = [styles.promoWrapperOrange, styles.promoWrapperGreen, styles.promoWrapperGrey];
  const promoWrapperClass = promoWrapperClasses[index % promoWrapperClasses.length];
  const imageSrcArray = [Promo1Img, Promo3Img, Promo2Img];
  const imageSrc = imageSrcArray[index % imageSrcArray.length];

  return (
    <div className={styles.promo}>
      <div className={`${styles.promoWrapper} ${promoWrapperClass}`}>
        {imageSrc && (
          <div className={styles.promoImg}>
            <img src={imageSrc} alt="Promo" />
          </div>
        )}
        <div className={styles.overlay} />
        <div className={styles.promoInfo}>
          <span className={styles.promoText}>{promoText}</span>
          <div className={styles.promoCodeWrapper}>
            <span>PROMO CODE</span>
            <span className={styles.code}>{promoCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoElement;
