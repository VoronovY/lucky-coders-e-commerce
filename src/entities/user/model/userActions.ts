import getCustomer from '../api/userApi';

export interface User {
  email: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
}
export const getCustomerAction: () => Promise<User> = () => {
  return getCustomer()
    .then((user) => {
      return {
        email: user.body.email !== undefined ? user.body.email : '',
        lastName: user.body.lastName !== undefined ? user.body.lastName : '',
        firstName: user.body.firstName !== undefined ? user.body.firstName : '',
        dateOfBirth: user.body.dateOfBirth !== undefined ? user.body.dateOfBirth : '',
      };
    })
    .catch((error) => {
      throw error;
    });
};
