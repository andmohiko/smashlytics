<template>
  <div class="container">
    <div class="winning-percentage">
      <form class="mb-2 px-4">
        <div class="input-radio">
          <p class="text-l text-left pl-4">並べ替え</p>
          <input v-model="sorting" type="radio" name="fighterId" value="opponentId"/>
          <label for="1">相手ファイター順</label>
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
        <div class="input-radio mb-2">
          <p class="text-l text-left pl-4">ステージ</p>
          <input v-model="stage" type="radio" name="all" value="all"/>
          <label for="all">全部</label>
          <input v-model="stage" type="radio" name="finalDestination" value="finalDestination"/>
          <label for="finalDestination">終点</label>
          <input v-model="stage" type="radio" name="battleField" value="battleField"/>
          <label for="battleField">戦場</label>
          <input v-model="stage" type="radio" name="smallBattleField" value="smallBattleField"/>
          <label for="smallBattleField">小戦場</label>
        </div>
        <div class="toggleDescending">
          <template>
            <div class="flex justify-between items-center px-4 py-2" @click="toggle">
              <p class="text-right">逆順にする</p>
              <div class="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': descending}">
                <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': descending,}"></div>
              </div>
            </div>
          </template>
        </div>
      </form>
      
      <p class="message">
        <span>{{ periodText }}の記録は {{ recordsFiltered.length }} 試合です。</span>
        <span>({{ calcWinningPercentage(recordsFiltered) }})</span>
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
import { today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import FighterIcon from '@/components/parts/FighterIcon.vue'

export default {
  components: {
    FighterIcon
  },
  data() {
    return {
      period: 3,
      stage: 'all',
      sorting: 'opponentId',
      order: true,
      today: today(),
      descending: false
    }
  },
  computed: {
    records() {
      return this.$store.state.records
    },
    recordsFiltered() {
      const recordsSorting = this.records.slice().sort((a, b) => (a.opponentId < b.opponentId ? -1 : 1))
      if (this.period === 'whole' && this.stage === 'all') return recordsSorting
      if (this.period === 'whole' && this.stage !== 'all') return recordsSorting.filter(record => record.stage === this.stage)
      if (this.period !== 'whole' && this.stage === 'all') return recordsSorting.filter(record => this.inPeriod(record.createdAt, this.period))
      const recordsByStage = recordsSorting.filter(record => record.stage === this.stage)
      return recordsByStage.filter(record => this.inPeriod(record.createdAt, this.period))
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
      this.usedFighterIds.map(fighterId => {
        this.fightedFighterIds.map(opponentId => {
          const specificRecords = this.getRecordsByFighters(fighterId, opponentId)
          const wins = specificRecords.filter(record => record.result).length
          if (!specificRecords.length) return
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
      if (!this.descending) {
        if (this.sorting === 'opponentId') return entries.sort((a, b) => (a[this.sorting] < b[this.sorting] ? -1 : 1))
        return entries.sort((a, b) => (a[this.sorting] > b[this.sorting] ? -1 : 1))
      }
      if (this.sorting === 'opponentId') return entries.sort((a, b) => (a[this.sorting] > b[this.sorting] ? -1 : 1))
      return entries.sort((a, b) => (a[this.sorting] < b[this.sorting] ? -1 : 1))
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
    winningPercentage(fighterId, opponentId) {
      const specificRecords = this.getRecordsByFighters(fighterId, opponentId)
      return calcWinningPercentage(specificRecords)
    },
    inPeriod(date, period) {
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    toggle() {
      return this.descending = !this.descending
    },
    calcWinningPercentage
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
