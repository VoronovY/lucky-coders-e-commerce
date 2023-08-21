import AboutUs from './ui/aboutUs/AboutUs';
import CatalogMain from './ui/catalogMain/CatalogMain';
import Specials from './ui/specials/Specials';
import AboutStore from './ui/aboutStore/AboutStore';
import SignUpAndIn from './ui/signUpAndIn/signUpAndIn';

function MainPageLayout(): JSX.Element {
  return (
    <>
      <SignUpAndIn />
      <AboutUs />
      <CatalogMain />
      <Specials />
      <AboutStore />
    </>
  );
}

export default MainPageLayout;
