import {shallowMount} from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';

describe('Entry.vue', () => {

  const mockRouter = {
    push: jest.fn(),
  };

  const wrapper = shallowMount(Entry, {
    propsData: {
      entry: {
        id: 1,
        date: 1635539262122,
        text: 'Test content',
      }
    },

    global: {
      mocks: {
        $router: mockRouter,
      },
    },

  });

  test('renders correctly', () => {

    expect(wrapper.element).toMatchSnapshot();
  });

  test('should be redirect correctly to "{name: daybook-entry}" when entry-container is clicked', () => {
    wrapper.find('.entry-container').trigger('click');
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'daybook-entry', params: { id: 1 } });
  });

  test('should be generate correctly computed properties', () => {
    expect(wrapper.vm.day).toBe(29);
    expect(wrapper.vm.month).toBe('Octubre');
    expect(wrapper.vm.yearDay).toBe('2021, Viernes');
  })

})