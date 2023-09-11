import styles from './PromoElements.module.scss';

type PromoElementProps = {
  imageSrc: string;
  promoText: string;
  promoCode: string;
  backgroundColor: string;
  codeColor: string;
};

function PromoElement({ imageSrc, promoText, promoCode, backgroundColor, codeColor }: PromoElementProps): JSX.Element {
  return (
    <div className={styles.promo}>
      <div className={styles.promoWrapper}>
        {imageSrc && (
          <div className={styles.promoImg}>
            <img src={imageSrc} alt="Promo" />
          </div>
        )}
        <div className={styles.overlay} style={{ background: backgroundColor }} />
        <div className={styles.promoInfo}>
          <span className={styles.promoText}>{promoText}</span>
          <div className={styles.promoCodeWrapper}>
            <span>PROMO CODE</span>
            <span className={styles.code} style={{ color: codeColor }}>
              {promoCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoElement;
