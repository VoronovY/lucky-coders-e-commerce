import getErrorMessage from '../../shared/helpers/routerHelpres';

describe('getErrorMessage', () => {
  it('should return the message from an instance of Error', () => {
    const error = new Error('Custom error message');
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Custom error message');
  });

  it('should return the error string as is', () => {
    const error = 'Error string';
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Error string');
  });

  it('should return "Unknown error" for unknown error types', () => {
    const error = { foo: 'bar' };
    const errorMessage = getErrorMessage(error);
    expect(errorMessage).toBe('Unknown error');
  });
});
