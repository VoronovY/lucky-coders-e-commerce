import styles from './catalogContainer.module.scss';

import StoneSliceImg from '../../../../../public/assets/stone-slice.png';
import PearlImg from '../../../../../public/assets/pearl.png';
import Pearl2Img from '../../../../../public/assets/pearl2.png';
import CrystalsImg from '../../../../../public/assets/crystals.png';
import Crystals2Img from '../../../../../public/assets/crystals2.png';
import AllCatalogImg from '../../../../../public/assets/all-catalog.png';
import AllCatalog2Img from '../../../../../public/assets/all-catalog2.png';
import BeadsImg from '../../../../../public/assets/beads.png';
import Beads2Img from '../../../../../public/assets/beads2.png';

const catalogLinks = [
  { id: 1, src: StoneSliceImg, text: 'Collectible minerals', srcSet: StoneSliceImg },
  { id: 2, src: PearlImg, text: 'Pearl', srcSet: Pearl2Img },
  { id: 3, src: CrystalsImg, text: 'Magical Stones', srcSet: Crystals2Img },
  { id: 4, src: BeadsImg, text: 'Beads', srcSet: Beads2Img },
  { id: 5, src: AllCatalogImg, text: 'All Catalog', srcSet: AllCatalog2Img },
];
function CatalogContainer(): JSX.Element {
  return (
    <div className={styles.catalogContainer}>
      <h2>Catalog</h2>
      <div className={styles.catalog}>
        {catalogLinks.map((link) => (
          <div key={link.id}>
            <picture>
              <source srcSet={link.srcSet} media="(max-width: 1280px)" />
              <img src={link.src} alt={link.text} />
            </picture>
            <span className={styles.cardText}>{link.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogContainer;
