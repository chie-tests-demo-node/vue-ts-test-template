
import { createRouter, createWebHistory } from "vue-router"
import routes from './routesMap';
import { isNull } from "@/utils";


export const reidrect = (href: string) => {
  var prefix = process.env.VUE_APP_PBPATH;
  if (isNull(prefix) || prefix === '/') {
    prefix = '';
  }
  window.location.href = `${prefix}${href}`;
}

// const routes = routesConfig;
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router