import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import Identification from "./views/Identification.vue";
import Accueil from "./views/Accueil.vue";
import Post from "./views/Post.vue";
import { createRouter, createWebHistory } from "vue-router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
    faImage,
    faPaperPlane,
    faHeart,
} from "@fortawesome/free-regular-svg-icons";

const pinia = createPinia();

/* add icons to the library */
library.add(faImage, faPaperPlane, faHeart);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/identification",
            name: "Identification",
            component: Identification,
        },
        {
            path: "/accueil",
            name: "Accueil",
            component: Accueil,
        },
        {
            path: "/post",
            name: "DetailPost",
            component: Post,
        },
    ],
});

createApp(App)
    .use(pinia)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
