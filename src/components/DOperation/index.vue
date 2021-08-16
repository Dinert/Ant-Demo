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
        <template slot="title">保存</template>
        <li class="operation-ul-li operation-ul-save">
          <ali-icon type="icon-baocun1" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">预览</template>
        <li class="operation-ul-li operation-ul-preview">
          <ali-icon type="icon-xiazaizhongxin-01" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">导入</template>
        <li class="operation-ul-li operation-ul-lead">
          <ali-icon type="icon-daoru" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">生成JSON</template>
        <li class="operation-ul-li operation-ul-json">
          <ali-icon type="icon-shengchengjson" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">生成代码</template>
        <li class="operation-ul-li operation-ul-code">
          <ali-icon type="icon-shengchengdaima" />
        </li>
      </a-tooltip>
      <a-tooltip> 
        <template slot="title">配置接口</template>
        <li class="operation-ul-li operation-ul-port">
          <ali-icon type="icon-jiekou" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">清空</template>
        <li class="operation-ul-li operation-ul-clear">
          <ali-icon type="icon-shanchu" />
        </li>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">运行</template>
        <li class="operation-ul-li operation-ul-operation">
          <ali-icon type="icon-yunhang" />
        </li>
      </a-tooltip>
    </ul>
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