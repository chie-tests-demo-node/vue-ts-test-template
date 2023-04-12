
import { createRouter, createWebHistory } from "vue-router"
import routesConfig from './routes';

const routes = routesConfig;
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router