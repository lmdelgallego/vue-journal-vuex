import daybookRouter from '@/modules/daybook/routes';

describe('Daybook Router test', () => {
  test('should be router configured', async () => {
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
    });

    /*expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected');
    expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView');*/

    const promisesRouter = [];
    daybookRouter.children.forEach( child => promisesRouter.push(child.component()));

    const routes = (await Promise.all(promisesRouter)).map( r => r.default.name)

    expect(routes).toContain('NoEntrySelected');
    expect(routes).toContain('EntryView');
  });
})
