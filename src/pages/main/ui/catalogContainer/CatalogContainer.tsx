import { Link } from 'react-router-dom';

import styles from './catalogContainer.module.scss';

import StoneSliceImg from '../../../../../public/assets/stone-slice.png';
import PearlImg from '../../../../../public/assets/pearl.png';
import CrystalsImg from '../../../../../public/assets/crystals.png';
import AllCatalogImg from '../../../../../public/assets/all-catalog.png';
import BeadsImg from '../../../../../public/assets/beads.png';

const catalogLinks = [
  { id: 1, src: StoneSliceImg, text: 'Collectible minerals' },
  { id: 2, src: PearlImg, text: 'Pearl' },
  { id: 3, src: CrystalsImg, text: 'Magical Stones' },
  { id: 4, src: BeadsImg, text: 'Beads' },
  { id: 5, src: AllCatalogImg, text: 'All Catalog' },
];
function CatalogContainer(): JSX.Element {
  return (
    <div className={styles.catalogContainer}>
      <h2>Catalog</h2>
      <div className={styles.catalog}>
        {catalogLinks.map((link) => (
          <Link to={link.text.toLowerCase().replace(/\s/g, '-')} key={link.id}>
            <img src={link.src} alt={link.text} />
            <span className={styles.cardText}>{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CatalogContainer;
