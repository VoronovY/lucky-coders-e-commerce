import styles from './MainPage.module.scss';

import MainPageLayout from '../../../widgets/main';
import useScrollToTop from '../../../shared/helpers/ScrollToTop';

function MainPage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.mainPage}>
      <MainPageLayout />
    </div>
  );
}

export default MainPage;
