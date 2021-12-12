import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/article/publish',
    name: 'article-publish',
    component: () => import('@/views/article/publish'),
    hidden: true
  },

  {
    path: '/topic/publish',
    name: 'topic-publish',
    component: () => import('@/views/topic/publish'),
    hidden: true
  },

  {
    path: '/knowledge/publish',
    name: 'knowledge-publish',
    component: () => import('@/views/knowledge/publish'),
    hidden: true
  },

  {
    path: '/news/publish',
    name: 'news-publish',
    component: () => import('@/views/news/publish'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/article/hot',
    children: [
      {
        // todo:设计一个主页代替'/article/hot'
        path: 'article/hot',
        name: 'article-hot',
        component: () => import('@/views/article/index'),
        meta: { title: '读书万卷', icon: 'article' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/hot',
    hidden: true,
    children: [
      {
        path: 'sort',
        name: 'article-sort',
        component: () => import('@/views/article/sort'),
        meta: { title: '读书万卷', icon: 'article' },
        hidden: true
      },
      {
        path: 'sort/:sortId/hot',
        name: 'article-sort',
        component: () => import('@/views/article/articleInSort'),
        meta: { title: '读书万卷', icon: 'article' },
        hidden: true
      },
      {
        path: ':aid',
        name: 'article-detail',
        component: () => import('@/views/article/detail'),
        meta: { title: '读书万卷', icon: 'article' },
        hidden: true
      }
    ]
  },

  {
    path: '/topic',
    component: Layout,
    children: [
      {
        path: 'hot',
        name: 'topic',
        component: () => import('@/views/topic/index'),
        meta: { title: '人生漫谈', icon: 'topic' }
      }
    ]
  },

  {
    path: '/topic',
    component: Layout,
    children: [
      {
        path: ':tid',
        name: 'topic-detail',
        component: () => import('@/views/topic/detail'),
        meta: { title: '人生漫谈', icon: 'topic' },
        hidden: true
      }
    ]
  },

  {
    path: '/topic/:tid/discuss',
    component: Layout,
    children: [
      {
        path: ':did',
        name: 'topic-discuss',
        component: () => import('@/views/topic/discuss'),
        meta: { title: '人生漫谈', icon: 'topic' },
        hidden: true
      }
    ]
  },

  {
    path: '/knowledge',
    component: Layout,
    children: [{
      path: '',
      name: 'Knowledge',
      component: () => import('@/views/knowledge/index'),
      meta: { title: '授人以渔', icon: 'knowledge' }
    }]
  },

  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: '',
        name: 'News',
        component: () => import('@/views/news/index'),
        meta: { title: '古今中外', icon: 'news' }
      }
    ]
  },

  {
    path: '/travel',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Travel',
        component: () => import('@/views/travel/index'),
        meta: { title: '行万里路', icon: 'travel' }
      }
    ]
  },

  {
    path: '/introduce',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Introduce',
        component: () => import('@/views/Introduce'),
        meta: { title: '南阳布衣', icon: 'introduce' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
