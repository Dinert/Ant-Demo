<style lang="less" scoped>
</style>

<template>
  <a-input
    :class="[list.type]"
    :placeholder="list.placeholder"
    :value="list.value"
    :disabled="list.disabled"
    :allowClear="list.clear"
    :addonAfter="list.addonAfter"
    :addonBefore="list.addonBefore"
  >
    <a-icon v-if="list.prefix" slot="prefix" :type="list.prefix" />
    <a-icon v-if="list.suffix" slot="suffix" :type="list.suffix" />
  </a-input>
</template>

<script>
export default {
  name: "Input",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
};
</script>

