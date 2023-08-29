import { RootState } from '../../../app/appStore/appStore';
import { UserData } from '../../../shared/types/types';

const selectUser = (state: RootState): UserData => state.userDetails.user;

export default selectUser;
