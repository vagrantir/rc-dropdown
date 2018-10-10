import {expect}                     from 'chai';
import {shallowMount}               from '@vue/test-utils';
import RcDropdown, {RcDropdownItem} from '@/components/RcDropdown.vue';

describe('Test RcDropdown.vue component', () => {
  const wrapper = shallowMount(RcDropdown, {
    propsData: {
      items: [
        new RcDropdownItem(0, 'test1'),
        new RcDropdownItem(1, 'test2'),
        new RcDropdownItem(2, 'test3'),
        new RcDropdownItem(3, 'test4'),
        new RcDropdownItem(4, 'test5'),
        new RcDropdownItem(5, 'test6'),
        new RcDropdownItem(6, 'test7'),
        new RcDropdownItem(7, 'test8'),
        new RcDropdownItem(8, 'test9'),
        new RcDropdownItem(10, 'test10'),
        new RcDropdownItem(11, 'test11'),
        new RcDropdownItem(12, 'test12'),
      ],
    },
  });

  it('created', () => {
    expect(wrapper.is(RcDropdown)).to.be.true;
  });

  it('contain custom styles element', ()=>{
    expect(wrapper.find('.rc-dropdown__style-host').is('div')).is.true;
  })

  it('contain activator element', ()=>{
    expect(wrapper.find('.rc-dropdown__activator').is('a')).is.true;
  })

  it('activator element not opened', ()=>{
    expect(wrapper.find('.rc-dropdown__activator.rc-dropdown__activator--opened').exists()).does.not.true;
  })

  it('has single placeholder with default text', ()=>{
    const defaultPlaceholder = 'Select an option';

    expect(wrapper.findAll('span.rc-dropdown__placeholder')).to.have.lengthOf(1);
    expect(wrapper.find('span.rc-dropdown__placeholder').exists()).is.true;
    expect(wrapper.find('span.rc-dropdown__placeholder').text()).equal(defaultPlaceholder);
  })
});
