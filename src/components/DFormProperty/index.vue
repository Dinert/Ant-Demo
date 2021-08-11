<style lang="less" scoped>
.ant-form{
    padding: 0 20px;
    text-align: left;
}
</style>


<template>
  <div class="property">
    <Tabs :tabPanes="property.tabPanes" :defaultKey="property.defaultKey">
      <template #form="{ tabPane }">
        <a-form :layout="tabPane.form.layout">
          <a-form-item
            label="表单布局："
          >
            <a-radio-group
              default-value="horizontal"
              @change="$emit('handleFormLayoutChange', $event)"
            >
              <a-radio-button value="horizontal">水平</a-radio-button>
              <a-radio-button value="vertical">垂直</a-radio-button>
              <a-radio-button value="inline">行内</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </template>
      <template #control>
        <div>開外挂開外挂</div>
      </template>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: "DFormProperty",
  props: {
    property: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleFormLayoutChange(e) {
        console.log(e);
    }
  },
  components: {
    Tabs: () => import("@/components/Common/tabs.vue"),
  },
};
</script>