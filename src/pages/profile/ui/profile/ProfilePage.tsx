import { useEffect } from 'react';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import styles from './ProfilePage.module.scss';

import useScrollToTop from '../../../../shared/helpers/ScrollToTop';
import LayoutProfile from '../../../../widgets/profile';
import existingFlowClient from '../../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../../shared/api/baseApi';

function ProfilePage(): JSX.Element {
  useScrollToTop();

  useEffect(() => {
    createApiBuilderFromCtpClient(existingFlowClient()).withProjectKey({ projectKey }).me().get().execute();
  }, []);

  return (
    <div className={styles.profilePage}>
      <LayoutProfile />
    </div>
  );
}

export default ProfilePage;
