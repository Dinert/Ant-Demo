<style lang="less" scoped>
</style>


<template>
  <a-tabs :activeKey="defaultKey" @change="$emit('changeKey', $event)">
    <a-tab-pane
      v-for="tabPane in tabPanes"
      :key="tabPane.key"
      :tab="tabPane.tab"
    >
      <slot :name="tabPane.name" :tabPane="tabPane"></slot>
    </a-tab-pane>
  </a-tabs>
</template>


<script>
export default {
  name: "Tabs",
  props: {
    tabPanes: {
      type: Array,
      default: () => {},
    },
    defaultKey: {
      type: Number,
      default: 1,
    },
  }
};
</script>