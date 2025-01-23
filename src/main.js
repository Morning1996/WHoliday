import { createApp } from "vue"; // 來自於套件
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import App from "./App.vue"; // src 資料夾
import router from "./router";
import "bootstrap";

import "./assets/all.scss";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 繁體中文
  validateOnInput: true, // 直接進行驗證
});
setLocale("zh_TW");

const app = createApp(App);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router); // 套用了方法 $route $router

// 掛載 Global 的 VeeValidate 元件
app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.component("VueLoading", Loading);

app.mount("#app");
