import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";
import "./assets/global.css";

import { registerGlobalComponents } from "@/untils/import";

import { projectAuth } from "./configs/firebase";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    registerGlobalComponents(app);

    app.use(router);

    app.mount("#app");
  }
});
