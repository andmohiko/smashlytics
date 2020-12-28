<template>
  <div class="container">
    <div class="winning-percentage">
      <h2 class="text-2xl py-2 border-b mb-4">ファイターごとの勝率</h2>
      <form class="mb-2 px-4">
        <div class="input-radio mb-2">
          <p class="text-l">期間(日)</p>
          <input v-model="period" type="radio" name="1" :value="1"/>
          <label for="1">1日</label>
          <input v-model="period" type="radio" name="3" :value="3"/>
          <label for="3">3日</label>
          <input v-model="period" type="radio" name="7" :value="7"/>
          <label for="7">7日</label>
          <input v-model="period" type="radio" name="30" :value="30"/>
          <label for="30">30日</label>
        </div>
        <div class="input-radio">
          <p class="text-l">並べ替え</p>
          <input v-model="sorting" type="radio" name="fighterId" value="opponentId"/>
          <label for="1">ファイター順</label>
          <input v-model="sorting" type="radio" name="matches" value="matches"/>
          <label for="3">試合数</label>
          <input v-model="sorting" type="radio" name="winningPercentage" value="winningPercentage"/>
          <label for="7">勝率</label>
        </div>
      </form>
      <p class="message">
        <span>{{ period }} 日以内の記録は {{ recordsByPeriod.length }} 試合です。</span>
        <span>({{ calcWinningPercentage(recordsByPeriod) }})</span>
      </p>
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
            <tr v-for="entry in entries" :key="entry.id">
              <td class="border-dashed border-t border-gray-200 px-3"
              ><FighterIcon :fighterId="entry.fighterId" size="32px" /></td>
              <td class="border-dashed border-t border-gray-200 px-3"
              ><FighterIcon :fighterId="entry.opponentId" size="32px" /></td>
              <td class="border-dashed border-t border-gray-200 px-3"
              ><span class="text-gray-700 px-3 py-3 flex items-center">{{ entry.wins }}勝{{ entry.loses }}敗</span></td>
              <td class="border-dashed border-t border-gray-200 px-3"
              ><span class="text-gray-700 px-3 py-3 flex items-center">{{ entry.winningPercentage }}%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { timestamp2date, now, today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import FighterIcon from '@/components/FighterIcon.vue'

export default {
  components: {
    FighterIcon
  },
  data() {
    return {
      period: 3,
      sorting: 'opponentId',
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
    },
    entries() {
      let entries = []
      this.usedFighterIds.map(fighterId => {
        this.fightedFighterIds.map(opponentId => {
          const specificRecords = this.getRecordsByFighters(fighterId, opponentId)
          const wins = specificRecords.filter(record => record.result).length
          entries.push({
            fighterId,
            opponentId,
            matches: specificRecords.length,
            wins,
            loses: specificRecords.length - wins,
            winningPercentage: Math.round((wins/specificRecords.length)*100 * 10) / 10
          })
        })
      })
      if (this.sorting === 'opponentId') return entries.sort((a, b) => (a[this.sorting] < b[this.sorting] ? -1 : 1))
      return entries.sort((a, b) => (a[this.sorting] > b[this.sorting] ? -1 : 1))
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
    inPeriod(date, period) {
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    calcWinningPercentage,
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
.table {
  margin: 10px 0;
}
.message {
  font-size: 18px;
  margin-bottom: 8px;
  span {
    display: block;
  }
}
.table-byFighter {
  display: grid;
  grid-template-rows: 40px;
  grid-template-columns:50px 50px 1fr;
}
</style>
