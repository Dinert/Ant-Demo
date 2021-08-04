<style lang="less" scoped>
.list-move {
  transition: transform 0.5s;
}
.draggable-wrap {
  height: 100%;
  background-color: #fff;
  .draggable {
    height: 100%;
    &-group {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      &-list {
        cursor: move;
        box-shadow: 1px 0 0 0 #ccc, 0 1px 0 0 #ccc, 1px 1px 0 0 #ccc,
          1px 0 0 0 #ccc inset, 0 1px 0 0 #ccc inset;
        padding: 8px 12px;
        width: calc(50% - 6px);
        margin: 2.7px;
        height: 36px;
        line-height: 20px;
        cursor: move;
        border: 1px solid transparent;
        border-radius: 3px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        &:hover {
          color: #13c2c2;
          border: 1px solid #13c2c2;
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 6px #13c2c2;
        }
      }
    }
  }
}

.ant-collapse {
  text-align: left;
  &::v-deep &-header {
    background-color: #fafafa;
  }
  &::v-deep &-content-box {
    padding: 0 5px;
    min-height: 100px;
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<template>
  <a-collapse class="draggable-wrap">
    <a-collapse-panel
      v-for="panel in panels"
      :key="panel.id"
      :header="panel.header"
    >
      <draggable
        v-if="panel.draggable"
        class="draggable"
        :key="panel.draggable.id"
        v-model="panel.draggable.list"
        :group="panel.draggable.group"
        :clone="panel.draggable.clone"
        :sort="panel.draggable.sort"
        v-bind="panel.draggable.bind"
        @move="
          $emit(
            (panel.draggable.event && panel.draggable.event.move) || 'move',
            $event
          )
        "
        @start="
          $emit(
            (panel.draggable.event && panel.draggable.event.start) || 'start',
            $event
          )
        "
        @end="
          $emit(
            (panel.draggable.event && panel.draggable.event.end) || 'end',
            $event
          )
        "
        @add="
          $emit(
            (panel.draggable.event && panel.draggable.event.add) || 'add',
            $event
          )
        "
        @change="
          $emit(
            (panel.draggable.event && panel.draggable.event.change) || 'change',
            $event
          )
        "
        @remove="
          $emit(
            (panel.draggable.event && panel.draggable.event.remove) || 'remove',
            $event
          )
        "
        @update="
          $emit(
            (panel.draggable.event && panel.draggable.event.update) || 'update',
            $event
          )
        "
        @sort="
          $emit(
            (panel.draggable.event && panel.draggable.event.sort) || 'sort',
            $event
          )
        "
      >
        <transition-group class="draggable-group" tag="ul" name="list">
          <li
            class="draggable-group-list"
            v-for="list in panel.draggable.list"
            :key="list.id"
            @click="$emit('add-list', list)"
          >
            <svg v-if="list.icon" class="icon" aria-hidden="true">
              <use :xlink:href="`#${list.icon}`"></use>
            </svg>
            {{ list.label }}
          </li>
        </transition-group>
      </draggable>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "CollapseDraggable",
  props: {
    collapse: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    panels() {
      return this.collapse.panel;
    },
  },
  components: {
    draggable,
  },
};
</script>