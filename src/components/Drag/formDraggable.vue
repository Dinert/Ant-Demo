<style lang="less" scoped>
.list-move {
  transition: transform 0.5s;
}
.draggable-wrap {
  height: 100%;
  background-color: #fafafa;
  &.ant-form-inline {
    .draggable-group {
      text-align: left;
      .draggable-group-list {
        display: inline-block;
      }
    }
  }
  .draggable {
    height: 100%;
    &-group {
      height: 100%;
      padding: 10px 5px;
      &-list {
        cursor: move;
        padding-bottom: 5px;
      }
    }
  }
}
</style>

<template>
  <a-form :layout="form.layout" class="draggable-wrap draggable-form">
    <draggable
      class="draggable"
      :key="draggable.id"
      v-model="draggable.list"
      :group="draggable.group"
      :clone="draggable.clone"
      :sort="draggable.sort"
      v-bind="draggable.bind"
      @move="$emit((draggable.event && draggable.event.move) || 'move', $event)"
      @start="$emit((draggable.event && draggable.event.start) || 'start', $event)"
      @end="$emit((draggable.event && draggable.event.end) || 'end', $event)"
      @add="$emit((draggable.event && draggable.event.add) || 'add', $event)"
      @change="
        $emit((draggable.event && draggable.event.change) || 'change', $event)
      "
      @remove="
        $emit((draggable.event && draggable.event.remove) || 'remove', $event)
      "
      @update="
        $emit((draggable.event && draggable.event.update) || 'update', $event)
      "
      @sort="$emit((draggable.event && draggable.event.sort) || 'sort', $event)"
    >
      <transition-group tag="div" class="draggable-group" name="list">
        <FormItem
          :class="[
            'draggable-group-list',
            draggable.index === index ? 'active' : '',
          ]"
          :list="list"
          v-for="(list, index) in draggable.list"
          :key="list.id"
          :form="form"
          @change-index="changeIndex(index)"
          @copy-index="copyIndex(list, index)"
          @delete-index="deleteIndex(index)"
        />
      </transition-group>
    </draggable>
  </a-form>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "FormDraggable",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    draggable() {
      return this.form.draggable;
    }
  },
  methods: {
    changeIndex(index) {
      this.draggable.index = index;
    },
    deleteIndex(index) {
      this.draggable.list.splice(index, 1);
      this.draggable.index = index === this.draggable.list.length ? index - 1 : index;
    },
    copyIndex(list, index) {
      let result = {};
      let newIndex = index + 1;
      for (var prop in list) {
        result[prop] = list[prop];
      }
      result.id = Math.random();
      this.draggable.list.splice(newIndex, 0, result);
      // this.options.index = newIndex;
    },
  },
  components: {
    draggable,
    FormItem: () => import("../DFormItem/index.vue"),
  },
};
</script>