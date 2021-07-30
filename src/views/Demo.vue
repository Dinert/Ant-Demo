<template>
  <div class="demo">
    <div>
      <a-select
        default-value="lucy"
        style="width: 100%"
        :getPopupContainer="getPopupContainer"
        :open="isOpen"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu" />
          <a-divider style="margin: 4px 0" />
          <div
            style="padding: 4px 8px; cursor: pointer width: 100%;height: 100px;"
            @mousedown="(e) => e.preventDefault()"
          >
            <a-select
              default-value="jack"
              style="width: 100%; height: 100px"
              :getPopupContainer="getPopupContainer"
              :key="'kkkk'"
              :open="isOpen2"
              @dropdownVisibleChange="dropdownVisibleChange2"
              ref="drop2"
            >
              <div slot="aaaa" slot-scope="menu">
                <v-nodes :vnodes2="menu" />
                <a-divider style="margin: 4px 0" />
                <div
                  style="padding: 4px 8px; cursor: pointer"
                  @mousedown="(e) => e.preventDefault()"
                ></div>
              </div>
              <a-select-option v-for="item in items2" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <a-select-option v-for="item in items" :key="item" :value="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </div>
    <div></div>
  </div>
</template>
<script>
let index = 0;
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    VNodes2: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data: () => ({
    items: ["jack", "lucy"],
    items2: ["jack", "lucy"],
    isOpen: false,
    isOpen2: false,
  }),
  methods: {
    addItem() {
      console.log("addItem");
      this.items.push(`New item ${index++}`);
    },
    getPopupContainer(trigger) {
      return trigger.parentNode;
    },
    dropdownVisibleChange(open) {
      this.isOpen = !this.isOpen;
    },
    dropdownVisibleChange2(open, e) {
      this.$children.map((item) => {
        if (item.$el === this.$refs.drop2.$el) {
          this.isOpen2 = !this.isOpen2;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.demo > div {
  margin: 500px 0;
}
</style>