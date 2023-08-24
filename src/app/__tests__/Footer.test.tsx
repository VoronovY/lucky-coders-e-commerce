import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import FooterCatalogList from '../../widgets/footer/ui/catalogtList/FooterCatalogList';

describe('FooterCatalogList', () => {
  const categories = [
    { id: 1, name: 'Pearl', path: '/catalog/pearl' },
    { id: 2, name: 'Collectible minerals', path: '/catalog/collectible-minerals' },
    { id: 3, name: 'Beads', path: '/catalog/beads' },
    { id: 4, name: 'Magical stones', path: '/catalog/magical-stones' },
  ];

  it('renders the category links', () => {
    render(
      <MemoryRouter>
        <FooterCatalogList />
      </MemoryRouter>,
    );

    categories.forEach((category) => {
      const linkElement = screen.getByText(category.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', category.path);
    });
  });
});
