import styles from './SocialLinks.module.scss';

import { GithubLogo } from '../../../../../app/layouts/images';

const socialLinks = [
  { id: 1, url: 'https://github.com/Nastasyma' },
  { id: 2, url: 'https://github.com/voronovy' },
  { id: 3, url: 'https://github.com/jnorwill' },
];
function SocialLinks(): JSX.Element {
  return (
    <div className={styles.socials_items}>
      {socialLinks.map((link) => (
        <a key={link.id} href={link.url}>
          <GithubLogo width="30" height="30" />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
