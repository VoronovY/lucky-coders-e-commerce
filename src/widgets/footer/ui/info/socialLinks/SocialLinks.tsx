import styles from './SocialLinks.module.scss';

import { GithubLogo } from '../../../../../app/layouts/images';

const socialLinks = [
  { id: 1, url: 'https://github.com/nastasyma' },
  { id: 2, url: 'https://github.com/voronovy' },
  { id: 3, url: 'https://github.com/jnorwill' },
];
function SocialLinks(): JSX.Element {
  return (
    <div className={styles.socialsItems}>
      {socialLinks.map((link) => (
        <a key={link.id} href={link.url}>
          <GithubLogo className={styles.socialsIcon} />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
