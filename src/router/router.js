import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
