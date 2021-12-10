import createVuexStore from '../../../mocks/mock-store';

describe('Vuex: auth module', () => {
  test('initState', () => {
    const store = createVuexStore({
      status: 'authenticating',
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe('authenticating');
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  describe('#mutations', () => {
    test('loginUser', () => {
      const store = createVuexStore({
        status: 'authenticating',
        user: null,
        idToken: null,
        refreshToken: null,
      });

      const payload = {
        user: { name: 'Luis Miguel', email: 'luismiguel@gmail.com' },
        idToken: 'ABC-123',
        refreshToken: 'ABC-123',
      };

      store.commit('auth/loginUser', payload);

      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(status).toBe('authenticated');
      expect(user).toEqual(payload.user);
      expect(idToken).toBe('ABC-123');
      expect(refreshToken).toBe('ABC-123');
    });

    test('logoutUser', () => {
      localStorage.setItem('idToken', 'ABC-123');
      localStorage.setItem('refreshToken', 'ABC-123');

      const store = createVuexStore({
        status: 'authenticated',
        user: { name: 'Luis Miguel', email: 'luismiguel@gmail.com' },
        idToken: 'ABC-123',
        refreshToken: 'ABC-123',
      });

      store.commit('auth/logoutUser');
      const { status, user, idToken, refreshToken } = store.state.auth;
      expect(status).toBe('not-authenticated');
      expect(user).toBeNull();
      expect(idToken).toBeNull();
      expect(refreshToken).toBeNull();

      expect(localStorage.getItem('idToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });
  });

  describe('#getters', () => {
    test('isAuthenticated', () => {
      const store = createVuexStore({
        status: 'authenticated',
        user: { name: 'Luis Miguel', email: 'luismiguel@gmail.com' },
        idToken: 'ABC-123',
        refreshToken: 'ABC-123',
      });

      expect(store.getters['auth/getCurrentState']).toBe('authenticated');
      expect(store.getters['auth/getUserName']).toBe('Luis Miguel');
    });
  });
});
