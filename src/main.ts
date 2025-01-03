import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import utils from './utils'
import 'normalize.css/normalize.css'
import '@/assets/styles/index.less'
import elementConfig from './utils/widgets/elementConfig'
import { createPinia } from 'pinia'
import I18n from '@/languages/index'

const pinia = createPinia()
const app = createApp(App)

elementConfig.components.forEach((component) => {
  if (component.name) {
    app.component(component.name, component)
  }
})

elementConfig.plugins.forEach((plugin) => {
  app.use(plugin)
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  // .use(store)
  .use(pinia)
  .use(router)
  .use(utils)
  .use(I18n)
  .use(ElementPlus)
  .mount('#app')
