import styles from './PromoElements.module.scss';

type PromoElementProps = {
  imageSrc: string;
  promoText: string;
  promoCode: string;
  index: number;
};

function PromoElement({ imageSrc, promoText, promoCode, index }: PromoElementProps): JSX.Element {
  const promoWrapperClasses = [styles.promoWrapperOrange, styles.promoWrapperGreen, styles.promoWrapperGrey];
  const promoWrapperClass = promoWrapperClasses[index % promoWrapperClasses.length];

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
