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
      &-drag{
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
        <Drag class="home-main-content-drag" :options="options2"></Drag>
        <div>{{JSON.stringify(options2)}}</div>
      </main>
      <div class="home-main-right">
        我是右边的元素
        <input type="text" v-model="options2[0].list[0].name">
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
      options: [
        {
          list: [
            { name: "John", id: 0 },
            { name: "Joao", id: 1 },
            { name: "Jean", id: 2 },
            { name: "J32131", id: 3 },
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
          id: Math.random(),
        },
        {
          list: [
            { name: "Juan", id: 5 },
            { name: "Edgard", id: 6 },
            { name: "Johnson", id: 7 },
          ],
          // event: {
          //   start: 'start',
          //   end: 'end',
          //   move: 'move'
          // },
          group: {
            name: "drag",
          },
          bind: {},
          id: Math.random(),
        },
      ],
      options1: [
        {
          list: [
            { name: "John", id: 0 },
            { name: "Joao", id: 1 },
            { name: "Jean", id: 2 },
            { name: "J32131", id: 3 },
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
          clone: function ({ name }) {
            return {
              id: Math.random(),
              name: name,
            };
          },
          id: Math.random(),
        },
      ],
      options2: [
        {
          list: [
            { type: 'input', name: "Juan", id: 5, tag:'a-input', placeholder: '请输入', labelCol: { span: 4 }, wrapperCol: { span: 14 } },
            { type: 'input', name: "Edgard", id: 6, tag: 'a-input',placeholder: '请输入' , labelCol: { span: 4 }, wrapperCol: { span: 14 } },
            { type: 'input', name: "Johnson", id: 7, tag: 'a-input',placeholder: '请输入' , labelCol: { span: 4 }, wrapperCol: { span: 14 } },
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

          }
        },
      ],
      isFooter: false,
    };
  },
  methods: {
    headerClick() {
      this.options2[0].form.layout = 'vertical';
      this.$set(this.options2, 0, this.options2[0]);

      this.options2[0].list[0].name = 'input222222';
      this.$set(this.options2, 0, this.options2[0]);
    }
  },
  components: {
    Drag,
  },
};
</script>