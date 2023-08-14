import styles from './MainPage.module.scss';

import MainPageLayout from '../../../widgets/main';

function MainPage(): JSX.Element {
  return (
    <div className={styles.mainPage}>
      <MainPageLayout />
    </div>
  );
}

export default MainPage;
