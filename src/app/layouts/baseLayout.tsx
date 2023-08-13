import LayoutFooter from '../../widgets/footer';

import { Layout } from '../../shared/ui';

import LayoutHeader from '../../widgets/header';
import LayoutBody from '../../widgets/body';

export const baseLayout = (
  <Layout headerSlot={<LayoutHeader />} bodySlot={<LayoutBody />} bottomSlot={<LayoutFooter />} />
);

export default baseLayout;
