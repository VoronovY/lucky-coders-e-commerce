import { Link } from 'react-router-dom';

import styles from './AboutPage.module.scss';

import { RssLogo, GithubLogo } from '../../app/layouts/images';

import useScrollToTop from '../../shared/helpers/ScrollToTop';

const infArr = [
  {
    id: 1,
    photo: 'https://avatars.githubusercontent.com/u/106106665?v=4',
    name: 'Anastasia Shishmareva',
    github: 'https://github.com/nastasyma',
    role: 'Developer',
    bio: 'She has an educational background in economics, but she has decided to change her profession and has been studying frontend development for the past year.',
    contributions: [
      'worked on application design',
      'made footer',
      'made 404 page',
      'implemented main page',
      'validated the login form',
      'created products in commercetools',
      'implemented a user profile page',
      'made breadcrumb navigation',
      'implemented the cart page',
      'was responsible for unit test coverage',
    ],
  },
  {
    id: 2,
    photo: 'https://avatars.githubusercontent.com/u/79984594?v=4',
    name: 'Yuri Voronov',
    github: 'https://github.com/voronovy',
    role: 'Team lead',
    bio: 'Has been interested in front-end development for 3 years and has experience in product development. In his free time he solves leetcode.',
    contributions: [
      'added routing',
      'Implemented registration and login forms: integration with commercetools, validation, state management and redirection',
      'implemented a catalog page: filtering, sorting, product search and pagination',
    ],
  },
  {
    id: 3,
    photo: 'https://avatars.githubusercontent.com/u/70838995?v=4',
    name: 'Julia Kukharckik',
    github: 'https://github.com/jnorwill',
    role: 'Developer',
    bio: 'She has been learning JavaScript for the last couple of years.',
    contributions: ['created header', 'implemented product page', 'added README documentation', 'made "about us" page'],
  },
];

function AboutPage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.aboutPage}>
      <h2>Hello! let&apos;s meet our development team!</h2>
      <p className={styles.aboutPageDescription}>
        Our project is the result of close collaboration and collective effort among three members of our development
        team. Open communication, clear organization and mutual support have become the foundation of our work.
        Effective teamwork and the ability to adapt to change made our project a successful and fun process.
      </p>
      <div className={styles.aboutPageInf}>
        {infArr.map((item) => {
          return (
            <div className={styles.card} key={item.id}>
              <img className={styles.cardPhoto} src={item.photo} alt="img" />
              <div className={styles.cardName}>
                <h3>{item.name}</h3>
                <Link className={styles.cardGithubLink} to={item.github}>
                  <GithubLogo className={styles.cardGithub} />
                </Link>
              </div>
              <h4 className={styles.cardRole}>{item.role}</h4>
              <p className={styles.cardBio}>{item.bio}</p>
              <ul className={styles.cardContribution}>
                {item.contributions.map((contribution) => {
                  return <li key={contribution}>{contribution}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className={styles.rss}>
        <Link className={styles.rssLogoLink} to="https://rs.school/js">
          <RssLogo className={styles.rssLogo} />
        </Link>
        <div className={styles.rssText}>
          <p>The application was developed for the final task in the RS School online school.</p>
          <p>
            RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer
            community since 2013.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
