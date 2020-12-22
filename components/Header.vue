<template>
  <div class="header">
    <p class="title">すましす</p>
    <nav class="nav">
      <nuxt-link to="/">top</nuxt-link>
      <nuxt-link to="/mypage">mypage</nuxt-link>
      <nuxt-link to="/login">login</nuxt-link>
      <nuxt-link to="/signup">signup</nuxt-link>
    </nav>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 80px;
  width: 100%;
  background-color: rgba(255, 255, 80, 0.9);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 24px;
  color: black;
  margin-left: 40px;
}
.nav {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  margin-right: 40px;
}
</style>