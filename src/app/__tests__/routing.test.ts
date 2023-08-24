import RoutesName from '../../shared/routing';

describe('RoutesName', () => {
  it('should have the correct route values', () => {
    expect(RoutesName.home).toBe('/');
    expect(RoutesName.main).toBe('/main');
    expect(RoutesName.catalog).toBe('/catalog');
    expect(RoutesName.cart).toBe('/cart');
    expect(RoutesName.profile).toBe('/profile');
    expect(RoutesName.login).toBe('/login');
    expect(RoutesName.error).toBe('/error');
    expect(RoutesName.about).toBe('/about');
    expect(RoutesName.product).toBe('/product');
    expect(RoutesName.registration).toBe('/registration');
  });
});
