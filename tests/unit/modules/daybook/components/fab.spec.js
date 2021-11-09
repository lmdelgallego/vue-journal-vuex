import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab.vue';

describe('Fab Component', () => {
  test('should be show default icon : "fa-plus"', () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find('i');
    expect(iTag.classes()).toContain('fa-plus');
  });

  test('should be show icon by argument : "fa-circle"', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle',
      },
    });
    const iTag = wrapper.find('i');
    expect(iTag.classes()).toContain('fa-circle');
  });

  test('should be emit event on:click when icon is clicked', () => {
    const wrapper = shallowMount(Fab);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('on:click')).toHaveLength(1);
  });
});
