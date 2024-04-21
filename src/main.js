import {
    createApp
} from "vue";
import App from "./App.vue";
import routes from "./routes";
import "./assets/index.css";
import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import {
    createPinia
} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

app.use(pinia);
app.use(routes);
app.use(VueChartkick);
app.use(VueSweetalert2);
app.mount("#app");