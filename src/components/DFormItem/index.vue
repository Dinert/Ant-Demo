<style lang="less" scoped>

</style>


<template>
    <a-form-item :label='list.name' :labelCol="list.labelCol" :wrapperCol="list.wrapperCol">
      <transition-group :tag='list.tag' :placeholder="list.placeholder" :key='Math.random()'>
      </transition-group>
    </a-form-item>
</template>


<script>
export default {
    name: 'FormItem',
    props: {
      list: {
        type: Object,
        required: true
      }
    },
    updated() {
      console.log(this.list, 'FormItem');
    },
    data() {
        return {

        }
    }
}
</script>