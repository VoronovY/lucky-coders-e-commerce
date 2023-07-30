import { render, screen } from '@testing-library/react';
import App from './App';

describe('SimpleComponent', () => {
  it('should render correctly with the provided name', () => {
    const name = 'John';
    render(<App name={name} />);
    const headingElement = screen.getByRole('heading', { name: /hello, john/i });
    const paragraphElement = screen.getByText(/this is a simple react component/i);

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
