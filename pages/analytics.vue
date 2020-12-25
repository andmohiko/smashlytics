<template>
  <div class="container">
    <div class="block">
      <p class="title">Analytics coming soon!</p>
      <p>updating features</p>
      <p>results by character</p>
      <p>WoW, MoM</p>
    </div>
    <div class="winning-percentage">
      <p class="title">キャラごとの勝率</p>
      <form class="mb-4 px-4">
        <div class="input">
          <label class="block mt-4">
            <span class="text-gray-700">Select Period(days)</span>
            <select v-model="period" class="form-select block w-full mt-1">
              <option>1</option>
              <option>7</option>
              <option>30</option>
            </select>
          </label>
        </div>
      </form>
      {{ recordsPeriod.length }}, {{ records.length }}
      <div class="winning-percentage-fighter">
        <div v-for="opponent in fightedFighters" :key="opponent.id">
          Roy, {{ opponent }}, {{ calcWinningPercentage(opponent) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timestamp2date, now, today } from '@/utils/date.js'
import { calcWinnigPercentage } from '@/utils/fighter.js'

export default {
  data() {
    return {
      records: [],
      period: 1,
      now: now(),
      today: today()
    }
  },
  mounted() {
    this.records = this.$store.state.records
  },
  computed: {
    usedFighters() {
      const used = this.recordsPeriod.map(record => {
        return record.fighter
      })
      return Array.from(new Set(used))
    },
    fightedFighters() {
      const fighted = this.recordsPeriod.map(record => {
        return record.opponent
      })
      return Array.from(new Set(fighted))
    },
    winningPercentage(opponent) {
      const fighter = 'Roy'
      console.log(fighter, opponent)
      const specificRecords = this.getRecordsByFighters(fighter, opponent)
      console.log(specificRecords)
      return this.calcWinningPercentage(fighter, opponent)
    },
    recordsPeriod() {
      return this.$store.state.records.filter(record => this.inPeriod(record.createdAt, this.period))
    }
  },
  methods: {
    getRecordsByFighters(fighter, opponent) {
      return this.recordsPeriod.filter(record => {
        return record.fighter === fighter && record.opponent === opponent
      })
    },
    calcWinningPercentage(opponent) {
      const fighter = 'Roy'
      const specificRecords = this.getRecordsByFighters(fighter, opponent)
      return calcWinnigPercentage(specificRecords)
    },
    inPeriod(timestamp, period) {
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return timestamp2date(timestamp) > targetDate
    },
    timestamp2date
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.block {
  margin: 20px 0;
  .title {
    font-size: 20px;
  }
}
</style>
