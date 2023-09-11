import { useEffect, useState } from 'react';

import { DiscountCode } from '@commercetools/platform-sdk';
import Slider from 'react-slick';

import styles from './Specials.module.scss';

import getDiscounts from '../../../../shared/api/discounts/getDiscounts';
import PromoElement from '../../../../shared/ui/promocode/PromoElement';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';

function SpecialsContainer(): JSX.Element {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

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
              promoText={discount?.description?.['en-US'] || ''}
              promoCode={discount.code}
              index={index}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SpecialsContainer;
