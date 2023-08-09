import { isRouteErrorResponse } from 'react-router-dom';

const getErrorMessage = (error: unknown): string => {
  let message = '';
  if (isRouteErrorResponse(error)) {
    message = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Unknown error';
  }
  return message;
};

export default getErrorMessage;
