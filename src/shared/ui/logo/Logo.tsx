import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

import LogoImg from '../../../../public/assets/logo.png';

function Logo(): JSX.Element {
  return (
    <Link to="/" className={styles.logo}>
      <img src={LogoImg} alt="Stones Fall Store Logo" />
    </Link>
  );
}

export default Logo;
