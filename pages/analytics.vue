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
      {{ recordsByPeriod.length }}, {{ records.length }}
      <div class="winning-percentage-fighter">
        <div v-for="fighter in usedFighters" :key="fighter.id">
          <div v-for="opponent in fightedFighters" :key="opponent.id">
            {{ fighter }}, {{ opponent }}, {{ winningPercentage(fighter, opponent) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timestamp2date, now, today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/fighter.js'

export default {
  data() {
    return {
      period: 1,
      now: now(),
      today: today()
    }
  },
  computed: {
    records() {
      return this.$store.state.records
    },
    recordsByPeriod() {
      return this.records.filter(record => this.inPeriod(record.createdAt, this.period))
    },
    usedFighters() {
      const used = this.recordsByPeriod.map(record => {
        return record.fighter
      })
      return Array.from(new Set(used))
    },
    fightedFighters() {
      const fighted = this.recordsByPeriod.map(record => {
        return record.opponent
      })
      return Array.from(new Set(fighted))
    }
  },
  methods: {
    getRecordsByFighters(fighter, opponent) {
      return this.recordsByPeriod.filter(record => {
        return record.fighter === fighter && record.opponent === opponent
      })
    },
    winningPercentage(fighter, opponent) {
      const specificRecords = this.getRecordsByFighters(fighter, opponent)
      return calcWinningPercentage(specificRecords)
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
