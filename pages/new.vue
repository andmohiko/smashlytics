<template>
  <div class="container">
    <div class="introduction">
      <h2 class="text-2xl py-6 border-b mb-4">
        スマブラ戦績分析ツール Smashlytics
      </h2>
      <div v-show="isLogin" class="goole-login">
        <Button @onClick="login" label="googleでログイン" />
        <!-- <p v-show="isLogin" class="text-xl py-4 text-red-700">
          <span>ログイン済みです！</span>
          <span>ホームへGO🏃‍♂️</span>
        </p> -->
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h3 class="text-xl mb-2">できること👍</h3>
        <ul class="text-left">
          <li>◎戦績の記録</li>
          <li>◎記録した戦績を一覧で確認</li>
          <li>◎ファイターごとの勝率を計算</li>
          <li>◎期間を絞って勝率の変化を分析</li>
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h3 class="text-xl mb-4">おすすめな人🙆</h3>
        <ul class="text-left">
          <li>◎苦手な相手・ステージを把握して重点的に対策したい人</li>
          <li>◎対戦の記録を細かくつけたい人</li>
          <!-- <li>◎ク○メイトが重くて使いづらいと思ってる人(小声)</li> -->
        </ul>
      </div>
      <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col">
        <h3 class="text-xl mb-4">今後追加される機能🚀</h3>
        <ul class="text-left">
          <li>◎専用部屋の戦績の記録</li>
          <li>◎戦闘力帯ごとのキャラの使用率</li>
          <li>◎他の人の勝率と比較</li>
        </ul>
      </div>
    </div>
    <div class="goole-login">
      <Button @onClick="login" label="googleでログイン" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/parts/Button.vue'
export default {
  components: {
    Button,
  },
  computed: {
    isLogin() {
      if (this.$store.state.user.userId) {
        this.$router.push("/")
      }
      return Boolean(this.$store.state.user.userId)
    },
  },
  methods: {
    login() {
      this.$store.dispatch("loginGoogle")
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
</style>