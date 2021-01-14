<template>
  <div class="container">
    <div class="settings">
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">お問い合わせ</h2>
        <ul class="text-left">
          <li>
            お問い合わせフォームは
            <a href="https://forms.gle/jbcq53PqTzPotSU96" target="_blank">
              こちら
              <i class="material-icons text-base text-gray-700">open_in_new</i>
            </a>
          </li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">利用規約</h2>
        <ul class="text-left">
          <li>
            利用規約は
            <a class="" @click="openTermsPage">
              こちら
              <i class="material-icons text-base text-gray-700">open_in_new</i>
            </a>
          </li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">今後追加予定の機能🚀</h2>
        <ul class="text-left">
          <li>◎勝率の変化をグラフで表示</li>
          <li>◎過去の戦績を日付を指定して登録</li>
          <li>◎戦闘力帯ごとのファイターの割合</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">Release notes</h2>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 2.1.0</h3>
          <ul class="text-sm">
            <li>◎戦績編集時の勝率のずれを修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 2.0.0</h3>
          <ul class="text-sm">
            <li>開発者の大きな過ちを修正しました。</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 1.0.0</h3>
          <ul class="text-sm">
            <li>公開しました！！！！！</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 0.5.0</h3>
          <ul class="text-sm">
            <li>◎戦績の記録項目に連戦かどうかとVIPマッチかどうかを追加</li>
            <li>◎プロフィールに主なプレイ時間・使用ボイチャを追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 0.4.0</h3>
          <ul class="text-sm">
            <li>◎プロフィールの公開</li>
            <li>◎マイページに使用キャラの最新世界戦闘力を表示</li>
            <li>◎日付/時間表示のバグ修正</li>
            <li>◎プロフィールの編集機能</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 0.3.0</h3>
          <ul class="text-sm">
            <li>◎ステージごとの勝率の確認</li>
            <li>◎分析の並べ替えで逆順を追加</li>
            <li>◎ログイン状態の保持</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 0.2.0</h3>
          <ul class="text-sm">
            <li>◎戦績の編集・削除</li>
            <li>◎戦績の一括登録</li>
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
      <div class="logout text-gray-500">
        Version 2.0.0
      </div>
      <div class="copyright">
        <p>
          <small>© 2020 andmohiko</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/parts/Button.vue'
import { logEvent } from '@/utils/analytics.js'

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
      this.$store.commit('setUid', '')
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      this.$store.commit('setIsLogin', false)
      window.localStorage.clear();
      logEvent('logoutFromSettings', undefined)
      this.$router.push("/new")
    },
    toAllRecords() {
      this.$router.push("/allRecords")
    },
    openTermsPage() {
      logEvent('view_terms', undefined)
      window.open('https://www.notion.so/874f7e1046f94d959b61025c2f663ecd')
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
a {
  color: #166af2;
  border-bottom: solid 1px #166af2;
}
</style>