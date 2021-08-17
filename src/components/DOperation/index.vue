<style lang="less" scoped>
.operation {
  &-ul {
    display: flex;
    padding-left: 15px;
    &-li {
      cursor: pointer;
      padding: 0 4px;
      font-size: 18px;
    }
    &-li:hover {
      color: #13c2c2;
    }
    &-json, &-operation, &-code, &-port, &-clear, &-operation{
        font-size: 16px;
    }
  }
}
</style>


<template>
  <div class="operation">
    <ul class="operation-ul">
      <a-tooltip>
        <template slot="title" @click="$emit('operation', $event)">保存</template>
        <li class="operation-ul-li operation-ul-save">
          <ali-icon type="icon-baocun1" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">预览</template>
        <li class="operation-ul-li operation-ul-preview" @click="$emit('operation', $event)">
          <ali-icon type="icon-xiazaizhongxin-01" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">导入</template>
        <li class="operation-ul-li operation-ul-lead" @click="$emit('operation', $event)">
          <ali-icon type="icon-daoru" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">生成JSON</template>
        <li class="operation-ul-li operation-ul-json" @click="$emit('operation', $event)">
          <ali-icon type="icon-shengchengjson" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">生成代码</template>
        <li class="operation-ul-li operation-ul-code" @click="$emit('operation', $event)">
          <ali-icon type="icon-shengchengdaima" />
        </li>
      </a-tooltip>
      <a-tooltip> 
        <template slot="title">配置接口</template>
        <li class="operation-ul-li operation-ul-port" @click="$emit('operation', $event)">
          <ali-icon type="icon-jiekou" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">清空</template>
        <li class="operation-ul-li operation-ul-clear" @click="$emit('operation', $event)">
          <ali-icon type="icon-shanchu" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">运行</template>
        <li class="operation-ul-li operation-ul-operation" @click="$emit('operation', $event)">
          <ali-icon type="icon-yunhang" />
        </li>
      </a-tooltip>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Operation",
  data() {
    return {};
  },
};
</script>