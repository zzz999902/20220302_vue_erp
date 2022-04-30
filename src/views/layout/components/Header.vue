<template>
  <header class="main-header">
    <a-button type="primary" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrum">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: currentRoute[1].name }">{{
            currentRoute[1] ? currentRoute[1].meta.title : ""
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <div>
        欢迎: {{ $store.state.user.username
        }}<a-icon style="paddingleft: 6px" type="down" />
      </div>
      <div @click="logout">退出</div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("changeCollapsed");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
};
</script>
<style lang="less">
.user-info {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
