import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Arch from "../views/Arch.vue";
import Billing from "../views/Billing.vue";
import Callback from "../components/Callback.vue";
import Notes from "../components/Notes.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Home
  },
  {
    path: "/notes",
    name: "Support Services",
    component: Notes,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/notes",
    name: "Automation",
    component: Notes,
  },
  {
    path: "/about",
    name: "Architecture",
    component: About,
    children: [
      {name: 'AWS', path: '/about', component: About},
      {name: 'Azure', path: '2', component: Notes},
      {name: 'GCP', path: '2', component: Notes},
    ],
  },
  {
    path: "/arch",
    name: "Arch",
    component: Arch,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
