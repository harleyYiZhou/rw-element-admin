import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'     adminDashboard          the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/active',component: ()=> import('@/views/active/index'),hidden:true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    meta: {
      title: 'system',
      icon: 'system'
    }, children: [
      {
        path: 'permission',
        component: () => import('@/views/permission/index'),
        meta: {
          title: 'permission',
          icon: 'permission'
        },
        children: [
          {
            path: 'user',
            component: () => import('@/views/permission/user'),
            name: 'user',
            meta: {
              title: 'user'
            }
          },
          {
            path: 'roles',
            component: () => import('@/views/permission/roles'),
            name: 'roles',
            meta: {
              title: 'roles'
            }
          },
          {
            path: 'permission',
            component: () => import('@/views/permission/permission'),
            name: 'permission',
            meta: {
              title: 'permission'
            }
          },
          {
            path: 'rules',
            component: () => import('@/views/permission/rules'),
            name: 'rules',
            meta: {
              title: 'rules'
            }
          }
        ]
      },
      {
        path: 'menu',
        component: () => import('@/views/menu/index'),
        name: 'menu',
        meta: {
          title: 'menu', icon: 'menu'
        }
      }
    ]
  },
  {
    path: '/iframe',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'iframe',
        component: ()=>import('@/views/iframe/index'),
        meta: {
          title: 'iframe',icon: 'iframe'
        }
      }
    ]
  }
]
