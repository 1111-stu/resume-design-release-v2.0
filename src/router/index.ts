import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Design = () => import('@/view/design/index.vue')
const Index = () => import('@/view/index/index.vue')
const Custom = () => import('@/view/custom/index.vue')
const Chat = () => import('@/view/chat/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireLogin: false
    },
    component: Index
  },
  {
    path: '/design',
    name: 'Design',
    meta: {
      title: '设计',
      keepAlive: true,
      requireLogin: true
    },
    component: Design
  },
  {
    path: '/custom',
    name: 'Custom',
    meta: {
      title: '自定义',
      keepAlive: true,
      requireLogin: true
    },
    component: Custom
  },
  {
    path: '/chat',
    name: 'Chat',
    meta: {
      title: '简历助手',
      keepAlive: true,
      requireLogin: true
    },
    component: Chat
  }
]
// const routerHistory = createWebHistory('/');
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
