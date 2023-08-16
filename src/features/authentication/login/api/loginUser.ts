import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import passwordFlowClient from '../../../../shared/api/passwordFlowClient';
import { projectKey } from '../../../../shared/api/baseApi';

const loginUser = (email: string, password: string): void => {
  createApiBuilderFromCtpClient(passwordFlowClient(email, password))
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: { email, password } })
    .execute()
    .then(({ body }: { body: { customer: { id: string } } }) => {
      console.log('customer id:', body.customer.id);
    })
    .catch((error) => {
      if (error.body.statusCode >= 500 && error.body.statusCode < 600) {
        console.log('An internal server error has occurred. Please try again later.');
      } else if (error.body.statusCode === 400) {
        console.log('Invalid username or password');
      } else if (error.body.statusCode === 404) {
        console.log('Resource not found');
      } else {
        console.log('Unhandled error');
      }
    });
};

export default loginUser;
