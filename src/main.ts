import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/normalize.css'
import component from '@/utils/registerCom'
import '@/style/global.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册所有图标
import elementIcons from '@/components/SvgIcon/svgicon'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'

// 注册store
import { createPinia } from 'pinia'
import { registerStore } from '@/store'

//图标
import '@/assets/iconfont/iconfont.js'

const app = createApp(App)

//注册使用pinia状态库
app.use(createPinia())
registerStore()

app.use(router)
app.use(component)
app.use(ElementPlus)
app.use(elementIcons)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
