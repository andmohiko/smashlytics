<template>
  <div class="container">
    <div class="introduction">
      <h2 class="text-2xl py-6 border-b mb-4">
        スマブラ戦績分析ツール Smashlytics
      </h2>
      <div class="goole-login">
        <Button @onClick="login" label="googleでログイン" />
        <p v-if="isLogin" class="text-xl py-4 text-red-700">
          <span>ログイン済みです！</span>
          <span>ホームへGO🏃‍♂️</span>
        </p>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h3 class="text-xl mb-2">できること👍</h3>
        <ul class="text-left">
          <li>◎戦績の記録</li>
          <li>◎記録した戦績を一覧で確認</li>
          <li>◎対戦数・勝率の変化をグラフで表示←new!!</li>
          <li>◎ファイターごとの勝率を計算</li>
          <li>◎期間を絞って勝率の変化を分析</li>
          <li>◎プロフィールの公開</li>
          <li>◎専用部屋の戦績の記録と分析</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h3 class="text-xl mb-4">おすすめな人🙆</h3>
        <ul class="text-left">
          <li>◎苦手な相手・ステージを把握して重点的に対策したい人</li>
          <li>◎対戦の記録を細かくつけたい人</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h3 class="text-xl mb-4">今後追加される機能🚀</h3>
        <ul class="text-left">
          <li>◎戦闘力帯ごとのキャラの使用率</li>
          <li>◎他の人の勝率と比較</li>
        </ul>
      </div>
    </div>
    <div class="goole-login">
      <Button @onClick="login" label="googleでログイン" />
    </div>
    <div class="logout text-gray-500">
      <button @click="logout">googleログアウト</button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/parts/Button.vue'
import { logEvent } from '@/utils/analytics.js'
import Cookies from "universal-cookie"

export default {
  components: {
    Button,
  },
  mounted() {
    if (this.$store.state.user.userId) this.$router.push("/")
    logEvent('viewNew', undefined)
  },
  computed: {
    isLogin() {
      // if (this.$store.state.user.userId) {
      //   this.$router.push("/")
      // }
      return Boolean(this.$store.state.user.userId)
    },
  },
  methods: {
    login() {
      this.$store.dispatch("loginGoogle")
    },
    logout(){
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUid', '')
      this.$store.commit('setIsLogin', false)
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      window.localStorage.clear();
      // logEvent('logoutFromSignup', undefined)
      this.$router.push("/new")
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}
.goole-login {
  margin: 16px 0;
}
.introduction {
  li {
    margin: 4px 0;
  }
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.logout {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: right;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>