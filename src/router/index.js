import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: '控制台', elSvgIcon: 'Menu' }
      }
    ]
  },
  {
    path: '/setting-switch',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/setting-switch'),
        name: 'SettingSwitch',
        meta: { title: '设置选项',elSvgIcon: 'Setting' } //, icon: 'example'
      }
    ]
  },     
  {
    path: '/developer',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/developer/index.vue'),
        name: 'developer',
        meta: { title: '开发者管理',elSvgIcon: 'Avatar' } //, icon: 'example'
      }
    ]
  },     
  {
    path:'/router',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'routeManager',
    meta: {
      title: '路由管理',
      icon:'luyouqi'
    },
    children: [
      {
        path: '/router/server/index',
        component: () => import('@/views/server-router/index.vue'),
        name: 'server-router',
        meta: { title: '服务路由',elSvgIcon: 'Switch' } //, icon: 'example'
      },
      {
        path: '/router/filter/index',
        component: () => import('@/views/filter-router/index.vue'),
        name: 'filter-router',
        meta: { title: '过滤路由',icon: 'filter' } //, icon: 'example'
      }
    ]
  },
  {
    path: '/black',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'blackManager',
    meta: {
      title: '黑名单管理',
      icon:'black'
    },
    children: [
      {
        path: '/black/ip/index',
        component: () => import('@/views/black-ip/index.vue'),
        name: 'black-ip',
        meta: { title: 'ip黑名单',icon: 'ip-black' } //, icon: 'example'
      },
      {
        path: '/black/route/index',
        component: () => import('@/views/black-route/index.vue'),
        name: 'black-route',
        meta: { title: '路由黑名单',icon: 'route-black' } //, icon: 'example'
      }
    ]
  },   
  {
    path: '/resubmit',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/resubmit/index.vue'),
        name: 'resubmit',
        meta: { title: '重复提交管理',elSvgIcon:'List' } //, icon: 'example'
      }
    ]
  },
  {
    path: '/content-check',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/content-check/index.vue'),
        name: 'content-check',
        meta: { title: '内容审查管理',elSvgIcon: 'Checked' } //, icon: 'example'
      }
    ]
  }, 
  {
    path: '/current-limiting',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/current-limiting/index.vue'),
        name: 'current-limiting',
        meta: { title: '限流管理',icon:'browser' } //, icon: 'example'
      }
    ]
  },
  /* {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },   */
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'roleIndex',
        component: () => import('@/views/permission'),
        name: 'Permission',
        meta: {
          title: '角色'
          //roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
