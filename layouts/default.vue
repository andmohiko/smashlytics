<template>
  <div>
    <Header />
    <div class="main">
      <nuxt />
    </div>
    <Footer v-show="isLogin" />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    isLogin() {
      return Boolean(this.$store.state.uid)
    },
  }
}
</script>

<style>
.main {
  margin-top: 60px;
  margin-bottom: 70px;
  min-height: calc(100vh - 130px);
  max-width: 100vw;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
