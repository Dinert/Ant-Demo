<style lang="less" scoped>
</style>


<template>
  <a-modal
    class="modal"
    :visible="modal.visible"
    :closable="modal.closable"
    :okText="modal.okText"
    :cancelText="modal.cancelText"
    :dialogStyle="modal.dialogStyle"
    :width="modal.dialogStyle.width || 350"
    :dialogClass="modal.dialogClass"
    :destroyOnClose="modal.destroyOnClose"
    v-on="{
      ok: ok,
      cancel: cancel,
    }"
  >
    <template #title v-if="modal.title">
      <slot name="title"></slot>
    </template>
    <slot name="content"></slot>
    <template v-if="modal.footer" #footer>
      <slot name="footer">
      </slot>
    </template>
  </a-modal>
</template>


<script>
export default {
  name: "Modal",
  props: {
    modal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ok(e) {
      this.$emit("modal-ok", e);
    },
    cancel(e) {
      this.modal.visible = false;
      this.$emit("modal-cancel", e);
    },
  },
};
</script>