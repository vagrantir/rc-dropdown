import Vue                          from 'vue';
import wrap                         from '@vue/web-component-wrapper';
import RcDropdown, {RcDropdownItem as RcDropdownItemSrc} from './components/RcDropdown.vue';

const CustomElement = wrap(Vue, RcDropdown);
try {
  window.customElements.define('rc-dropdown', CustomElement);
} catch (err) {
  window.console.trace(err.message);
}

