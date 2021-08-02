<style lang="less" scoped>

</style>

<template>
    <a-input :class="[list.type]" :placeholder="list.placeholder"/>
</template>

<script>
export default {
    name: "Input",
    props: {
        list: {
            type: Object,
            required: true
        }
    }
}
</script>

