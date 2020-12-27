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
      {{ recordsByPeriod.length }} matches in this period, {{ records.length }} matches in all.
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height: 100%;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th v-for="heading in ['自分', '相手', '勝敗数', '勝率']" :key="heading.id"
                class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >{{ heading }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="opponentId in fightedFighterIds" :key="opponentId.id">
              <td class="border-dashed border-t border-gray-200 px-3"
              ><FighterIcon :fighterId="'25'" size="32px" /></td>
              <td class="border-dashed border-t border-gray-200 px-3"
              ><FighterIcon :fighterId="opponentId" size="32px" /></td>
              <td class="border-dashed border-t border-gray-200 px-3"
              ><span class="text-gray-700 px-3 py-3 flex items-center">{{ winningPercentage('25', opponentId).slice(0,5) }}</span></td>
              <td class="border-dashed border-t border-gray-200 px-3"
              ><span class="text-gray-700 px-3 py-3 flex items-center">{{ winningPercentage('25', opponentId).slice(7) }}</span></td>
            </tr>
          </tbody>
        </table>
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
.table {
  margin: 10px 0;
}
.table-byFighter {
  display: grid;
  grid-template-rows: 40px;
  grid-template-columns:50px 50px 1fr;
}
</style>
