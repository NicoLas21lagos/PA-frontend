import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import NotasPage from "@/pages/NotasPage.vue"



const routes = [
  { path: "/", component: LoginPage },
  { path: "/notas", component: NotasPage },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
