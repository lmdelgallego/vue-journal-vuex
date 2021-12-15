import axios from 'axios';
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

  describe('#actions', () => {
    test('createUser - usuario ya existe', async () => {
      const store = createVuexStore({
        status: 'not-authenticated',
        user: null,
        idToken: null,
        refreshToken: null,
      });

      const newUser = {
        name: 'Luis Miguel',
        email: 'test@test.com',
        password: '123456',
      };

      const response = await store.dispatch('auth/createUser', newUser);

      expect(response).toEqual({ ok: false, message: 'EMAIL_EXISTS' });
    });

    test('createUser - usuario creado', async () => {
      const store = createVuexStore({
        status: 'not-authenticated',
        user: null,
        idToken: null,
        refreshToken: null,
      });

      const newUser = {
        name: 'Test2',
        email: 'test2@test.com',
        password: '123456',
      };

      // signIn
      await store.dispatch('auth/loginUser', newUser);
      const { idToken } = store.state.auth;
      // deleteUser
      await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyArFtSOsqmL0k31tCgy47dPKtffXTasr1o',
        { idToken }
      );
      newUser['password'] = '123456';
      //crearUser
      const createResponse = await store.dispatch('auth/createUser', newUser);
      expect(createResponse.ok).toBeTruthy();

      const { status, user, idToken: token, refreshToken } = store.state.auth;
      expect(status).toBe('authenticated');
      expect(user).toMatchObject({
        name: 'Test2',
        email: 'test2@test.com',
      });
      expect(typeof token).toBe('string');
      expect(typeof refreshToken).toBe('string');
    });

    test('loginUser - usuario existe', async () => {
      const store = createVuexStore({
        status: 'not-authenticated',
        user: null,
        idToken: null,
        refreshToken: null,
      });

      await store.dispatch('auth/loginUser', {
        email: 'test2@test.com',
        password: '123456',
      });

      const { idToken } = store.state.auth;
      localStorage.setItem('idToken', idToken);
      expect(typeof idToken).toBe('string');

      const checkResponse = await store.dispatch('auth/checkUser');
      expect(checkResponse.ok).toBeTruthy();
      const { status, user, idToken: token } = store.state.auth;
      expect(status).toBe('authenticated');
      expect(user).toMatchObject({
        name: 'Test2',
        email: 'test2@test.com',
      });
      expect(typeof token).toBe('string');
    });

    test('loginUser - idToken no existe', async () => {
      const store = createVuexStore({
        status: 'not-authenticated',
        user: null,
        idToken: null,
        refreshToken: null,
      });

      localStorage.removeItem('idToken');
      const checkResp1 = await store.dispatch('auth/checkUser');
/*
      const response = await store.dispatch('auth/loginUser', {
        email: 'test4@test.com',
        password: '123456',
      }); */

      expect(checkResp1).toEqual({ ok: false, message: 'No hay token' });
      expect(store.state.auth.status).toBe('not-authenticated');
      expect(store.state.auth.user).toBeNull();
      expect(store.state.auth.idToken).toBeNull();

      localStorage.setItem('idToken', 'ABC-123');
      const checkResp2 = await store.dispatch('auth/checkUser');
      expect(checkResp2).toEqual({ ok: false, message: 'Token invalido' });
      expect(store.state.auth.status).toBe('not-authenticated');
      expect(store.state.auth.user).toBeNull();
      expect(store.state.auth.idToken).toBeNull();
    });
  });
});
