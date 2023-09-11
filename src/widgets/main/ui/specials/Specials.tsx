import { useEffect, useState } from 'react';

import { DiscountCode } from '@commercetools/platform-sdk';
import Slider from 'react-slick';

import styles from './Specials.module.scss';

import getDiscounts from '../../../../shared/api/discounts/getDiscounts';
import PromoElement from '../../../../shared/ui/promocode/PromoElement';
import Promo1Img from '../../../../../public/assets/promo1.png';
import Promo2Img from '../../../../../public/assets/promo2.png';
import Promo3Img from '../../../../../public/assets/promo3.png';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';

function SpecialsContainer(): JSX.Element {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const imageSrcArray = [Promo1Img, Promo3Img, Promo2Img];

  useEffect(() => {
    getDiscounts()
      .then((response) => {
        setDiscounts(response.body.results);
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    pauseOnHover: true,
  };

  return (
    <div className={styles.specialsContainer}>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <h2>Specials</h2>
      <div className={styles.specialsWrapper}>
        <Slider {...settings}>
          {discounts.map((discount, index) => (
            <PromoElement
              key={discount.id}
              imageSrc={imageSrcArray[index]}
              promoText={discount?.description?.['en-US'] || ''}
              promoCode={discount?.name?.['en-US'] || ''}
              index={index}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SpecialsContainer;
