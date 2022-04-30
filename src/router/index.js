import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/views/layout/Home.vue';// 包含侧边栏和头部的组件
import getMenuRoutes from '@/utils/permission';

Vue.use(VueRouter);

// 具有权限的路由
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('@/views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
      hidden: false,
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];
// 任何角色都有权展示的路由
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: '/index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'number',
        hidden: false,
      },
      component: () => import('@/views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/layout/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// 路由拦截（路由守卫）拦截没登录用户直接跳转主页
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      // 对于角色权限判断，展示有权限的路由
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
        // 等待它完成再添加路由跳转页面
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes))
          .then(() => {
            router.addRoute(...menuRoutes);
            next();
          });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
