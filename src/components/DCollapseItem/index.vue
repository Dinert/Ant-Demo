<style lang="less" scoped>
    .ant-collapse > .ant-collapse-item > .ant-collapse-header{
        text-align: left;
    }
</style>
<template>
  <div>
    <a-collapse accordion >
      <a-collapse-panel key="1" header="表单组件">
          <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="自定义组件" :disabled="false">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="布局组件">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
export default {
  name: 'DCollapseItem',
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
    };
  },
};
</script>