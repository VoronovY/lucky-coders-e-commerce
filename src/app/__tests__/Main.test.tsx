import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignUpAndIn from '../../widgets/main/ui/signUpAndIn/signUpAndIn';
import CatalogMain from '../../widgets/main/ui/catalogMain/CatalogMain';

describe('SignUpAndIn', () => {
  it('renders the sign up and sign in content correctly', () => {
    render(
      <BrowserRouter>
        <SignUpAndIn />
      </BrowserRouter>,
    );

    const signInButtonElement = screen.getByRole('link', { name: /sign in/i });
    expect(signInButtonElement).toBeInTheDocument();
    expect(signInButtonElement.getAttribute('href')).toBe('/login');
  });
});

describe('CatalogMain', () => {
  it('renders the catalog links correctly', () => {
    render(
      <BrowserRouter>
        <CatalogMain />
      </BrowserRouter>,
    );

    const headingElement = screen.getByText(/catalog/i);
    expect(headingElement).toBeInTheDocument();

    const catalogLinks = screen.getAllByRole('link');
    expect(catalogLinks.length).toBeGreaterThan(0);
  });
});
