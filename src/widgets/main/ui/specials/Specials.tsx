import { useEffect, useState } from 'react';

import { DiscountCode } from '@commercetools/platform-sdk';
import Slider from 'react-slick';

import styles from './Specials.module.scss';

import getDiscounts from '../../../../shared/api/discounts/getDiscounts';
import PromoElement from '../../../../shared/ui/promocode/PromoElement';
import Promo1Img from '../../../../../public/assets/promo1.png';
import Promo2Img from '../../../../../public/assets/promo2.png';
import Promo3Img from '../../../../../public/assets/promo3.png';

function SpecialsContainer(): JSX.Element {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [promo1, promo2, promo3] = discounts;

  useEffect(() => {
    getDiscounts().then((response) => {
      setDiscounts(response.body.results);
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
      <h2>Specials</h2>
      <div className={styles.specialsWrapper}>
        <Slider {...settings}>
          <PromoElement
            imageSrc={Promo1Img}
            promoText={promo1?.description?.['en-US'] || ''}
            promoCode={promo1?.name?.['en-US'] || ''}
            backgroundColor="rgba(244, 201, 145, 0.5)"
            codeColor="rgb(251, 121, 27)"
          />
          <PromoElement
            imageSrc={Promo3Img}
            promoText={promo2?.description?.['en-US'] || ''}
            promoCode={promo2?.name?.['en-US'] || ''}
            backgroundColor="rgba(199, 199, 146, 0.5)"
            codeColor="rgb(101, 101, 43)"
          />
          <PromoElement
            imageSrc={Promo2Img}
            promoText={promo3?.description?.['en-US'] || ''}
            promoCode={promo3?.name?.['en-US'] || ''}
            backgroundColor="rgba(164, 175, 191, 0.5)"
            codeColor="rgb(32, 103, 124)"
          />
        </Slider>
      </div>
    </div>
  );
}

export default SpecialsContainer;
