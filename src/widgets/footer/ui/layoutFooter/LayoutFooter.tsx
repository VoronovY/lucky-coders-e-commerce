import styles from './LayoutFooter.module.scss';

import FooterInfo from '../info/FooterInfo';
import FooterCatalogList from '../catalogtList/FooterCatalogList';
import Logo from '../../../../shared/ui/logo/Logo';

function LayoutFooter(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <Logo />
        <FooterCatalogList />
        <FooterInfo />
      </div>
    </footer>
  );
}

export default LayoutFooter;
