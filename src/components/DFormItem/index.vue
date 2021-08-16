<style lang="less" scoped>
.draggable-group-list {
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &.active {
    background-color: rgba(19, 194, 194, 0.2);
    outline-offset: 0;

    .draggable-group-list-copy,
    .draggable-group-list-delete {
      opacity: 1;
      pointer-events: unset;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s;
    height: 5px;
    background-color: #13c2c2;
    width: 0;
  }
  &.active::before {
    width: 100%;
  }

  &-item::v-deep {
    padding: 30px 20px 15px;
    margin-bottom: 0;
  }

  &-key {
    position: absolute;
    bottom: 0px;
    right: 10px;
    font-size: 14px;
    z-index: 999;
    color: #13c2c2;
    transition: unset 0;
  }
  &-copy,
  &-delete {
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    z-index: 2;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #13c2c2;
    opacity: 0;
    pointer-events: none;
  }
  &-copy {
    border-radius: 0 0 0 8px;
    right: 30px;
  }

  &-delete {
    right: 0px;
  }
}
</style>

<template>
  <div @click.self="$emit('change-index')">
    <a-form-item
      class="draggable-group-list-item"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :class="[list.hide ? 'hide' : '']"
      :style="{ width: cWidth }"
    >
      <span slot="label">
        <a-tooltip>
          <template slot="title" v-if="list.tooltip">
            {{ list.tooltip }}
          </template>
          {{ list.label }}
          <a-icon v-show="list.tooltip" type="question-circle" />
        </a-tooltip>
      </span>
      <component
        :is="asyncComponent"
        :list="list"
        v-decorator="[decorator.name, {
          rules: decorator.rules  
        }]"
      ></component>
    </a-form-item>

    <div class="draggable-group-list-key">{{ list.id }}</div>
    <div class="draggable-group-list-copy" @click="$emit('copy-index')">
      <a-icon type="copy" />
    </div>
    <div class="draggable-group-list-delete" @click="$emit('delete-index')">
      <a-icon type="delete" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormItem",
  props: {
    list: {
      type: Object,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    labelCol() {
      if (this.form.layout !== "horizontal") {
        return {};
      }
      return this.list.labelCol;
    },
    wrapperCol() {
      if (this.form.layout !== "horizontal") {
        return {};
      }
      return this.list.wrapperCol;
    },
    cWidth() {
      return this.list.width ? this.list.width + this.list.widthUnit : "auto";
    },
    decorator() {
      return this.list.decorator;
    },
    asyncComponent() {
      return () => import('./' + this.list.type + '.vue'); 
    }
  },
  updated() {
    // console.log(this.list, "FormItem");
  }
};
</script>