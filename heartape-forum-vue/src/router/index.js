import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import PersonalCenter from '@/personalCenter'

/**
 * Note: sub-menu only appear when route children.length >= 1
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
    redirect: '/article/recommend',
    children: [
      {
        path: 'article/recommend',
        name: 'article-recommend',
        component: () => import('@/views/article/index'),
        meta: { title: '读书万卷', icon: 'article' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/recommend',
    hidden: true,
    children: [
      {
        path: 'hot',
        name: 'article-hot',
        component: () => import('@/views/article/index'),
        meta: { title: '读书万卷', icon: 'article' }
      },
      {
        path: 'follow',
        name: 'article-follow',
        component: () => import('@/views/article/index'),
        meta: { title: '读书万卷', icon: 'article' }
      },
      {
        path: 'label/:labelId/recommend',
        name: 'article-label-recommend',
        component: () => import('@/views/article/articleInLabel'),
        meta: { title: '读书万卷', icon: 'article' },
        hidden: true
      },
      {
        path: 'label/:labelId/hot',
        name: 'article-label-hot',
        component: () => import('@/views/article/articleInLabel'),
        meta: { title: '读书万卷', icon: 'article' },
        hidden: true
      },
      {
        path: 'label/:labelId/follow',
        name: 'article-label-follow',
        component: () => import('@/views/article/articleInLabel'),
        meta: { title: '读书万卷', icon: 'article' },
        hidden: true
      },
      {
        path: 'search',
        name: 'article-search',
        component: () => import('@/views/article/articleInSearch'),
        meta: { title: '读书万卷', icon: 'article' }
      },
      {
        path: ':articleId',
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
        path: 'recommend',
        name: 'topic-recommend',
        component: () => import('@/views/topic/index'),
        meta: { title: '人生漫谈', icon: 'topic' }
      }
    ]
  },

  {
    path: '/topic',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'hot',
        name: 'topic-hot',
        component: () => import('@/views/topic/index'),
        meta: { title: '人生漫谈', icon: 'topic' }
      },
      {
        path: 'follow',
        name: 'topic-follow',
        component: () => import('@/views/topic/index'),
        meta: { title: '人生漫谈', icon: 'topic' }
      },
      {
        path: 'search',
        name: 'topic-search',
        component: () => import('@/views/topic/topicInSearch'),
        meta: { title: '人生漫谈', icon: 'topic' }
      },
      {
        path: ':topicId',
        name: 'topic-detail',
        component: () => import('@/views/topic/detail'),
        meta: { title: '人生漫谈', icon: 'topic' },
        hidden: true
      },
      {
        path: 'label/:labelId/recommend',
        name: 'topic-label-recommend',
        component: () => import('@/views/topic/topicInLabel'),
        meta: { title: '人生漫谈', icon: 'topic' },
        hidden: true
      },
      {
        path: 'label/:labelId/hot',
        name: 'topic-label-hot',
        component: () => import('@/views/topic/topicInLabel'),
        meta: { title: '人生漫谈', icon: 'topic' },
        hidden: true
      },
      {
        path: 'label/:labelId/follow',
        name: 'topic-label-follow',
        component: () => import('@/views/topic/topicInLabel'),
        meta: { title: '人生漫谈', icon: 'topic' },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/knowledge',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'Knowledge',
  //     component: () => import('@/views/knowledge/index'),
  //     meta: { title: '授人以渔', icon: 'knowledge' }
  //   }]
  // },
  //
  // {
  //   path: '/news',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'News',
  //       component: () => import('@/views/news/index'),
  //       meta: { title: '古今中外', icon: 'news' }
  //     }
  //   ]
  // },

  {
    path: '/personal-center',
    component: PersonalCenter,
    name: 'personal-center',
    redirect: '/personal-center/home',
    children: [
      {
        path: 'home',
        name: 'personal-center-home',
        component: () => import('@/views/personalCenter'),
        meta: { title: '主页', icon: 'topic' }
      },
      {
        path: 'manage',
        name: 'personal-manage',
        meta: { title: '管理', icon: 'topic' },
        children: [
          {
            path: 'content',
            name: 'personal-center-content',
            component: () => import('@/views/personalCenter/ContentManage'),
            meta: { title: '内容管理', icon: 'topic' },
            redirect: '/personal-center/manage/content/all'
          },
          {
            path: 'comment',
            name: 'personal-center-comment',
            component: () => import('@/views/personalCenter/CommentManage'),
            meta: { title: '评论管理', icon: 'topic' },
            redirect: '/personal-center/manage/comment/all'
          }
        ]
      }
    ]
  },

  {
    path: '/personal-center/manage/content',
    name: 'personal-center-content-tap',
    component: PersonalCenter,
    hidden: true,
    children: [
      {
        path: 'all',
        name: 'personal-center-content-all',
        component: () => import('@/views/personalCenter/ContentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'article',
        name: 'personal-center-content-article',
        component: () => import('@/views/personalCenter/ContentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'topic',
        name: 'personal-center-content-topic',
        component: () => import('@/views/personalCenter/ContentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'discuss',
        name: 'personal-center-content-discuss',
        component: () => import('@/views/personalCenter/ContentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'comment',
        name: 'personal-center-content-comment',
        component: () => import('@/views/personalCenter/ContentManage'),
        meta: { categoryPath: true },
        hidden: true
      }
    ]
  },

  {
    path: '/personal-center/manage/comment',
    name: 'personal-center-comment-tap',
    component: PersonalCenter,
    hidden: true,
    children: [
      {
        path: 'all',
        name: 'personal-center-comment-all',
        component: () => import('@/views/personalCenter/CommentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'article',
        name: 'personal-center-comment-article',
        component: () => import('@/views/personalCenter/CommentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'topic',
        name: 'personal-center-comment-topic',
        component: () => import('@/views/personalCenter/CommentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'discuss',
        name: 'personal-center-comment-discuss',
        component: () => import('@/views/personalCenter/CommentManage'),
        meta: { categoryPath: true },
        hidden: true
      },
      {
        path: 'comment',
        name: 'personal-center-comment-comment',
        component: () => import('@/views/personalCenter/CommentManage'),
        meta: { categoryPath: true },
        hidden: true
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
