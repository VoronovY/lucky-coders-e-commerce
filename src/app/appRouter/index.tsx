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
import ProductPage from '../../pages/product';
import { UserAddress, UserProfile } from '../../entities/user';

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
      <Route path={`${RoutesName.catalog}/:category/:subcategory/:key`} element={<ProductPage />} />
      <Route path={RoutesName.profile} element={<ProfilePage />}>
        <Route index element={<UserProfile />} />
        <Route path={`${RoutesName.profile}/addresses`} element={<UserAddress />} />
      </Route>
      <Route path={RoutesName.cart} element={<CartPage />} />
    </Route>,
  ),
);

export default router;
