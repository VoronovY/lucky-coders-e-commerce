import { render, screen } from '@testing-library/react';

import { useParams } from 'react-router-dom';

import AboutPage from '../../pages/about';
import CatalogPage from '../../pages/catalog';

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

describe('CatalogPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the all catalog data when category is not provided', () => {
    (useParams as jest.Mock).mockReturnValue({});

    render(<CatalogPage />);

    expect(screen.getByText('All categories')).toBeInTheDocument();
    expect(screen.getByAltText('All categories')).toBeInTheDocument();
  });
});
