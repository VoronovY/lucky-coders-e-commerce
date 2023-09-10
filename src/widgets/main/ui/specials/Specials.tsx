import { useEffect } from 'react';

import styles from './Specials.module.scss';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../app/layouts/images';
import getDiscounts from '../../../../shared/api/discounts/getDiscounts';
import PromoElement from '../../../../shared/ui/promocode/PromoElement';

function SpecialsContainer(): JSX.Element {
  useEffect(() => {
    getDiscounts().then((response) => {
      console.log(response);
    });
  });

  return (
    <div className={styles.specialsContainer}>
      <h2>Specials</h2>
      <div className={styles.specialsWrapper}>
        <div>
          <ArrowLeftIcon className={styles.arrowNav} />
        </div>
        <PromoElement />
        <div>
          <ArrowRightIcon className={styles.arrowNav} />
        </div>
      </div>
    </div>
  );
}

export default SpecialsContainer;
