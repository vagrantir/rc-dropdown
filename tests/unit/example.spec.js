import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import RcDropdown from '@/components/RcDropdown.vue';

describe('RcDropdown.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(RcDropdown, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
