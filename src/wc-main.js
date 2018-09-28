import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import RcDropdown from './components/RcDropdown.vue';

const CustomElement = wrap(Vue, RcDropdown);

window.customElements.define('rc-dropdown', CustomElement);

export default RcDropdown;
