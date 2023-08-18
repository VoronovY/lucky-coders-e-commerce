import styles from './AboutPage.module.scss';

import aboutImg from '../../../public/assets/about.png';

function AboutPage(): JSX.Element {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutImg}>
        <img src={aboutImg} alt="about" />
      </div>
    </div>
  );
}

export default AboutPage;
