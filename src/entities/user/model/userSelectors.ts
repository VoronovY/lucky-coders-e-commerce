import { RootState } from '../../../app/appStore/appStore';
import { UserData } from '../../../shared/types/types';

const selectUser = (state: RootState): UserData => state.userReducer.user;

export default selectUser;
