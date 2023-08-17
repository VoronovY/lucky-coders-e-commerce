import { Link } from 'react-router-dom';

import styles from './CatalogMain.module.scss';

import StoneSliceImg from '../../../../../public/assets/stone-slice.png';
import PearlImg from '../../../../../public/assets/pearl.png';
import CrystalsImg from '../../../../../public/assets/crystals.png';
import AllCatalogImg from '../../../../../public/assets/all-catalog.png';
import BeadsImg from '../../../../../public/assets/beads.png';
import RoutesName from '../../../../shared/routing';

const catalogLinks = [
  { id: 1, src: StoneSliceImg, text: 'Collectible minerals', path: `${RoutesName.catalog}/collectible-minerals` },
  { id: 2, src: PearlImg, text: 'Pearl', path: `${RoutesName.catalog}/pearls` },
  { id: 3, src: CrystalsImg, text: 'Magical Stones', path: `${RoutesName.catalog}/magical-stones` },
  { id: 4, src: BeadsImg, text: 'Beads', path: `${RoutesName.catalog}/beads` },
  { id: 5, src: AllCatalogImg, text: 'All Catalog', path: RoutesName.catalog },
];
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
