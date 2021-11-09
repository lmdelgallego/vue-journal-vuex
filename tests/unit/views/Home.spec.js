import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home View', () => {
  test('debe renderizar el componente correctamente', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should be click on button and redirect to "{"name": "daybook-no-entry"}"', () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
    wrapper.find('button').trigger('click');
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'daybook-no-entry' });
  });
});
