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
          <li>
            <nuxt-link to="/arena">戦績の登録</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/arenaAnalyticsBeta">戦績の分析</nuxt-link>
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
          <h3 class="text-base">Ver 3.5.0</h3>
          <ul class="text-sm">
            <li>◎分析で日付を指定して期間を絞り込む機能を追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.6</h3>
          <ul class="text-sm">
            <li>◎ステージ選択にカロスポケモンリーグを追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.5</h3>
          <ul class="text-sm">
            <li>◎ログインできない不具合を修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.4</h3>
          <ul class="text-sm">
            <li>◎マイページに今週の世界戦闘力の変動を表示</li>
            <li>◎マイページに各キャラの総合勝率を表示</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.3</h3>
          <ul class="text-sm">
            <li>◎エラー通知の追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.2</h3>
          <ul class="text-sm">
            <li>◎ラジオボタンのデザイン変更</li>
            <li>◎専用部屋の分析で期間が絞り込まれない不具合を修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.1</h3>
          <ul class="text-sm">
            <li>◎専用部屋の戦績を編集できない不具合を修正</li>
            <li>◎分析で期間を絞り込む選択肢に「本日」を追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.4.0</h3>
          <ul class="text-sm">
            <li>◎戦績登録時にストック数を入力欄を追加</li>
            <li>◎その他デザインの修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.3.0</h3>
          <ul class="text-sm">
            <li>◎分析をより詳細に設定できる機能の追加</li>
            <li>◎分析で自分のファイターで絞る機能の追加</li>
            <li>◎その他デザインの修正</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.2.0</h3>
          <ul class="text-sm">
            <li>◎分析で類似ファイターをまとめる機能を追加</li>
            <li>◎専門部屋の戦績登録で直前の相手の名前を直接選択できる機能を追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.1.0</h3>
          <ul class="text-sm">
            <li>◎専用部屋の分析機能(β版)を追加</li>
          </ul>
        </div>
        <div class="version text-left mb-4">
          <h3 class="text-base">Ver 3.0.0</h3>
          <ul class="text-sm">
            <li>◎専用部屋の戦績記録機能を追加</li>
          </ul>
        </div>
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
      <Button @onClick="logout" label="ログアウト" />
      <div class="flex justify-end text-sm text-gray-500 pt-6 pr-2">
        Version 4.0.1
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