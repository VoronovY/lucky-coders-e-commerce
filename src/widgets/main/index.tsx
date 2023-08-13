import AboutUs from './ui/aboutUs/AboutUs';
import CatalogMain from './ui/catalogMain/CatalogMain';
import Specials from './ui/specials/Specials';
import AboutStore from './ui/aboutStore/AboutStore';

function MainPageLayout(): JSX.Element {
  return (
    <>
      <AboutUs />
      <CatalogMain />
      <Specials />
      <AboutStore />
    </>
  );
}

export default MainPageLayout;
