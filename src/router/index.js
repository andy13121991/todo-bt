// Import Vue and VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

// Import views for each route
import HomeView from '../views/HomeView.vue'

// Use VueRouter plugin
Vue.use(VueRouter)

// Define routes for different views with two different ways
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/important',
    name: 'important',
    component: () => import('../views/ImportantView.vue')
  },
  {
    path: '/planned',
    name: 'planned',
    component: () => import('../views/PlannedView.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/TasksView.vue')
  },
  {
    path: '/shoplist',
    name: 'shoplist',
    component: () => import('../views/ShopListView.vue')
  }
]

// Create a new VueRouter instance
const router = new VueRouter({
  mode: 'history', // Use history mode for cleaner URLs
  routes
})

// Export the router instance
export default router
