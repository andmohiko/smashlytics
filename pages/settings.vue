<template>
  <div class="container">
    <div class="settings">
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">お問い合わせ</h2>
        <ul class="text-left">
          <li>coming soon</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">今後追加予定の機能🚀</h2>
        <ul class="text-left">
          <li>◎プロフィールの公開</li>
          <li>◎勝率の変化をグラフで表示</li>
          <li>◎過去の戦績を日付を指定して登録</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">Release notes</h2>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 0.3.0</h3>
          <ul class="text-sm">
            <li>◎ステージごとの勝率の確認</li>
            <li>◎分析の並べ替えで逆順を追加</li>
          </ul>
        </div>
        <h2 class="text-xl mb-4">Release notes</h2>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 0.2.0</h3>
          <ul class="text-sm">
            <li>◎戦績の編集・削除</li>
            <li>◎戦績の一括登録</li>
            <li>◎ファイターごとの勝率をステージごとに確認</li>
            <li>◎未ログインで戦績を記録できてしまうバグの修正</li>
          </ul>
        </div>
        <div class="version text-left">
          <h3 class="text-base">Ver 0.1.0</h3>
          <ul class="text-sm">
            <li>◎ログイン機能</li>
            <li>◎戦績の登録</li>
            <li>◎期間ごとの勝率の確認</li>
          </ul>
        </div>
      </div>
      <div v-show="isAdmin" class="logout text-gray-500">
        <button @click="toAllRecords">管理者用 全戦績</button>
      </div>
      <Button @onClick="logout" label="ログアウト" />
      <div class="copyright">
      <p>
        <small>© 2020 andmohiko</small>
      </p>
    </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Cookies from "universal-cookie"

export default {
  components: {
    Button
  },
  mounted() {
    const cookie = new Cookies()
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userId === 'andmohiko'
    }
  },
  methods: {
    logout() {
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      window.localStorage.clear();
      this.$router.push("/new")
    },
    toAllRecords() {
      this.$router.push("/allRecords")
    }
  }
}
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
}
.goole-login {
  margin: 16px 0;
}
.settings {
  li {
    margin: 4px 0;
  }
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
.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    line-height: 40px;
    color: #bbb;
    font-size: 12px;
  }
}
</style>