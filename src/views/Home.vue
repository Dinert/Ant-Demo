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
        height: 50%;
      }
    }
    &-content {
      flex: 1;
      border: 1px solid #d9d9d9;
      margin: 0 5px;
      overflow-y: auto;
      height: 100%;
    }
    &-right {
      width: 260px;
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
    <header class="home-header" @click="headerClick">Dinert---设计器</header>
    <main class="home-main">
      <div class="home-main-left">
        <Drag :options="options1" class="home-main-left-drag"></Drag>
        <Drag :options="options1" class="home-main-left-drag"></Drag>
      </div>
      <main class="home-main-content">
        <Drag class="home-main-content-drag" @change="change" :options="options2"></Drag>
      </main>
      <div class="home-main-right">
        我是右边的元素
        <input type="text" v-model="options2.list[options2.index].name" />
      </div>
    </main>
    <footer class="home-footer" v-if="isFooter">底部</footer>
  </section>
</template>

<script>
import Drag from "@/components/Drag";
export default {
  name: "Home",
  data() {
    return {
      options1: {
        list: [
          {
            type: "input",
            name: "Joao",
            id: 0,
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          },
          {
            type: "input",
            name: "2222222222222",
            id: 1,
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          },
          {
            type: "input",
            name: "3333333333333",
            id: 2,
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          },
          {
            type: "input",
            name: "444444444444",
            id: 3,
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
          let result = {}
          for(var prop in obj) {
            result[prop] = obj[prop];
          }
          result['id'] = Math.random();
          return result;
        },
        id: Math.random(),
      },
      options2: {
        list: [
          {
            type: "input",
            name: "Juan",
            id: 5,
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          },
          {
            type: "input",
            name: "Edgard",
            id: 6,
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          },
          {
            type: "input",
            name: "Johnson",
            id: 7,
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          },
        ],
        event: {
          change: "change",
        },
        group: {
          name: "drag",
        },
        bind: {},
        id: Math.random(),
        form: {
          layout: "horizontal",
        },
        index: 0
      },
      isFooter: false,
    };
  },
  methods: {
    headerClick() {
      this.options2.form.layout = "vertical";
      this.options2.list[0].name = "input222222";
      this.options2.list.push(         {
            type: "input",
            name: "Johnson",
            id: Math.random(),
            placeholder: "请输入",
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
          })
      this.$set(this.options2, 0, this.options2);
      setTimeout(() => {
        this.options2.index = this.options2.list.length - 1;
      }, 0);
    },
    change(added) {
      console.log(added);
    }
  },
  components: {
    Drag,
  },
};
</script>