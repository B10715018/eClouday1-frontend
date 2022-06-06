import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/Abou.vue";
import Callback from "../components/Callback.vue";
import Notes from "../components/Notes.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/callback",
    component: Callback,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
