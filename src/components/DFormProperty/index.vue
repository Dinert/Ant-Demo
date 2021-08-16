<style lang="less" scoped>
.property {
  height: 100%;
  .ant-tabs {
    height: 100%;
  }
  .ant-tabs::v-deep {
    .ant-tabs-bar {
      margin-bottom: unset;
    }
    .ant-tabs-content {
      height: calc(100% - 44px);
    }
    .ant-tabs-tabpane {
      height: 100%;
      overflow: auto;
    }
  }
}

.ant-form {
  padding: 10px 20px;
  text-align: left;
  &-item {
    border-bottom: 1px solid #e5e5e5;
  }
  &::v-deep {
    .ant-checkbox-group-item {
      margin-right: 3px;
    }
  }
}

.settingWidth::v-deep {
  .ant-select-arrow {
    right: 6px;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  input[type="number"] {
    -moz-appearance: textfield !important;
  }
}
</style>

<template>
  <div class="property">
    <Tabs
      :tabPanes="property.tabPanes"
      :defaultKey="property.key"
      @changeKey="changeKey"
    >
      <template #form="{ tabPane }">
        <a-form :layout="tabPane.form.layout">
          <a-form-item label="表单布局：">
            <a-radio-group
              default-value="horizontal"
              @change="$emit('handleFormLayoutChange', $event)"
            >
              <a-radio-button value="horizontal">水平</a-radio-button>
              <a-radio-button value="vertical">垂直</a-radio-button>
              <a-radio-button value="inline">行内</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="`提示${symbol}`">
            <div>实现效果预览中查看</div>
          </a-form-item>
        </a-form>
      </template>
      <template #control="{ tabPane }">
        <a-form v-if="list" :layout="tabPane.form.layout">
          <!-- 标签 -->
          <a-form-item :label="`标签${symbol}`">
            <a-input placeholder="请输入" v-model="list.label" />
          </a-form-item>

          <!-- 数据字段 -->
          <a-form-item :label="`数据字段${symbol}`">
            <a-input placeholder="请输入" v-model="list.id" />
          </a-form-item>

          <!-- 占位内容 -->
          <a-form-item :label="`占位内容${symbol}`">
            <a-input placeholder="请输入" v-model="list.placeholder" />
          </a-form-item>

          <!-- 宽度 -->
          <a-form-item :label="`宽度${symbol}`">
            <a-input
              type="number"
              class="settingWidth"
              placeholder="请输入"
              v-model="list.width"
            >
              <a-select
                @select="selectWidthUnit"
                slot="addonAfter"
                :value="list.widthUnit"
                style="width: 50px"
              >
                <a-select-option value="%">%</a-select-option>
                <a-select-option value="px">px</a-select-option>
                <!-- <a-select-option value="rem">rem</a-select-option>
                  <a-select-option value="em">em</a-select-option> -->
              </a-select>
            </a-input>
          </a-form-item>

          <!-- 默认值 -->
          <a-form-item :label="`默认值${symbol}`">
            <a-input placeholder="请输入" v-model="list.value">
              <a-select slot="addonAfter" :value="'a'" style="width: 50px">
                <a-select-option value="a">a</a-select-option>
                <a-select-option value="b">b</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>

          <!-- 前缀 -->
          <a-form-item
            :label="`前缀${symbol}`"
            v-if="list.addonBefore !== undefined"
          >
            <a-input placeholder="请输入" v-model="list.addonBefore"> </a-input>
          </a-form-item>

          <!-- 后缀 -->
          <a-form-item
            :label="`后缀${symbol}`"
            v-if="list.addonAfter !== undefined"
          >
            <a-input placeholder="请输入" v-model="list.addonAfter"> </a-input>
          </a-form-item>

          <!-- 帮助信息 -->
          <a-form-item :label="`帮助信息${symbol}`">
            <a-input placeholder="请输入" v-model="list.tooltip"> </a-input>
          </a-form-item>

          <!-- 操作属性 -->
          <a-form-item :label="`操作属性${symbol}`">
            <a-checkbox-group
              v-model="list.checkedList"
              :options="[
                { label: '隐藏', value: 'hide' },
                { label: '禁用', value: 'disabled' },
                { label: '清除', value: 'clear' },
                { label: '必填', value: 'required' },
              ]"
              @change="changeCheckboxGroup"
            />
          </a-form-item>

          <!-- 验证名称 -->
          <a-form-item :label="`验证名称${symbol}`">
            <a-input placeholder="请输入" v-model="list.decorator.name"> </a-input>
          </a-form-item>

          <!-- 验证错误信息 -->
          <a-form-item :label="`验证错误信息${symbol}`">
            <a-input placeholder="请输入" v-model="list.decorator.rules[0].message"> </a-input>
          </a-form-item>
        </a-form>
        <div v-else>
          <h3>未选择控件</h3>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: "DFormProperty",
  props: {
    property: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      symbol: "：",
    };
  },
  methods: {
    changeKey(key) {
      this.property.key = key;
    },
    selectWidthUnit(value) {
      this.list.widthUnit = value;
      if (value === "%") {
        this.list.width = 100;
      }
    },
    changeCheckboxGroup(e) {
      if (e.indexOf("disabled") !== -1) {
        this.list.disabled = true;
      } else {
        this.list.disabled = false;
      }

      if (e.indexOf("hide") !== -1) {
        this.list.hide = true;
      } else {
        this.list.hide = false;
      }

      if (e.indexOf("clear") !== -1) {
        this.list.clear = true;
      } else {
        this.list.clear = false;
      }

      if (e.indexOf("required") !== -1) {
        this.list.decorator.rules[0].required = true;
      } else {
        this.list.decorator.rules[0].required = false;
      }
    },
  },
  components: {
    Tabs: () => import("@/components/Common/tabs.vue"),
  },
};
</script>