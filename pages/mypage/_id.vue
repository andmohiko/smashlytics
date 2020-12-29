<template>
  <div class="container">
    <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col w-full text-left">
      <p class="title text-center">プロフィール</p>
      <p class="username text-xl">{{ user.username }}</p>
      <p class="userId text-xl">{{ user.userId }}</p>
      <p class="user-twitterId text-gray-700">twitter: @{{ user.twitterId }}</p>
      <p>{{ calcWinningPercentage(records) }}</p>
      <!-- <Button @onClick="toEdit" label="編集する" /> -->
    </div>
    <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col w-full text-left">
      <p class="title text-center">戦績管理</p>
      <div v-show="!isLogin" class="pb-20">
        <p class="error text-xl py-2 mb-4 text-red-700">登録するにはログインしてください</p>
        <div class="border-b">
          <button @click="toNew">ログインはこちら</button>
        </div>
      </div>
      <div>
        <button @click="toEditRecords">▷ 登録した戦績を編集・削除</button>
        <button @click="toSumHistory">▷ 戦績を一括登録</button>
      </div>
      <br>
      <span>🚀 coming soon! 🚀</span>
      <span>過去の戦績を日付を指定して登録</span>
      <!-- <Button @onClick="toHistory" label="登録する" /> -->
      <!-- <Button @onClick="toSumHistory" label="一括登録する" /> -->
    </div>
    <!-- <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col w-full">
      <p class="title">ログイン/ログアウト</p>
      <Button @onClick="login" label="googleでログイン" />
      <br>
      <Button @onClick="logout" label="ログアウト" />
    </div> -->
    <div class="logout text-gray-500">
      <button @click="logout">googleログアウト</button>
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import { calcWinningPercentage } from '@/utils/records.js'
import Cookies from "universal-cookie"

export default {
  components: {
    Button
  },
  data() {
    return {
      error: '',
    }
  },
  mounted() {
    const cookie = new Cookies()
    const value = cookie.get('smash_access_token')
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isLogin() {
      return Boolean(this.user.userId)
    },
    records() {
      return this.$store.state.records
    },
    winningRate(fighter, opponent) {
      console.log(this.records)
      return
      if (this.records === {}) return 'no data'
      const fighterRecords = this.records.filter(record => record.fighter === fighter)
      const opponentRecords = this.records.filter(record => record.opponent === opponent)
      const wins = fighterRecords.filter(record => record.result).length
      const loses = opponentRecords.filter(record => !record.result).length
      return wins + '勝' + loses + '敗 (' + (wins / (wins + loses)) +  '%'
    },
    usedFighter() {
      return new Set(this.records.map(record => {
        return record.fighter
      }))
    },
    battledPair() {
      return new Set(this.records.map(record => {
        return {}
      }))
    },
    winningPercentage() {
      return calcWinnigPercentage(this.records)
    }
  },
  methods: {
    toEdit () {
      this.$router.push("/edit")
    },
    toHistory () {
      this.$router.push("/history")
    },
    toSumHistory () {
      this.$router.push("/sumhistory")
    },
    login() {
      this.$store.dispatch('loginGoogle')
    },
    logout() {
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      this.$router.push("/new")
    },
    toNew() {
      this.$router.push("/new")
    },
    calcWinningPercentage
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
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