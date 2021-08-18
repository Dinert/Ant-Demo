<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  text-align: center;
  &-header,
  &-footer {
    font-size: 18px;
    color: #fff;
    background-color: @primary-color;
    font-weight: bold;
  }
  &-header {
    line-height: 56px;
  }
  &-main {
    flex: 1;
    display: flex;
    margin: 5px;
    height: calc(100% - 66px);
    &-left {
      width: 270px;
      border: 1px solid #d9d9d9;
      &-drag {
        height: 100%;
      }
    }
    &-content {
      @headHeight: 50px;

      flex: 1;
      border: 1px solid #d9d9d9;
      margin: 0 5px;
      height: 100%;
      &-header {
        line-height: @headHeight;
        border-bottom: 2px solid #d9d9d9;
        height: @headHeight;
      }
      &-body {
        height: calc(100% - @headHeight);
        overflow: auto;
      }
    }
    &-right {
      width: 300px;
      border: 1px solid #d9d9d9;
    }
  }
  &-footer {
    line-height: 50px;
  }
}
.clearModal .ant-modal-header i {
  color: #faad14;
}
.clearModal .ant-modal-body p {
  font-size: 16px;
  margin-bottom: 0;
}

.previewModal,
.importModal,
.jsonModal   {
  &::v-deep .ant-modal {
    height: 100%;
    top: 0;
    padding: 24px 0;
    &-content {
      height: 100%;
      .ant-modal-body {
        height: calc(100% - 108px);
        overflow: auto;
        padding: 0;
      }
    }
  }
}
.previewModal {
  &::v-deep .ant-modal-body {
    .preview-group[layout="horizontal"] .preview-group-list-item {
      display: flex;
      .ant-form-item-label {
        width: 100px;
      }
      .ant-form-item-control-wrapper {
        flex: 1;
      }
    }
    .preview-group[layout="vertical"] .preview-group-list-item {
      text-align: left;
    }
    .preview-group[layout="inline"] {
      text-align: left;
      .preview-group-list {
        display: inline-block;
        margin: 10px 5px;
      }
    }

    .preview-group {
      &-list {
        padding: 0px 20px;
        margin: 10px 20px;
        border: 1px dashed #e5e5e5;
        &-item {
          margin: 15px 0;
        }
      }
    }
  }
}
.importModal {
  &::v-deep .ant-modal {
    &-content {
      .ant-modal-body {
        overflow: hidden;
      }
    }
    .importModal-title {
      background-color: #e5e5e5;
      margin-bottom: 0;
    }
    .monaco {
      height: calc(100% - 21px);
    }
  }
}
.jsonModal {
  &::v-deep .ant-modal {
    &-content {
      .ant-modal-body {
        overflow: hidden;
      }
      .ant-modal-footer{
        text-align: center;
      }
    }
    .jsonModal-title {
      background-color: #e5e5e5;
      margin-bottom: 0;
    }
    .monaco {
      height: 100%;
    }
  }
}

</style>

