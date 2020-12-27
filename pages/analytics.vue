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
              <option>3</option>
              <option>7</option>
              <option>30</option>
            </select>
          </label>
        </div>
      </form>
      {{ recordsByPeriod.length }} in this period, {{ records.length }} matches in all.
      <div class="winningPercentage">
        <div v-for="fighterId in usedFighterIds" :key="fighterId.id">
          <div v-for="opponentId in fightedFighterIds" :key="opponentId.id">
            <div class="winningPercentage-byFighter">
              <FighterIcon :fighterId="fighterId" size="32px" />
              <FighterIcon :fighterId="opponentId" size="32px" />
              {{ winningPercentage(fighterId, opponentId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timestamp2date, now, today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/fighter.js'
import FighterIcon from '@/components/FighterIcon.vue'

export default {
  components: {
    FighterIcon
  },
  data() {
    return {
      period: 2,
      now: now(),
      today: today()
    }
  },
  computed: {
    fighters() {
      return this.$store.state.fighters
    },
    records() {
      return this.$store.state.records
    },
    recordsByPeriod() {
      return this.records.filter(record => this.inPeriod(record.createdAt, this.period))
    },
    usedFighterIds() {
      const used = this.recordsByPeriod.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used))
    },
    fightedFighterIds() {
      const fighted = this.recordsByPeriod.map(record => {
        return record.opponentId
      })
      return Array.from(new Set(fighted))
    }
  },
  methods: {
    getRecordsByFighters(fighterId, opponentId) {
      return this.recordsByPeriod.filter(record => {
        return record.fighterId === fighterId && record.opponentId === opponentId
      })
    },
    winningPercentage(fighterId, opponentId) {
      const specificRecords = this.getRecordsByFighters(fighterId, opponentId)
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
.winningPercentage {
  margin: 10px 0;
}
.winningPercentage-byFighter {
  display: grid;
  grid-template-rows: 40px;
  grid-template-columns:50px 50px 1fr;
}
</style>
