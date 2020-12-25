<template>
  <div class="container">
    <div class="user-info">
      <p class="title">プロフィール</p>
      <p class="username">{{ user.username }}</p>
      <p class="userId">{{ user.userId }}</p>
      <p class="user-twitterId">twitter: @{{ user.twitterId }}</p>
      <p>勝率: {{ winningPercentage }} </p>
      <Button @onClick="toEdit" label="編集する" />
    </div>
    <div>
      <p class="title">過去の戦績登録</p>
      <Button @onClick="toHistory" label="登録する" />
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import { calcWinnigPercentage } from '@/utils/fighter.js'

export default {
  components: {
    Button
  },
  data() {
    return {
      error: '',
      user: {},
      records: [],
      fighters: {}
    }
  },
  mounted() {
    this.user = this.$store.state.user
    this.records = this.$store.state.records
    this.fighters = this.$store.state.fighters
  },
  computed: {
    winningRate(fighter, opponent) {
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