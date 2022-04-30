<template>
  <div class="home">
    <!-- 侧边栏 -->
    <Menu :key="key" />
    <!-- 右边区域 -->
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <!-- 头部 -->
      <Header />
      <!-- 路由匹配区域 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Menu from "./components/Menu.vue";

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    Menu,
    Header,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
