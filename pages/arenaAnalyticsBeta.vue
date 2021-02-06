<template>
  <div class="container pt-2">
    <div class="winning-percentage">
      <form class="mb-2 px-4">
        <div class="input-radio pb-2">
          <p class="text-l text-left pl-4">並べ替え</p>
          <input v-model="sorting" type="radio" name="matches" value="matches"/>
          <label for="3">試合数</label>
          <input v-model="sorting" type="radio" name="winningPercentage" value="winningPercentage"/>
          <label for="7">勝率</label>
        </div>
        <div class="input-radio mb-2">
          <p class="text-l text-left pl-4">期間(日)</p>
          <input v-model="period" type="radio" name="1" :value="1"/>
          <label for="1">1日</label>
          <input v-model="period" type="radio" name="3" :value="3"/>
          <label for="3">3日</label>
          <input v-model="period" type="radio" name="7" :value="7"/>
          <label for="7">7日</label>
          <input v-model="period" type="radio" name="30" :value="30"/>
          <label for="30">30日</label>
          <input v-model="period" type="radio" name="whole" :value="'whole'"/>
          <label for="whole">全期間</label>
        </div>
      </form>
      
      <p class="message">
        <span>{{ periodText }}の記録は {{ recordsFiltered.length }} 試合です。</span>
        <span>({{ winningPercentageText(recordsFiltered) }})</span>
      </p>
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height: 100%;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th v-for="heading in ['相手', '　　', '勝敗数', '勝率']" :key="heading.id"
                class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >{{ heading }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in entries" :key="entry.id">
              <td class="border-dashed border-t border-gray-200 px-3"
              >{{ entry.against }}</td>
              <td class="border-dashed border-t border-gray-200 py-2 flex justify-center items-center flex-wrap">
                <div v-for="fighterId in entry.opponentFighters" :key="fighterId.id">
                  <FighterIcon :fighterId="fighterId" size="32px" />
                </div>
              </td>
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
import { today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import { logEvent } from '@/utils/analytics.js'

export default {
  components: {
    FighterIcon
  },
  data() {
    return {
      period: 7,
      stage: 'all',
      sorting: 'matches',
      order: true,
      today: today()
    }
  },
  mounted() {
    logEvent('viewArenaAnalytics', undefined)
  },
  computed: {
    records() {
      return this.$store.state.records
        .filter(record => record.roomType === 'arena')
    },
    recordsFiltered() {
      return this.records
        .filter(record => this.inPeriod(record.createdAt, this.period))
    },
    fightedAgainst() {
      return Array.from(new Set(
        this.recordsFiltered.map(record => {
          return record.against
        })
      ))
    },
    usedFighterIds() {
      const used = this.recordsFiltered.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used))
    },
    fightedFighterIds() {
      const fighted = this.recordsFiltered.map(record => {
        return record.opponentId
      })
      return Array.from(new Set(fighted))
    },
    entries() {
      let entries = []
      this.fightedAgainst.map(against => {
        if (!against) return
        const againstRecords = this.recordsFiltered.filter(record => record.against === against)
        if (!againstRecords) return
        const opponentFighters = Array.from(new Set(
          againstRecords.map(record => {
            return record.opponentId
          }).sort()
        ))
        const wins = againstRecords.filter(record => record.result).length
        entries.push({
          against,
          opponentFighters,
          matches: againstRecords.length,
          wins,
          loses: againstRecords.length - wins,
          winningPercentage: Math.round((wins/againstRecords.length)*100 * 10) / 10
        })
      })
      return entries.sort((a, b) => (a[this.sorting] > b[this.sorting] ? -1 : 1))
    },
    periodText() {
      if (this.period === 'whole') return '全期間'
      return this.period + ' 日以内' 
    }
  },
  methods: {
    getRecordsByFighters(fighterId, opponentId) {
      return this.recordsFiltered.filter(record => {
        return record.fighterId === fighterId && record.opponentId === opponentId
      })
    },
    inPeriod(date, period) {
      if (this.period === 'whole') return true
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    winningPercentageText(records) {
      const results = calcWinningPercentage(records)
      return results.wins + '勝' + results.loses + '敗 勝率' + results.percentage + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 120px);
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
