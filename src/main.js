import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";
import "./assets/global.css";

import { registerGlobalComponents } from "@/untils/import";

const app = createApp(App);

registerGlobalComponents(app);

app.use(router);

app.mount("#app");