<template>
  <section class="home">
    <header class="home-header">Dinert---设计器</header>
    <main class="home-main">
      <div class="home-main-left">
        <CollapseDraggable :collapse="collapse" @add-list="addList" />
      </div>
      <main class="home-main-content">
        <div class="home-main-content-header">
          <DOperation @operation="operation">
            <!-- 清空弹窗 -->
            <Modal
              :modal="modalClear"
              @modal-ok="modalOkClear"
              class="clearModal"
            >
              <template #title>
                <a-icon type="question-circle" /> 警告
              </template>
              <template #content>
                <p>是否清空所有内容</p>
              </template>
            </Modal>

            <!-- 预览弹窗 -->
            <Modal
              :modal="modalPreview"
              class="previewModal"
              @modal-ok="modalOkPreview"
            >
              <template #title>预览</template>
              <template #content>
                <div class="preview-group" :layout="form.layout">
                  <FormItem
                    class="preview-group-list"
                    v-for="(list, index) in form.draggable.list"
                    :list="list"
                    :key="list.key"
                    :isOther="false"
                    :form="form"
                    @change-index="changeIndex(index)"
                    @copy-index="copyIndex(list, index)"
                    @delete-index="deleteIndex(index)"
                  />
                </div>
              </template>
            </Modal>

            <!-- 导入弹窗 -->
            <Modal :modal="modalImport" class="importModal">
              <template #title> JSON数据 </template>

              <template #content>
                <p class="importModal-title">导入格式如下</p>
                <Monaco
                  :monacoOptions="importMonacoOptions"
                  ref="importMonaco"
                />
              </template>

              <template #footer>
                <a-upload
                  accept="application/json"
                  :showUploadList="false"
                  style="margin-right: 10px"
                >
                  <a-button type="primary"> 导入json文件 </a-button>
                </a-upload>
                <a-button @click="modalImport.visible = false">关闭</a-button>
                <a-button type="primary" @click="modalOkImport">确定</a-button>
              </template>
            </Modal>

            <!-- 生成JSON弹窗 -->
            <Modal :modal="modalJSON" class="jsonModal">
              <template #title> JSON数据 </template>

              <template #content>
                <Monaco
                  :monacoOptions="JSONMonacoOptions"
                  ref="monacoJSON"
                />
              </template>

              <template #footer>
                <a-button type="primary" @click='copyData'>复制数据</a-button>
                <a-button type="primary" @click="exportData">导出数据</a-button>
              </template>
            </Modal>
          </DOperation>
        </div>
        <div class="home-main-content-body">
          <FormDraggable
            class="home-main-content-body-drag"
            @change="change"
            :form="form"
          />
        </div>
      </main>
      <div class="home-main-right">
        <DFormProperty
          :property="property"
          @handleFormLayoutChange="handleFormLayoutChange"
          :list="list"
        />
      </div>
    </main>
    <footer class="home-footer" v-if="isFooter">底部</footer>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      monacoEditor: {},
      collapse: {
        panel: [
          {
            header: "表单组件",
            id: 1,
            draggable: {
              list: [
                {
                  type: "input",
                  value: "",
                  key: 0,
                  label: "输入框",
                  icon: "icon-shurukuang",
                  placeholder: "请输入",
                  labelCol: { span: 2 },
                  wrapperCol: { span: 22 },
                  width: "100",
                  widthUnit: "%",
                  disabled: false,
                  clear: false,
                  hide: false,
                  addonBefore: "",
                  addonAfter: "",
                  tooltip: "提示",
                  prefix: "",
                  suffix: "",
                  checkedList: ["required"],
                  decorator: {
                    name: "input",
                    rules: [
                      {
                        message: "必填项",
                        required: true,
                      },
                    ],
                  },
                },
              ],
              group: {
                name: "drag",
                pull: "clone",
                put: false,
              },
              event: {
                change: "change",
              },
              clone: function (obj) {
                let result = _.cloneDeep(obj);
                result["key"] = result.type + "_" + new Date().valueOf();
                result["id"] = result.type + "_" + new Date().valueOf();
                return result;
              },
              id: new Date().valueOf(),
            },
          },
          { header: "自定义组件", id: 2 },
          { header: "布局组件", id: 3 },
        ],
      },
      form: {
        layout: "horizontal",
        draggable: {
          event: {
            change: "change",
          },
          group: {
            name: "drag",
          },
          bind: {},
          id: Math.random(),
          sort: true,
          index: 0,
          list: [],
        },
      },
      property: {
        tabPanes: [
          {
            key: 1,
            tab: "表单属性设置",
            name: "form",
            form: {
              layout: "vertical",
            },
          },
          {
            key: 2,
            tab: "控件属性设置",
            name: "control",
            form: {
              layout: "vertical",
            },
          },
        ],
        key: 1,
      },
      modalClear: {
        mask: true,
        closable: false,
        keyboard: true,
        title: true,
        maskStyle: {},
        cancelText: "否",
        okText: "是",
        okType: "primary",
        visible: false,
        wrapClassName: "",
        destroyOnClose: false,
        zIndex: 100,
        dialogStyle: {},
        dialogClass: "",
      },
      modalPreview: {
        mask: true,
        closable: true,
        keyboard: true,
        title: true,
        maskStyle: {},
        cancelText: "关闭",
        okText: "获取数据",
        okType: "primary",
        visible: false,
        wrapClassName: "",
        zIndex: 100,
        destroyOnClose: false,
        dialogStyle: {
          width: "90%",
        },
        dialogClass: "",
      },
      modalImport: {
        mask: true,
        closable: true,
        keyboard: true,
        title: true,
        maskStyle: {},
        cancelText: "关闭",
        okText: "确定",
        okType: "primary",
        footer: true,
        visible: false,
        wrapClassName: "",
        zIndex: 100,
        destroyOnClose: true,
        dialogStyle: {
          width: "50%",
        },
        dialogClass: "",
      },
      modalJSON: {
        mask: true,
        closable: true,
        keyboard: true,
        title: true,
        maskStyle: {},
        cancelText: "关闭",
        okText: "确定",
        okType: "primary",
        footer: true,
        visible: false,
        wrapClassName: "",
        zIndex: 100,
        destroyOnClose: true,
        dialogStyle: {
          width: "50%",
        },
        dialogClass: "",
      },
      importMonacoOptions: {
        value: "", // 编缉器的值
        language: "json",
        theme: "vs-dark", // 编缉器主题
        roundedSelection: true, // 右侧不显示编缉预览框
        autoIndent: true, // 自动缩进
        automaticLayout: true, //编辑器自适应布局
        formatOnPaste: true, //复制粘贴的时候格式化
        formatOnType: true
      },
      JSONMonacoOptions: {
        value: "", // 编缉器的值
        language: "json",
        theme: "vs-dark", // 编缉器主题
        roundedSelection: true, // 右侧不显示编缉预览框
        autoIndent: true, // 自动缩进
        automaticLayout: true, //编辑器自适应布局
        formatOnPaste: true, //复制粘贴的时候格式化
        formatOnType: true
      },
      isFooter: false,
    };
  },
  computed: {
    list() {
      if (this.form.draggable.list[this.form.draggable.index]) {
        this.property.key = 2;
      }
      return this.form.draggable.list[this.form.draggable.index];
    },
  },
  methods: {
    change({ moved, added }) {
      // 组件改变时
      if (moved && this.form.draggable.index !== moved.newIndex) {
        this.form.draggable.index = moved.newIndex;
      }
      if (added) {
        this.form.draggable.index = added.newIndex;
      }
    },
    addList(list) {
      // 添加组件
      let result = _.cloneDeep(list);
      result["key"] = result.type + "_" + new Date().valueOf();
      result["id"] = result.type + "_" + new Date().valueOf();
      this.form.draggable.list.push(result);
      this.form.draggable.index = this.form.draggable.list.length - 1;
    },
    clearList(flag) {
      if (flag !== "ok") {
        this.modalClear.visible = true;
      } else {
        this.form.draggable.list = [];
        this.modalClear.visible = false;
      }
    },
    handleFormLayoutChange(e) {
      // 布局
      this.form.layout = e.target.value;
    },
    modalOkClear(e) {
      this.clearList("ok");
    },
    modalOkPreview() {},
    modalOkImport() {
      this.modalImport.visible = false;
      this.form.draggable.list = this.$refs.importMonaco.getVal();
    },
    exportData() {
      this.$tools.exportData(this.$refs.monacoJSON.getVal(), 'demo.json');
    },
    copyData() {  // 复制数据
      this.$tools.copyText(this.$refs.monacoJSON.getVal(), () =>{
        this.$message.success('复制成功');
      });
    },
    operation(e) {
      let className = e.currentTarget.className;
      if (className.indexOf("operation-ul-preview") !== -1) {
        this.modalPreview.visible = true;
      } else if (className.indexOf("operation-ul-clear") !== -1) {
        this.modalClear.visible = true;
      } else if (className.indexOf("operation-ul-lead") !== -1) {
        this.modalImport.visible = true;
        this.$nextTick(() => {  // 页面渲染完成后执行
          this.$refs.importMonaco.setVal(this.collapse.panel[0].draggable.list);
        });
      } else if (className.indexOf("operation-ul-json") !== -1) {
        this.modalJSON.visible = true;
        this.$nextTick(() => {  // 页面渲染完成后执行
          this.$refs.monacoJSON.setVal(this.collapse.panel[0].draggable);
        });
      }
    },
  },
  components: {
    CollapseDraggable: () => import("@/components/Drag/collapseDraggable.vue"),
    FormDraggable: () => import("@/components/Drag/formDraggable.vue"),
    DOperation: () => import("@/components/DOperation/index.vue"),
    DFormProperty: () => import("@/components/DFormProperty/index.vue"),
    Modal: () => import("@/components/Common/modal.vue"),
    Monaco: () => import("@/components/Common/monaco.vue"),
    FormItem: () => import("@/components/DFormItem/index.vue"),
  },
};
</script>
