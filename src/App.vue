<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <RcDropdown :items="items" v-model="selectedItem1" :data-options="{disable_search: false}" style="width: 150px"/>
        <span style="width: 50px; text-align: center; margin: 10px">&nbsp;-&nbsp;</span>
        <RcDropdown :items="items" v-model="selectedItem2" :data-options="{disable_search: false}" style="width: 150px"/>
    </div>
</template>

<script>
import RcDropdown, {RcDropdownItem} from './components/RcDropdown.vue';

export default {
  name: 'app',
  components: {
    RcDropdown,
  },
  data() {
    return {
      selectedItem1: 2,
      selectedItem2: 2,
      items: [
        new RcDropdownItem(0, 'test1'),
        new RcDropdownItem(1, 'test2', false, true),
        new RcDropdownItem(2, 'test3'),
        new RcDropdownItem(3, 'test4'),
        new RcDropdownItem(4, 'test5'),
        new RcDropdownItem(5, 'test6'),
        new RcDropdownItem(6, 'search7'),
        new RcDropdownItem(7, 'test8'),
        new RcDropdownItem(8, 'test9'),
        new RcDropdownItem(10, 'test11'),
        new RcDropdownItem(11, 'test12'),
        new RcDropdownItem(12, 'test13'),
        new RcDropdownItem(13, 'test14'),
        new RcDropdownItem(14, 'test15'),
        new RcDropdownItem(15, 'test16'),
        new RcDropdownItem(16, 'test17'),
        new RcDropdownItem(17, 'test18'),
        new RcDropdownItem(18, 'test19'),
      ],
    };
  },
};
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
