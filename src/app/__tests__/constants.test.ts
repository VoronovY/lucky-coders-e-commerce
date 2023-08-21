import catalogLinks from '../../shared/constants/catalogLinks';

describe('catalogLinks', () => {
  it('should have unique IDs for each link object', () => {
    const ids = catalogLinks.map((link) => link.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds.length).toBe(ids.length);
  });

  it('should have paths that start with "/catalog"', () => {
    const paths = catalogLinks.map((link) => link.path);
    const isPathValid = paths.every((path) => path.startsWith('/catalog'));
    expect(isPathValid).toBe(true);
  });
});
