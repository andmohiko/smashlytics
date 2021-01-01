<template>
  <div class="container">
    <div class="bg-white shadow-md rounded px-8 pt-2 pb-6 mb-4 flex flex-col w-full text-left">
      <h2 class="title text-center text-gray-800">プロフィール</h2>
      <div class="name pb-4">
        <p class="username text-3xl text-gray-800">{{ user.username }}</p>
        <p class="userId text-xl text-gray-700">{{ user.userId }}</p>
      </div>
      <p class="userId text-base text-gray-700">使用キャラの世界戦闘力</p>
      <div class="fightersInfo">
        <div v-for="record in newestRecordsByFighter" :key="record.id" class="fighter">
          <FighterIcon :fighterId="record.fighterId" size="40px" />
          <span v-if="record.globalSmashPower" class="text-2xl text-gray-800">{{ record.globalSmashPower/10000 }}万</span>
          <span v-else class="text-2xl text-gray-800">--</span>
        </div>
      </div>
      
      <p class="text-xl text-gray-800">{{ calcWinningPercentage(records) }}</p>

      <div v-show="user.twitterId" class="twitter text-gray-700 flex items-center text-lg my-2">
        <svg width="20" height="20" fill="#49A1F2" class="text-white opacity-40">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
        <span class="pl-2">@{{ user.twitterId }}</span>
      </div>
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
        <button @click="toSumHistory">▷ 戦績を一括登録</button>
      </div>
      <br>
      <span class="text-xs">他の記録アプリから移行する際にお使いください。</span>
      <span class="text-xs">相手ファイターごとに勝敗数を入力してください</span>
      <span class="text-xs">(他アプリとこのアプリを行ったり来たりするのはちょっと面倒かもです🙇‍♀️)</span>
      <span class="text-xs">今日の日付で記録されます。</span>
    </div>
  </div>
</template>

<script>
// import { firebase, firestore, serverTimestamp } from '@/plugins/firebase'
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import FighterIcon from '@/components/FighterIcon.vue'
import { calcWinningPercentage } from '@/utils/records.js'

export default {
  components: {
    Button,
    FighterIcon
  },
  data() {
    return {
      error: '',
    }
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
    newestRecordsByFighter() {
      const newestRecords = this.usedFighterIds.map(fighterId => {
        return this.records.filter(record => record.fighterId === fighterId)[0]
      })
      return newestRecords.sort((a, b) => (a.globalSmashPower > b.globalSmashPower ? -1 : 1))
    },
    usedFighterIds() {
      const used = this.records.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used))
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