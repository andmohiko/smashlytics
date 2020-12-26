<template>
  <div class="container">
    <div class="user-info">
      <p class="title">プロフィール</p>
      <p class="username">{{ user.username }}</p>
      <p class="userId">{{ user.userId }}</p>
      <p class="user-twitterId">twitter: @{{ user.twitterId }}</p>
      <!-- <p>勝率: {{ winningPercentage }} </p> -->
      <Button @onClick="toEdit" label="編集する" />
    </div>
    <div>
      <p class="title">過去の戦績登録</p>
      <Button @onClick="toHistory" label="登録する" />
    </div>
    <div>
      <p class="title">ログイン・ログアウト</p>
      <Button @onClick="login" label="googleでログイン" />
      <Button @onClick="logout" label="ログアウト" />
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import { calcWinnigPercentage } from '@/utils/fighter.js'
import Cookies from "universal-cookie"

export default {
  components: {
    Button
  },
  data() {
    return {
      error: '',
      // user: {},
      // records: [],
      fighters: {}
    }
  },
  mounted() {
    // this.user = this.$store.state.user
    // this.records = this.$store.state.records
    this.fighters = this.$store.state.fighters
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
      if (this.records === {}) return 'あああ'
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
    login() {
      this.$store.dispatch('loginGoogle')
    },
    logout() {
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', {})
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
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
</style>