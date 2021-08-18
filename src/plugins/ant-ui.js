import Vue from 'vue'
import { Button, Form, Input, Radio, Dropdown, Menu, Icon, TreeSelect, Cascader, Select, Divider, Collapse, Tabs, InputNumber, Checkbox, Tooltip, Modal, Upload, message} from 'ant-design-vue';
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Radio.Group.name, Radio.Group);
Vue.component(Radio.Button.name, Radio.Button);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Icon.name, Icon);
Vue.component(TreeSelect.name, TreeSelect);
Vue.component(TreeSelect.TreeNode.name, TreeSelect.TreeNode);
Vue.component(Cascader.name, Cascader);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Divider.name, Divider);
Vue.component(Collapse.name, Collapse);
Vue.component(Collapse.Panel.name, Collapse.Panel);
Vue.component(Tabs.name, Tabs);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Checkbox.Group.name, Checkbox.Group);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Upload.name, Upload);
Vue.use(Modal);
Vue.prototype.$message = message;
const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2722107_40tpn12xd4q.js', // 在 iconfont.cn 上生成
});
Vue.component('ali-icon', MyIcon);

