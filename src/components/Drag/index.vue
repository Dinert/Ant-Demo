<style lang="less" scoped>
.list-move {
  transition: transform 0.5s;
}
.draggable-wrap {
  height: 100%;
  .draggable {
    height: 100%;
    &-group {
      height: 100%;
      &-list {
        cursor: move;
      }
    }
  }
}
</style>

<template>
  <div class="draggable-wrap">
    <draggable
      class="draggable"
      v-for="option in options"
      :key="option.id"
      v-model="option.list"
      :group="option.group"
      :clone='option.clone'
      v-bind="option.bind"
      @move="$emit((option.event && option.event.move) || 'move', $event)"
      @start="$emit((option.event && option.event.start) || 'start', $event)"
      @end="$emit((option.event && option.event.end) || 'end', $event)"
      @add="$emit((option.event && option.event.add) || 'add', $event)"
      @change="$emit((option.event && option.event.change) || 'change', $event)"
      @remove="$emit((option.event && option.event.remove) || 'remove', $event)"
      @update="$emit((option.event && option.event.update) || 'update', $event)"
      @sort="$emit((option.event && option.event.sort) || 'sort', $event)"
    >
    <template v-if="option.form">
      <transition-group class="draggable-group" tag="a-form" name="list">
        <!-- <a-form-item
          class="draggable-group-list"
          v-for="list in option.list"
          :key="list.id"
        >
          {{ list.name }}
        </a-form-item> -->
        <FormItem class="draggable-group-list" :list='list' v-for="list in option.list" :key='list.id'/>
      </transition-group>
    </template>
    <template v-else>
      <transition-group class="draggable-group" tag="ul" name="list">
        <li
          class="draggable-group-list"
          v-for="list in option.list"
          :key="list.id"
        >
          {{ list.name }}
        </li>
      </transition-group>
    </template>

    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Drag",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  updated() {
    console.log(this.options, 'Drag');
  },
  components: {
    draggable,
    FormItem: () => import('../DFormItem/index.vue')
  },
};
</script>