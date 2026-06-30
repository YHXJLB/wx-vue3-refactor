import { createRouter, createWebHistory } from 'vue-router'

// Define your routes here based on the original app.json pages
// Example placeholders:
const routes = [
  {
    path: '/',
    redirect: '/home' // Redirect root to home
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue') // Assumes HomeView.vue exists
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/CategoryView.vue')
  },
  {
    path: '/order/list',
    name: 'OrderList',
    component: () => import('@/views/OrderListView.vue')
  },
  {
    path: '/chat/list',
    name: 'ChatList',
    component: () => import('@/views/ChatListView.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/MineView.vue')
  },
  // Add more routes as per app.json
  // Note: Sub-packages like pages-player and pages-cs might need dynamic imports
  // or separate route handling depending on the desired web structure.
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
