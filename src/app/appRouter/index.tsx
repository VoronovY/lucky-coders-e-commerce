import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import ErrorPage from '../../pages/error';
import RoutesName from '../../shared/routing';
import MainPage from '../../pages/main';
import BaseLayout from '../layouts/baseLayout';
import { SignUpPage, LoginPage } from '../../pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={BaseLayout} errorElement={<ErrorPage />}>
      <Route index element={<MainPage />} />
      <Route path={RoutesName.main} element={<MainPage />} />
      <Route path={RoutesName.login} element={<LoginPage />} />
      <Route path={RoutesName.registration} element={<SignUpPage />} />
    </Route>,
  ),
);

export default router;
