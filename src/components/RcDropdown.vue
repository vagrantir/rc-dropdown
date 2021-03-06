<template>
    <div class="rc-dropdown">
        <div class="rc-dropdown__style-host">
            <custom-styles>
            </custom-styles>
        </div>
        <a @click.capture.stop="activatorClick"
           :class="{'rc-dropdown__activator--opened': isOpened}"
           class="rc-dropdown__activator">
            <span v-if="placeHolder.isHtml" v-html="placeHolder.label" class="rc-dropdown__placeholder"></span>
            <span v-if="!placeHolder.isHtml" class="rc-dropdown__placeholder">{{placeHolder.label}}</span>
            <abbr v-if="!singleDeselectDisabled"
                  @click.capture.stop="singleDeselect"
                  class="single-deselect"></abbr>
            <div class="rc-dropdown-activator__triangle"><b></b></div>
        </a>
        <div v-if="isOpened" class="rc-dropdown__options">
            <div v-if="isOpened && !searchDisabled" class="rc-dropdown__search">
                <!--@change="searchChange"-->
                <input @click.capture.stop=""
                       :value="searchText"
                       @input="searchInput"
                       type="text"
                       title=""
                       class="rc-dropdown-search__input">
            </div>
            <ul @scroll.capture="onItemsScroll" class="rc-dropdown-options__items">
                <li v-for="item of filteredItems"
                    :key="item.value"
                    :value="item.value"
                    @click.capture.stop="selectItem(item)"
                    class="rc-dropdown-items__item"
                    :class="{'rc-dropdown-items__item--disabled': !!item.disabled}"
                >
                    <span v-if="item.isHtml"
                          v-html="item.label"
                          class="rc-dropdown-option__label"></span>
                    <span v-if="!item.isHtml"
                          class="rc-dropdown-option__label">{{item.label}}</span>
                </li>
                <li v-if="filteredItems.length === 0" style="text-align: center;">
                    {{noItemsText}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import CustomStyles from '@vagrantir/vue-custom-styles';

export default {
  name: 'RcDropdown',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    items: {
      type: [Array],
      default() {
        return [];
      },
    },
    'data-options': {
      type: Object,
      default() {
        return {
          allow_single_deselect: true,
          disable_search: true,
          disable_search_threshold: 0,
          enable_split_word_search: false,
          inherit_select_classes: false,
          max_selected_options: Infinity,
          no_results_text: 'No results',
          placeholder_text_multiple: 'Select Some Options',
          placeholder_text_single: 'Select an option',
          search_contains: false,
          group_search: true,
          single_backstroke_delete: true,
          width: '100%',
          display_disabled_options: true,
          display_selected_options: true,
          include_group_label_in_selected: false,
          max_shown_results: Infinity,
          case_sensitive_search: false,
          hide_results_on_select: true,
        };
      },
    },
    'data-placeholder': {
      type: [String],
      default: '',
    },
    disable: {
      type: [Boolean],
      default: false
    },
    multiple: {
      type: [String, Boolean],
      default: false,
    },
  },
  components: {
    'custom-styles': CustomStyles,
  },
  data() {
    return {
      isOpened: false,
      searchText: '',
    };
  },
  computed: {
    settings() {
      return Object.assign(
        {
          allow_single_deselect: true,
          disable_search: true,
          disable_search_threshold: 0,
          enable_split_word_search: false,
          inherit_select_classes: false,
          max_selected_options: Infinity,
          no_results_text: 'No results',
          placeholder_text_multiple: 'Select Some Options',
          placeholder_text_single: 'Select an Option',
          search_contains: false,
          group_search: true,
          single_backstroke_delete: true,
          width: '100%',
          display_disabled_options: true,
          display_selected_options: true,
          include_group_label_in_selected: false,
          max_shown_results: Infinity,
          case_sensitive_search: false,
          hide_results_on_select: true,
        },
        this.dataOptions,
      );
    },
    placeHolder() {
      const isHtml = this.selectedItem ? this.selectedItem.isHtml : false;
      const label = this.selectedItem ?
        this.selectedItem.label :
        this.settings.placeholder_text_single;
      return {
        isHtml,
        label,
      };
    },
    noItemsText() {
      return this.settings.no_results_text;
    },
    isNoItems() {
      return this.filteredItems.length === 0;
    },
    isEmptyValue() {
      return this.value === '';
    },
    singleDeselectDisabled() {
      return this.isNoItems || this.isEmptyValue || !this.settings.allow_single_deselect || this.disable;
    },
    isSearchDisableByThreshold() {
      return this.items.length < this.settings.disable_search_threshold;
    },
    searchDisabled() {
      return (
        this.isNoItems ||
        this.settings.disable_search ||
        this.isSearchDisableByThreshold
      );
    },
    selectedItem() {
      const vm = this;
      return this.items.find(v => (
        v.value === vm.value ? v : [][0]
      ));
    },
    filteredItems() {
      const searchText = this.searchText;

      function filter(item) {
        return !!item.label.match(new RegExp('^(.*?)' + searchText + '(.*?)$', 'gi'));
      }

      return !this.searchText ? this.items : this.items.filter(i => filter(i));
    },
  },
  methods: {
    activatorClick(event) {
      // console.trace(['activatorClick', event]);
      if(this.disable){
        return;
      }

      if (event.target.tagName === 'ABBR' && event.target.classList.contains('single-deselect')) {
        return this.singleDeselect(event);
      }

      this.isOpened = !this.isOpened;
      return event;
    },
    selectItem(item) {
      if (item.disabled){
        return;
      }
      const eventName = 'change';
      const event = new CustomEvent(eventName, {
        detail: item.value,
      });
      this.$el.dispatchEvent(event);
      this.$emit(eventName, item.value);
      this.isOpened = false;
    },
    singleDeselect() {
      // console.trace(['singleDeselect', event]);
      this.selectItem({ value: '' });
    },
    searchChange({ target }) {
      this.searchText = target.value;
    },
    searchInput({ target }) {
      this.searchText = target.value;
    },
    onItemsScroll(event) {
      return event;
    },
  },
  watch: {
    isOpened() {
      const eventName = this.isOpened ? 'opened' : 'closed';
      const event = new CustomEvent(eventName, {
        detail: this.isOpened,
      });
      this.$el.dispatchEvent(event);
      this.$emit(eventName, this.isOpened);
    },
    filteredItems(newVal) {
      if (newVal.length === 0) {
        this.selectItem({ value: '', label: this.noItemsText });
      }
    },
  },
  mounted() {
    const vm = this;

    function handleClickOutside(evt) {
//      eval('debugger');
      let my = Array.from(vm.$el.querySelectorAll(evt.target.tagName.toLowerCase())).find(el=>el === evt.target);
      if (vm.isOpened && !my) {
        vm.isOpened = !vm.isOpened;
        evt.stopPropagation(true);
      }
    }

    window.addEventListener('click', handleClickOutside, true);
    //
    // window.aaa = handleClickOutside;
  },
};

