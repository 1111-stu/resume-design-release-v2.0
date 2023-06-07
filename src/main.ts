import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/style/normalize.css'
// import component from '@/utils/registerCom';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册所有图标
import elementIcons from '@/components/SvgIcon/svgicon'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'

//图标
import '@/assets/iconfont/iconfont.js'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(elementIcons)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
