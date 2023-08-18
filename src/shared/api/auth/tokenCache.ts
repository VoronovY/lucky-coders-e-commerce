import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private tokenStore: TokenStore;

  constructor() {
    this.tokenStore = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    };
  }

  public get store(): TokenStore {
    return this.tokenStore;
  }

  public set store(newStore: TokenStore) {
    this.tokenStore = newStore;
  }

  public get(): TokenStore {
    return this.store;
  }

  public set(tokenStore: TokenStore): void {
    this.store = tokenStore;
  }

  public clear(): void {
    this.store = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    };
  }
}

const myTokenCache = new MyTokenCache();

export default myTokenCache;
