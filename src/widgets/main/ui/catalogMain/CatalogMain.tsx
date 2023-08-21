import { Link } from 'react-router-dom';

import styles from './CatalogMain.module.scss';

import catalogLinks from '../../../../shared/constants/catalogLinks';

function CatalogMain(): JSX.Element {
  return (
    <div className={styles.catalogContainer}>
      <h2>Catalog</h2>
      <div className={styles.catalog}>
        {catalogLinks.map((link) => (
          <Link to={link.path} key={link.id}>
            <img src={link.src} alt={link.text} />
            <span className={styles.cardText}>{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CatalogMain;
