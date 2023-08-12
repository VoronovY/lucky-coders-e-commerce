import { Link } from 'react-router-dom';

import styles from './AboutUsContainer.module.scss';

import Button from '../../../../shared/ui/button/Button';
import RoutesName from '../../../../shared/routing';

import StonesImg from '../../../../../public/assets/stones-bg.jpg';

function AboutUsContainer(): JSX.Element {
  return (
    <div className={styles.aboutUsContainer}>
      <img src={StonesImg} alt="Stones" />
      <div className={styles.aboutUsContent}>
        <div className={styles.aboutUsText}>
          <p>Our team is a fusion of passion for minerals and a dedication to creating a unique store.</p>
          <p>Our goal is to inspire people to discover and appreciate the beauty and energy of nature.</p>
        </div>
        <Link to={RoutesName.about}>
          <Button width="335px" height="50px">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AboutUsContainer;
