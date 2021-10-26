export default {
  name: 'daybook',
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/daybook.layouts.vue'
    ),
  children: [
    {
      path: '',
      name: 'daybook-no-entry',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue'
        ),
    },
  ],
};
