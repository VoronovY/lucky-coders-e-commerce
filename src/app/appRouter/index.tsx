import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import LoginForm from '../../pages/login';
import ErrorPage from '../../pages/error';
import RoutesName from '../../shared/routing';
import RegistrationPage from '../../pages/registration';
import MainPage from '../../pages/main';
import BaseLayout from '../layouts/baseLayout';
import AboutPage from '../../pages/about';
import CatalogPage from '../../pages/catalog';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={BaseLayout} errorElement={<ErrorPage />}>
      <Route index element={<MainPage />} />
      <Route path={RoutesName.main} element={<MainPage />} />
      <Route path={RoutesName.login} element={<LoginForm />} />
      <Route path={RoutesName.registration} element={<RegistrationPage />} />
      <Route path={RoutesName.about} element={<AboutPage />} />
      <Route path={RoutesName.catalog} element={<CatalogPage />} />
      <Route path={`${RoutesName.catalog}/:category`} element={<CatalogPage />} />
    </Route>,
  ),
);

export default router;
