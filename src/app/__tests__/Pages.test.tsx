import { render } from '@testing-library/react';

import AboutPage from '../../pages/about';

window.scrollTo = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('AboutPage', () => {
  test('renders the component without errors', () => {
    render(<AboutPage />);
  });

  test('displays the about image', () => {
    const { getByAltText } = render(<AboutPage />);
    const aboutImgElement = getByAltText('about');
    expect(aboutImgElement).toBeInTheDocument();
  });

  test('has the correct CSS class', () => {
    const { container } = render(<AboutPage />);
    expect(container.firstChild).toHaveClass('aboutPage');
  });
});
