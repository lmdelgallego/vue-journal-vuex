export default {
  name: 'auth',
  component: () => import( /* webpackChunkName: "auth-layout" */ '@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      name: 'login',
      path: '',
      component: () => import( /* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import( /* webpackChunkName: "register" */ '@/modules/auth/views/Register.vue'),
    },
  ]
}