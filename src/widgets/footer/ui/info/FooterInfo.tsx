import { Link } from 'react-router-dom';

import styles from './FooterInfo.module.scss';

import SocialLinks from './socialLinks/SocialLinks';

import { RssLogo } from '../../../../app/layouts/images';
import RoutesName from '../../../../shared/routing';

function FooterInfo(): JSX.Element {
  return (
    <div className={styles.footer_info}>
      <Link to={RoutesName.about}>
        <span>About Us</span>
      </Link>
      <div className={styles.socials}>
        <SocialLinks />
        <div>
          <a href="https://rs.school/js/">
            <RssLogo width="60" height="25" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterInfo;
