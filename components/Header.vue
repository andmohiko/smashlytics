<template>
  <div class="header">
    <p class="page-title">{{ pageTitle }}</p>
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
  },
  computed: {
    routename() {
      return this.$route.name
    },
    pageTitle() {
      switch (this.routename) {
        case 'records': {
          return '戦績一覧'
        }
        case 'analytics': {
          return '分析'
        }
        case 'mypage-id': {
          return 'マイページ'
        }
        case 'edit': {
          return 'プロフィール編集'
        }
        case 'fighters': {
          return 'ファイター追加'
        }
        case 'login': {
          return 'ログイン'
        }
        case 'signup': {
          return 'ユーザ登録'
        }
        default: {
          return 'すましす'
        }
      }
    }
  },
  methods: {
    route() {
      console.log(this.$route.name)
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  width: 100%;
  background-color: rgba(255, 255, 80, 0.8);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 24px;
  color: black;
  margin-left: 40px;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #4a5568d9;
}
.nav {
  display: flex;
  // width: 300px;
  justify-content: space-between;
  align-items: center;
  margin-right: 40px;
}
</style>