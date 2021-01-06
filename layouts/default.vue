<template>
  <div>
    <Header />
    <div class="main">
      <nuxt />
      <!-- <div class="maintenance">
        <h2 class="text-2xl">ただいまメンテナンス中です。</h2>
        <h2 class="text-2xl">しばらくお待ちくださいm(_ _)m</h2>
      </div> -->
    </div>
    <Footer />

    <template v-if="notice.noticeType">
      <Notice />
    </template>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Notice from '@/components//Notice.vue'

export default {
  components: {
    Header,
    Footer,
    Notice
  },
  // mounted() {
  //   this.$store.commit('setNotice', {
  //     noticeType: 'error',
  //     message: 'ふぁlせ'
  //   })
  // },
  computed: {
    notice() {
      return this.$store.state.notice
    }
  }
}
</script>

<style lang="scss">
.main {
  margin-top: 60px;
  margin-bottom: 70px;
  min-height: calc(100vh - 130px);
  max-width: 100vw;
}

.maintenance {
  margin: 0 auto;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 400px;
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
