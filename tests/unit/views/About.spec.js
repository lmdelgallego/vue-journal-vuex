import { shallowMount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('About View', () => {
  it('debe renderizar el componente correctamente', () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
