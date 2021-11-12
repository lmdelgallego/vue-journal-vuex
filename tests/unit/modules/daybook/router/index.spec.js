import daybookRouter from '@/modules/daybook/routes';

describe('Daybook Router test', () => {
  test('should be router configured', () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'daybook-no-entry',
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: 'daybook-entry',
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    })
  });
})
