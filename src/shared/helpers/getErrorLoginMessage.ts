import { HttpErrorType } from '@commercetools/sdk-client-v2';

function getErrorLoginMessage(error: HttpErrorType): string {
  let message = '';
  if (error.statusCode >= 500) {
    message = 'An internal server error has occurred. Please try again later.';
  } else if (error.statusCode === 400) {
    message = 'Invalid email or password';
  } else if (error.statusCode === 404) {
    message = 'Resource not found';
  } else {
    message = 'Unhandled error';
  }
  return message;
}

export default getErrorLoginMessage;
