import Vue from 'vue'
import Router from 'vue-router'

// page import
import Admin from '@/pages/Admin'
import Index from '@/pages/Index'
import IndexHome from '@/pages/IndexHome'
import IndexLogin from '@/pages/IndexLogin'
import IndexMenu from '@/pages/IndexMenu'
import IndexRegister from '@/pages/IndexRegister'
import IndexItem from '@/pages/IndexItem'
import IndexCheckout from '@/pages/IndexCheckout'
import IndexReservation from '@/pages/IndexReservation'
import IndexOrders from '@/pages/IndexOrders'

// component import
import AdminLogin from '@/components/admin/AdminLogin'
import AdminItems from '@/components/admin/AdminItems'
import AdminOrders from '@/components/admin/AdminOrders'
import AdminCategories from '@/components/admin/AdminCategories'
import AdminReservation from '@/components/admin/AdminReservation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        { path: '/', name: 'index-home', component: IndexHome },
        { path: '/login', name: 'index-login', component: IndexLogin },
        { path: '/register', name: 'index-register', component: IndexRegister },
        { path: '/menu', name: 'index-menu', component: IndexMenu },
        { path: '/menu/:item', name: 'index-item', component: IndexItem, props: true },
        { path: '/checkout', name: 'index-checkout', component: IndexCheckout },
        { path: '/reservation', name: 'index-reservation', component: IndexReservation },
        { path: '/orders', name: 'index-orders', component: IndexOrders },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
          { path: 'login', component: AdminLogin },
          { path: 'items', component: AdminItems },
          { path: 'orders', component: AdminOrders },
          { path: 'categories', component: AdminCategories },
          { path: 'reservation', component: AdminReservation }
      ]
    },
  ]
})
