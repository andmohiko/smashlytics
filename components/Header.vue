<template>
  <div class="header">
    <p class="title"><nuxt-link to="/">すましす</nuxt-link></p>
    <p class="user">{{ user.username }} @{{ user.userId }}</p>
    <nav class="nav">
      <nuxt-link to="/fighters">fighters</nuxt-link>
      <nuxt-link to="/login">login</nuxt-link>
      <nuxt-link to="/signup">signup</nuxt-link>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.user = this.$store.state.user
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