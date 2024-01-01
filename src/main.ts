import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import UUID from "vue-uuid";

import "./index.css";
import router from "./router";

createApp(App).use(router).use(UUID).mount("#app");
