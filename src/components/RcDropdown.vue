<template>
  <div class="rc-dropdown">
    <div class="rc-dropdown__style-host" v-html="customStyle">
    </div>
    <a @click.capture.stop="activatorClick"
    :class="{'rc-dropdown__activator--opened': isOpened}"
    class="rc-dropdown__activator">
      <span v-if="placeHolder.isHtml" v-html="placeHolder.label"></span>
      <span v-if="!placeHolder.isHtml">{{placeHolder.label}}</span>
      <div class="rc-dropdown-activator__triangle"><b></b></div>
    </a>
    <div v-if="isOpened" class="rc-dropdown__options">
      <div v-if="isOpened" class="rc-dropdown__search">
        <input @click.capture.stop=""
        @change="searchChange"
        type="text"
        class="rc-dropdown-search__input">
      </div>
      <ul @scroll.capture="onItemsScroll" class="rc-dropdown-options__items">
        <li v-for="item of items"
        :key="item.value"
        :value="item.value"
        @click.capture.stop="selectItem(item)"
        class="rc-dropdown-items__item">
        <span v-if="item.isHtml" v-html="item.label" class="rc-dropdown-option__label"></span>
        <span v-if="!item.isHtml" class="rc-dropdown-option__label">{{item.label}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RcDropdown',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number, Array],
    },
    items: {
      type: [Array],
      default() {
        return [];
      },
    },
    options: {
      type: Object,
      default() {
        return {
          allow_single_deselect: false,
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
        };
      },
    },
    'data-placeholder': {
      type: [String],
      default: '',
    },
    multiple: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    settings() {
      return Object.assign(
        {
          allow_single_deselect: false,
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
        this.options,
      );
    },
    placeHolder() {
      const isHtml = this.selectedItem ? this.selectedItem.isHtml : false;
      const label = this.selectedItem
        ? this.selectedItem.label
        : this.settings.placeholder_text_single;
      return {
        isHtml,
        label,
      };
    },
    selectedItem() {
      const vm = this;
      return this.items.find(v => (v.value === vm.value ? v : [][0]));
    },
    customStyle() {
      return `
      <style>
        .rc-dropdown__options {
          
        }
      </style>
      `;
    },
  },
  methods: {
    activatorClick(event) {
      this.isOpened = !this.isOpened;
      return event;
    },
    selectItem(item) {
      const eventName = 'change';
      const event = new CustomEvent(eventName, {
        detail: item.value,
      });
      this.$el.dispatchEvent(event);
      this.$emit(eventName, item.value);
      this.activatorClick();
    },
    searchChange() {},
    onItemsScroll(event) {
      return event;
      //      console.log(event.target.firstChild.offsetTop);
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
  },
  mounted() {
    const vm = this;

    function handleClickOutside(evt) {
      if (vm.isOpened) {
        vm.isOpened = !vm.isOpened;
        evt.stopPropagation(true);
      }
    }

    window.addEventListener('click', handleClickOutside);

    window.aaa = handleClickOutside;
  },
};

export class RcDropdownItem {
  constructor(value, label, isHtml = false) {
    this.value = value;
    this.label = label;
    this.isHtml = isHtml;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
    padding: 3px 5px;
    height: 36px;
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
        background: url(@icon-png) no-repeat 0px 6px;
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
    left: 0px;
    top: 0px;
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
      }
    }
  }
}

.rc-dropdown__search {
  padding: 5px;
}
</style>