export class RcDropdownItem {
  constructor(value, label, isHtml = false, disabled = false) {
    this.value = value;
    this.label = label;
    this.isHtml = isHtml;
    this.disabled = disabled;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    @roboto: 'Roboto', 'Arial', 'Helvetica', 'Nimbus Sans L', sans-serif;
    @ubuntu: 'Ubuntu', 'Tahoma', 'Verdana', 'Segoe', sans-serif;
    @times: 'Times New Roman', 'Times', 'Baskerville', 'Georgia', serif;
    @opensans: 'Open Sans', sans-serif;

    @hover: 0.2s ease;
    @move: 0.3s ease-in-out;

    @rc-red: #f26051;
    @rc-blue: #474866;
    @rc-green: #4fad4f;
    @rc-black: #515569;
    @rc-lightblue: #eff2fc;
    @rc-border: #b6b6bf;
    @input-border: 1px solid #d3d7e3;
    @text: #646680;
    @link: #4a85f0;
    @linkhover: fade(@link, 75%);
    @header-color: #c3c5db;
    @header-bgcolor: @rc-blue;
    @header: #2e2e2e;
    @headerhover: fade(@header, 75%);
    @border: @rc-border;
    @icon-png: '~../assets/rc-dropdown-icons.png';

    .rc-dropdown,
    .rc-dropdown__options,
    .rc-dropdown__search,
    .rc-dropdown-search__input {
    }

    .rc-dropdown {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        font-size: 13px;
        user-select: none;
        text-align: initial;
        & * {
            box-sizing: border-box;
        }
        & .rc-dropdown__activator {
            border: 1px @rc-border solid;
            border-radius: 3px;
            cursor: pointer;
            position: relative;
            display: block;
            overflow: hidden;
            padding: 0 0 0 8px;
            height: 32px;
            text-decoration: none;
            white-space: nowrap;
            line-height: 24px;
            span {
                color: @text;
                display: block;
                overflow: hidden;
                margin-right: 26px;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 30px;
            }
            abbr.single-deselect {
                position: absolute;
                top: 9px;
                right: 22px;
                display: block;
                width: 12px;
                height: 12px;
                background: url(@icon-png) -42px 1px no-repeat;
                font-size: 1px;
            }
            .rc-dropdown-activator__triangle {
                position: absolute;
                top: 0;
                right: 0;
                display: block;
                width: 18px;
                height: 100%;
                b {
                    display: block;
                    width: 100%;
                    height: 100%;
                    background: url(@icon-png) no-repeat 0 6px;
                }
            }
            &.rc-dropdown__activator--opened {
                span {
                    color: fade(@text, 50%);
                }
                .rc-dropdown-activator__triangle {
                    b {
                        background-position-x: -18px;
                        background-position-y: 6px;
                    }
                }
            }
        }
    }

    .rc-dropdown__options {
        position: absolute;
        top: 100%;
        z-index: 1010;
        width: 100%;
        border: 1px @rc-border solid;
        border-top: 0;
        background: #fff;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        margin-top: -2px;
        .rc-dropdown__search {
            position: relative;
            left: 0;
            top: 0;
            width: 90%;
            .rc-dropdown-search__input {
                border: @input-border;
                margin: 1px 0;
                padding: 4px 20px 4px 5px;
                width: 100%;
                height: auto;
                outline: 0;
                background: url(@icon-png) no-repeat 100% -20px;
                font-size: 1em;
                font-family: sans-serif;
                line-height: normal;
                border-radius: 0;
            }
        }
        .rc-dropdown-options__items {
            color: @text;
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
            margin: 0 4px 4px 0;
            padding: 0 0 0 4px;
            max-height: 240px;
            /* width */
            &::-webkit-scrollbar {
                width: 6px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                background: @rc-lightblue;
                border-radius: 4px;
            }

            /* Handle */
            &::-webkit-scrollbar-thumb {
                background: @rc-red;
                border-radius: 4px;
            }

            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover {
                background: fade(@rc-red, 75%);
            }
            .rc-dropdown-items__item {
                margin: 0;
                padding: 5px 6px;
                list-style: none;
                line-height: 15px;
                word-wrap: break-word;
                &:hover {
                    background-color: @rc-blue;
                    color: #fff;
                    cursor: pointer;
                }
                &--disabled{
                    background-color: #ffffff;
                    color: @rc-border;
                    cursor: default;
                    &:hover {
                        background-color: #ffffff;
                        color: @rc-border;
                        cursor: default;
                    }
                }
            }
        }
    }

    .rc-dropdown__search {
        padding: 5px;
    }
</style>
