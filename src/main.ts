import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/normalize.css'
import component from '@/utils/registerCom'
// 注册所有图标
import elementIcons from '@/components/SvgIcon/svgicon'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'

// element-plus部分组件样式
import 'element-plus/theme-chalk/src/message.scss'

// 注册store
import { createPinia } from 'pinia'
import { registerStore } from '@/store'

//图标
import '@/assets/iconfont/iconfont.js'

// 颜色选择组件
import ColorPicker from 'colorpicker-v3' // 注册组件
import 'colorpicker-v3/style.css' // 引入样式文件

const app = createApp(App)

//注册使用pinia状态库
app.use(createPinia())
registerStore()

app.use(router)
app.use(component)
app.use(elementIcons)
app.use(ColorPicker)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
