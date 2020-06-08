import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  FormItem,
  Select,
  Option,
  Divider,
  Icon,
  Switch,
  Container,
  Header,
  Main,
  Tabs,
  TabPane,
  Input,
  Tooltip,
  Popover,
  Menu,
  Submenu,
  MenuItem,
  Tag,
  Loading,
  Message,
  Image,
  MenuItemGroup,
  Link
} from 'element-ui';
Vue.use(Link);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
