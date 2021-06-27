<template>
  <div class="container pt-2">
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
        <h2 class="text-xl mb-4">専用部屋の機能</h2>
        <ul class="text-left">
          <li class="pb-2">
            ✏️<nuxt-link to="/arena">戦績の登録</nuxt-link>
          </li>
          <li>
            🔍<nuxt-link to="/arenaAnalyticsBeta">戦績の分析</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">今後追加予定の機能🚀</h2>
        <ul class="text-left">
          <li>◎他の人のファイターごとの勝率</li>
          <li>◎過去の戦績を日付を指定して登録</li>
          <li>◎戦闘力帯ごとのファイターの割合</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h2 class="text-xl mb-4">Release notes</h2>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.8</h3>
          <ul class="text-sm">
            <li>◎モーダル表示時に背景を固定するようにしました</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.7</h3>
          <ul class="text-sm">
            <li>◎ユーザ登録できない不具合を修正しました</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.6</h3>
          <ul class="text-sm">
            <li>◎リリースノートを別ページにまとめました</li>
            <li>◎その他軽微なデザイン修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.5</h3>
          <ul class="text-sm">
            <li>◎1日30戦以上記録した際に、当日の勝敗数が直近30戦分しか数えられない不具合の修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.4</h3>
          <ul class="text-sm">
            <li>◎軽微なデザイン修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.3</h3>
          <ul class="text-sm">
            <li>◎勝率グラフの縦軸を0-100に固定</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.2</h3>
          <ul class="text-sm">
            <li>◎デフォルトで表示する戦績数を30件に変更</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.1</h3>
          <ul class="text-sm">
            <li>◎専用部屋機能のメニューを設定画面に追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 4.0.0</h3>
          <ul class="text-sm">
            <li>◎グラフ機能の追加</li>
            <li>◎1週間の対戦数・勝ち数をグラフで表示</li>
            <li>◎1週間の所立の変化をグラフで表示</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          Ver 4.0.0以前は<nuxt-link to="/release-notes">こちら</nuxt-link>
        </div>
      </div>
      <Button @onClick="logout" label="ログアウト" />
      <div class="flex justify-end text-sm text-gray-500 pt-6 pr-2">
        Version 4.0.8
      </div>
      <div class="copyright">
        <p>
          <small>© 2021 andmohiko</small>
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
    // const cookie = new Cookies()
    if (!this.$store.state.user.userId) this.$router.push("/new")
  },
  methods: {
    logout() {
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUid', '')
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      this.$store.commit('setIsLogin', false)
      this.$store.commit('setVersion', {
        versionNumber: 0,
        refreshedAt: null
      })
      window.localStorage.clear();
      logEvent('logoutFromSettings', undefined)
      this.$router.push("/new")
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
.settings {
  li {
    margin: 4px 0;
  }
}
.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    line-height: 30px;
    color: #bbb;
    font-size: 12px;
  }
}
a {
  color: #166af2;
  border-bottom: solid 1px #166af2;
}
</style>