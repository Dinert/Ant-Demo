<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  text-align: center;
  &-header,
  &-footer {
    font-size: 18px;
    color: #fff;
    background-color: #13c2c2;
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
        border-bottom: 1px solid #d9d9d9;
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
          <DOperation></DOperation>
        </div>
        <div class="home-main-content-body">
          <FormDraggable
            class="home-main-content-body-drag"
            @change="change"
            :form="form"
            @move="move"
          />
        </div>
      </main>
      <div class="home-main-right">
        <DFormProperty :property="property" @handleFormLayoutChange="handleFormLayoutChange"/>
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
      collapse: {
        panel: [
          {
            header: "表单组件",
            id: 1,
            draggable: {
              list: [
                {
                  type: "input",
                  id: 0,
                  label: "输入框",
                  icon: "icon-Input",
                  placeholder: "请输入",
                  labelCol: { span: 2 },
                  wrapperCol: { span: 22 },
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
              bind: {},
              clone: function (obj) {
                let result = {};
                for (var prop in obj) {
                  result[prop] = obj[prop];
                }
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
          list: []
        }
      },  
      property: {
        tabPanes: [
          {
            key: 1,
            tab: '表单属性设置',
            name: 'form',
            form: {
              layout: 'vertical',
              
            }
          },
          {
            key: 2,
            tab: '控件属性设置',
            name: 'control'
          }
        ],
        defaultKey: 1,
      },
      isFooter: false,
    };
  },
  methods: {
    move(e) {
      console.log(e);
    },
    change({ moved, added }) {
      if (moved && this.form.draggable.index !== moved.newIndex) {
        this.form.draggable.index = moved.newIndex;
      }
      if (added) {
        this.form.draggable.index = added.newIndex;
      }
    },
    addList(list) {
      let result = {};
      for (let prop in list) {
        result[prop] = list[prop];
      }
      result["id"] = result.type + "_" + new Date().valueOf();
      this.form.draggable.list.push(result);
      this.form.draggable.index = this.form.draggable.list.length - 1;
    },
    handleFormLayoutChange(e) {
        this.form.layout = e.target.value;
    }
  },
  components: {
    CollapseDraggable: () => import("@/components/Drag/collapseDraggable.vue"),
    FormDraggable: () => import("@/components/Drag/formDraggable.vue"),
    DOperation: () => import("@/components/DOperation/index.vue"),
    DFormProperty: () => import("@/components/DFormProperty/index.vue")
  },
};
</script>
