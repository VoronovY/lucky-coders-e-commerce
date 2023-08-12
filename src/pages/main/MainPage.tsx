import { Link } from 'react-router-dom';

import styles from './MainPage.module.scss';

import RoutesName from '../../shared/routing';
import Button from '../../shared/ui/button/Button';

import StonesImg from '../../../public/assets/stones-bg.jpg';
import StoneSliceImg from '../../../public/assets/stone-slice.png';
import PearlImg from '../../../public/assets/pearl.png';
import CrystalsImg from '../../../public/assets/crystals.png';
import AllCatalogImg from '../../../public/assets/all-catalog.png';
import BeadsImg from '../../../public/assets/beads.png';
import Promo1Img from '../../../public/assets/promo1.png';
import GradientImg from '../../../public/assets/gradient.png';

function MainPage(): JSX.Element {
  return (
    <div className={styles.mainPage}>
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
      <div className={styles.catalogContainer}>
        <h2>Catalog</h2>
        <div className={styles.catalog}>
          <div>
            <img src={StoneSliceImg} alt="Collectible minerals" />
            <span className={styles.cardText}>Collectible minerals</span>
          </div>
          <div>
            <img src={PearlImg} alt="Pearl" />
            <span className={styles.cardText}>Pearl</span>
          </div>
          <div>
            <img src={CrystalsImg} alt="Magical Stones" />
            <span className={styles.cardText}>Magical Stones</span>
          </div>
          <div>
            <img src={BeadsImg} alt="Beads" />
            <span className={styles.cardText}>Beads</span>
          </div>
          <div>
            <img src={AllCatalogImg} alt="All Catalog" />
            <span className={styles.cardText}>All Catalog</span>
          </div>
        </div>
      </div>
      <div className={styles.specialsContainer}>
        <h2>Specials</h2>
        <div className={styles.promoWrapper}>
          <img className={styles.promoImg} src={Promo1Img} alt="Promo" />
          <img className={styles.gradientImg} src={GradientImg} alt="Gradient" />
          <div className={styles.specialsContent}>
            <span>Explore the world of stones!</span>
            <span>Add a touch of natural beauty to your life!</span>
            <span>10% discount on all types of stones.</span>
            <span>PROMOCODE</span>
            <span>STONE10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
