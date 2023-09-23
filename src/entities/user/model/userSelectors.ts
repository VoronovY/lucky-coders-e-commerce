import { UserData } from '../../../shared/types/types';

import type { RootState } from '../../../app/appStore/store';

const selectUser = (state: RootState): UserData => state.userDetails.user;

export default selectUser;
