import "babel-polyfill";
import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";


import App from "./App";
import store from "./store";
import router from "./router";
import "./assets/css/icons/iconfont.css";
import "./assets/css/style.scss";
import "./assets/css/mixins.less";
// import '@/icons' // icon
import "@/permission"; // permission control
import * as filters from "./filters";
import request from "@/utils/request";
import bus from "@/utils/eventBus";
import cUpload from "@/components/cUpload/c-upload.vue";
import mixins from "@/mixins";
import VueDraggable from 'vuedraggable'
import Qg from "@/components/Table/qg-index"
import infrastructure from "@/utils/echarts_light/infrastructure"
import medicine from "@/utils/echarts_light/medicine"
import service from "@/utils/echarts_light/service"
import resource from "@/utils/echarts_light/resource"
Vue.prototype.$http = request;
Vue.prototype.$bus = bus;
Vue.prototype.$params = {};
// 变量
Vue.prototype.$infrastructure = infrastructure; // 基建工程
Vue.prototype.$medicine = medicine // 医药医疗
Vue.prototype.$service = service // 公共服务
Vue.prototype.$resource = resource // 能源化工


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import {
//   mockXHR
// } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
for (let i = 6; i <= 30; i++) {
    Vue.component(
        "a" + i,
        require("./views/risk-control/components/template/" + i).default
    );
}
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.use(ElementUI, {
    size: 'medium',
    zIndex: 3000
});
Vue.use(ElementUI);
Vue.use(VueDraggable);
Vue.use(Qg)
Vue.mixin(mixins);
Vue.component("c-upload", cUpload);

//阻止启动生产消息
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    created() {
        let el = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
        document.body.className = el
    }
});
