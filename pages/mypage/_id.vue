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
    <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col w-full">
      <p class="title">過去の戦績登録</p>
      <span>coming soon!</span>
      <!-- <Button @onClick="toHistory" label="登録する" />
      <Button @onClick="toSumHistory" label="一括登録する" /> -->
    </div>
    <!-- <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col w-full">
      <p class="title">ログイン/ログアウト</p>
      <Button @onClick="login" label="googleでログイン" />
      <br>
      <Button @onClick="logout" label="ログアウト" />
    </div> -->
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
      this.$store.commit('setRecords', {})
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
</style>