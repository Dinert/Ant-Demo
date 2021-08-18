<style lang="less" scoped>
.monaco {
  height: 100%;
  & > div {
    height: 100%;
  }
}
</style>


<template>
  <div class="monaco" ref="container"></div>
</template>


<script>
import * as monaco from "monaco-editor";
export default {
  name: "Monaco",
  props: {
    monacoOptions: {
      type: Object,
      default: () => {
        return {
          value: ``, // 编缉器的值
          language: "json",
          theme: "vs-dark", // 编缉器主题
          roundedSelection: true, // 右侧不显示编缉预览框
          autoIndent: true, // 自动缩进
          formatOnPaste: true, //复制粘贴的时候格式化
          readOnly: false,  // 是否只读
        };
      },
    },
  },
  mounted() {
    this.$refs.container.innerHTML = "";
    this.monacoEditor = monaco.editor.create(
      this.$refs.container,
      this.monacoOptions
    );
  },
  methods: {
    getVal() {  // 获取值
      if (this.monacoOptions.language === "json") {
        return JSON.parse(this.monacoEditor.getValue());
      }
      return this.monacoEditor.getValue();
    },
    setVal(value) { // 设置值
      if (this.monacoOptions.language === "json") {
        value = JSON.stringify(value);
      }
      this.monacoEditor.setValue(value);
      this.formatCode();
    },
    formatCode() {  // 格式化
        this.monacoEditor.getAction(['editor.action.formatDocument'])._run();
    }
  },
};
</script>