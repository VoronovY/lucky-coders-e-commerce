import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import ErrorPage from '../../pages/error';
import RoutesName from '../../shared/routing';
import MainPage from '../../pages/main';
import BaseLayout from '../layouts/baseLayout';
import { SignUpPage, LoginPage } from '../../pages';
import AboutPage from '../../pages/about';
import CatalogPage from '../../pages/catalog';
import ProfilePage from '../../pages/profile';
import CartPage from '../../pages/cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={BaseLayout} errorElement={<ErrorPage />}>
      <Route index element={<MainPage />} />
      <Route path={RoutesName.main} element={<MainPage />} />
      <Route path={RoutesName.login} element={<LoginPage />} />
      <Route path={RoutesName.registration} element={<SignUpPage />} />
      <Route path={RoutesName.about} element={<AboutPage />} />
      <Route path={RoutesName.catalog} element={<CatalogPage />} />
      <Route path={`${RoutesName.catalog}/:category`} element={<CatalogPage />} />
      <Route path={`${RoutesName.catalog}/:category/:subcategory`} element={<CatalogPage />} />
      <Route path={RoutesName.profile} element={<ProfilePage />} />
      <Route path={`${RoutesName.profile}/:profileLink`} element={<ProfilePage />} />
      <Route path={RoutesName.cart} element={<CartPage />} />
    </Route>,
  ),
);

export default router;
