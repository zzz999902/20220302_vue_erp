import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 收缩侧边栏按钮
    collapsed: false,
    // 用户信息
    user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    // 收缩侧边栏按钮方法
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    // 删除用户信息
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    // 存储菜单的路由
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
});
