import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GetMailStatus',
      component: () => import('@/pages/GetMailStatus.vue')
    },
    {
      path: '/admin-store',
      name: 'AdminStore',
      component: () => import('@/pages/AdminStore.vue')
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: () => import('@/pages/AddProduct.vue')
    }

  ]
})
