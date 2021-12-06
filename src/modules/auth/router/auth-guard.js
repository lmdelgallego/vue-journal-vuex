import store from '@/store';

const isAuthenticateGuard = async(to, from, next) => {
  console.log({to, from, next});
  const { ok } = await store.dispatch('auth/checkUser');
  if(ok) next();
  else next({name: 'login'});
}

export default isAuthenticateGuard;