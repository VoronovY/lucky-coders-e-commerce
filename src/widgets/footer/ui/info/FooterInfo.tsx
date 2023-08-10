import { Link } from 'react-router-dom';

import styles from './FooterInfo.module.scss';

import RssLogo from '../../../../../public/assets/rss-logo.svg';
import GitHubLogo from '../../../../../public/assets/github-logo.svg';
import RoutesName from '../../../../shared/routing';

function FooterInfo(): JSX.Element {
  return (
    <div className={styles.footer_info}>
      <Link to={RoutesName.about}>
        <span>About Us</span>
      </Link>
      <div className={styles.socials}>
        <div className={styles.socials_items}>
          <a href="https://github.com/Nastasyma">
            <img width="30" src={GitHubLogo} alt="GitHub Logo" />
          </a>
          <a href="https://github.com/voronovy">
            <img width="30" src={GitHubLogo} alt="GitHub Logo" />
          </a>
          <a href="https://github.com/jnorwill">
            <img width="30" src={GitHubLogo} alt="GitHub Logo" />
          </a>
        </div>
        <div>
          <a href="https://rs.school/js/">
            <img width="70" src={RssLogo} alt="RSSchool Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterInfo;
