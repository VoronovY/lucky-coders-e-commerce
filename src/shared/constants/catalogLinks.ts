import StoneSliceImg from '../../../public/assets/stone-slice.png';
import PearlImg from '../../../public/assets/pearl.png';
import CrystalsImg from '../../../public/assets/crystals.png';
import AllCatalogImg from '../../../public/assets/all-catalog.png';
import BeadsImg from '../../../public/assets/beads.png';
import RoutesName from '../routing';

const catalogLinks = [
  { id: 1, src: StoneSliceImg, text: 'Collectible minerals', path: `${RoutesName.catalog}/collectible-minerals` },
  { id: 2, src: PearlImg, text: 'Pearl', path: `${RoutesName.catalog}/pearl` },
  { id: 3, src: CrystalsImg, text: 'Magical Stones', path: `${RoutesName.catalog}/magical-stones` },
  { id: 4, src: BeadsImg, text: 'Beads', path: `${RoutesName.catalog}/beads` },
  { id: 5, src: AllCatalogImg, text: 'All categories', path: RoutesName.catalog },
];

export default catalogLinks;
