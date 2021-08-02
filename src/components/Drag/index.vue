<style lang="less" scoped>
.list-move {
  transition: transform 0.5s;
}
.draggable-root {
  height: 100%;
  .draggable-wrap {
    height: 100%;
    background-color: #fafafa;
    .draggable {
      height: 100%;
      &-group {
        height: 100%;
        padding: 10px 5px;
        &-list {
          cursor: move;
        }
      }
    }
  }
}
</style>

<template>
  <div class="draggable-root">
    <template v-if="options.form">
      <a-form :layout="options.form.layout" class="draggable-wrap">
        <draggable
          class="draggable"
          :key="options.id"
          v-model="options.list"
          :group="options.group"
          :clone="options.clone"
          v-bind="options.bind"
          @move="$emit((options.event && options.event.move) || 'move', $event)"
          @start="
            $emit((options.event && options.event.start) || 'start', $event)
          "
          @end="$emit((options.event && options.event.end) || 'end', $event)"
          @add="$emit((options.event && options.event.add) || 'add', $event)"
          @change="
            $emit((options.event && options.event.change) || 'change', $event)
          "
          @remove="
            $emit((options.event && options.event.remove) || 'remove', $event)
          "
          @update="
            $emit((options.event && options.event.update) || 'update', $event)
          "
          @sort="$emit((options.event && options.event.sort) || 'sort', $event)"
        >
          <transition-group tag="div" class="draggable-group" name="list">
            <FormItem
              :class="['draggable-group-list', options.index === index ? 'active' : '']"
              :list="list"
              v-for="(list, index) in options.list"
              :key="list.id"
              :index='index'
              @change-index="changeIndex(index)"
              @copy-index="copyIndex(list, index)"
              @delete-index="deleteIndex(index)"
            />
          </transition-group>
        </draggable>
      </a-form>
    </template>
    <template v-else>
      <div class="draggable-wrap">
        <draggable
          class="draggable"
          :key="options.id"
          v-model="options.list"
          :group="options.group"
          :clone="options.clone"
          v-bind="options.bind"
          @move="$emit((options.event && options.event.move) || 'move', $event)"
          @start="
            $emit((options.event && options.event.start) || 'start', $event)
          "
          @end="$emit((options.event && options.event.end) || 'end', $event)"
          @add="$emit((options.event && options.event.add) || 'add', $event)"
          @change="
            $emit((options.event && options.event.change) || 'change', $event)
          "
          @remove="
            $emit((options.event && options.event.remove) || 'remove', $event)
          "
          @update="
            $emit((options.event && options.event.update) || 'update', $event)
          "
          @sort="$emit((options.event && options.event.sort) || 'sort', $event)"
        >
          <transition-group class="draggable-group" tag="ul" name="list">
            <li
              class="draggable-group-list"
              v-for="list in options.list"
              :key="list.id"
            >
              {{ list.name }}
            </li>
          </transition-group>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Drag",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeIndex(index) { 
      this.options.index = index;
    },
    deleteIndex(index) {
      this.options.list.splice(index, 1);
      this.options.index = index ? index - 1 : index;
    },
    copyIndex(list, index) {
      let result = {};
      let newIndex = index + 1;
      for(var prop in list) {
        result[prop] = list[prop];
      }
      result.id = Math.random();
      this.options.list.splice(newIndex, 0, result);
      this.options.index = newIndex;
    }
  },
  updated() {
    // console.log(this.options, "Drag");
  },
  components: {
    draggable,
    FormItem: () => import("../DFormItem/index.vue"),
  },
};
</script>