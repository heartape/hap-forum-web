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
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/article',
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article/index'),
        meta: { title: '文章阅读', icon: 'article' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'ArticleDetail',
        component: () => import('@/views/article/detail'),
        meta: { title: '详情', icon: 'article-detail' },
        hidden: true
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'publish',
        name: 'ArticlePublish',
        component: () => import('@/views/article/publish'),
        meta: { title: '文章发布', icon: 'article-publish' },
        hidden: true
      }
    ]
  },

  {
    path: '/knowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Knowledge',
      component: () => import('@/views/knowledge/index'),
      meta: { title: '知识分享', icon: 'knowledge' }
    }]
  },

  {
    path: '/topic',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Topic',
        component: () => import('@/views/topic/index'),
        meta: { title: '话题讨论', icon: 'topic' }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'News',
        component: () => import('@/views/news/index'),
        meta: { title: '站内热点', icon: 'news' }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    hidden: true,
    children: [{
      path: 'detail',
      name: 'NewsDetail',
      component: () => import('@/views/news/detail'),
      meta: { title: '热点详情', icon: 'news-detail' }
    }]
  },

  {
    path: '/picture',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Picture',
        component: () => import('@/views/picture/index'),
        meta: { title: '精彩瞬间', icon: 'picture' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '我的链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
