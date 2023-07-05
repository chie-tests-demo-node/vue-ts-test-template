import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import "@/assets/reset.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vant from 'vant'

const app = createApp(App)

app.use(router)
app.use(vant)
app.use(ElementPlus)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}    