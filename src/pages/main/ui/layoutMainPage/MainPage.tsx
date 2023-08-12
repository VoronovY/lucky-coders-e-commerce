import styles from './MainPage.module.scss';

import AboutUsContainer from '../aboutUsContainer/AboutUsContainer';
import CatalogContainer from '../catalogContainer/CatalogContainer';
import SpecialsContainer from '../specialsContainer/SpecialsContainer';
import AboutStoreContainer from '../aboutStoreContainer/AboutStoreContainer';

function MainPage(): JSX.Element {
  return (
    <div className={styles.mainPage}>
      <AboutUsContainer />
      <CatalogContainer />
      <SpecialsContainer />
      <AboutStoreContainer />
    </div>
  );
}

export default MainPage;
