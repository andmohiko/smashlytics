<template>
  <div class="container">
    <div class="bg-white shadow-md rounded px-8 pt-8 pb-6 mb-4 flex flex-col w-full text-left">
      <div class="name pb-4">
        <p class="username text-base text-gray-800">ユーザは見つかりませんでした(´・ω・｀)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { calcWinningPercentage } from '@/utils/records.js'
import { getUser } from '@/repositories/users.js'

export default {
  data() {
    return {
      error: ''
    }
  },
  async asyncData({ route, state }) {
    if (route.path.slice(1) === state.user.userId) return { user: state.user }
    return { user: getUser(route.path.slice(1))}
  },
  mounted() {
    console.log('path', this.$route.path.slice(1))
    console.log(getUser(this.$route.path.slice(1)))
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isLogin() {
      return Boolean(this.user.userId)
    },
    isOwnPage() {
      return (this.user.userId === this.$route.path)
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
    usedFighterIds() {
      const used = this.records.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used))
    },
    newestRecordsByFighter() {
      const newestRecords = this.usedFighterIds.map(fighterId => {
        return this.records.filter(record => record.fighterId === fighterId)[0]
      })
      return newestRecords.sort((a, b) => (a.globalSmashPower > b.globalSmashPower ? -1 : 1))
    }
  },
  methods: {
    toEdit () {
      this.$router.push("/mypage/edit")
    },
    toHistory () {
      this.$router.push("/history")
    },
    toSumHistory () {
      this.$router.push("/mypage/sumhistory")
    },
    login() {
      this.$store.dispatch('loginGoogle')
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
  // width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
@media screen and (min-width: 800px) {
  .container {
    width: 400px;
  }
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.profile-icon {
  display: flex;
  img {
    height: 120px;
    width: 120px;
    border: solid 4px #579aff;
    border-radius: 50%;
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
.edit {
  margin-top: 16px;
}
.fightersInfo {
  display: flex;
  flex-direction: column;
  position: relative;
  left: -10px;
  margin-bottom: 10px;
  .fighter {
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 60px 1fr;
    align-items: center;
  }
}
</style>