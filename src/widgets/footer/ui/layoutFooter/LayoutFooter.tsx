import styles from './LayoutFooter.module.scss';

import Logo from '../../../../../public/assets/logo.png';
import FooterInfo from '../info/FooterInfo';
import FooterCatalogList from '../catalogtList/FooterCatalogList';

function LayoutFooter(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.logo}>
          <img width="145" src={Logo} alt="Stones Fall Store Logo" />
        </div>
        <FooterCatalogList />
        <FooterInfo />
      </div>
    </footer>
  );
}

export default LayoutFooter;
