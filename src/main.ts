import "./assets/main.css";
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./Main.vue";
// import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
// app.use(router);
app.mount("#app");
