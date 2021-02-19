<template>
  <div class="container overflow-y-auto">
    <div class="flex flex-col items-center pb-6 w-full">
      <p class="my-2 text-3xl text-gray-700 tracking-widest">{{ chartTypeLabel[chartType] }}</p>
      <MatchesChart
        v-if="chartType === 'matches'"
        :recordsSummary="recordsThisWeek"
        class="w-full px-1"
      />
      <WinningPercentageChart
        v-else-if="chartType === 'winningPercentage'"
        :recordsSummary="recordsThisWeek"
        class="w-full px-1"
      />
    </div>
    <div class="flex flex-col items-start w-full pl-3 pb-2">
      <p class="text-gray-700 text-lg text-left pb-2">グラフを表示</p>
      <div class="flex items-center">
        <button @click="selectChartType" class="focus:outline-none">
          <RadioButton v-model="chartType" :label="chartTypeLabel.matches" value="matches" />
        </button>
        <button @click="selectChartType" class="focus:outline-none">
          <RadioButton v-model="chartType" :label="chartTypeLabel.winningPercentage" value="winningPercentage" />
        </button>
        <!-- <RadioButton v-model="chartType" :label="chartTypeLabel.globalSmashPower" value="globalSmashPower" /> -->
      </div>
    </div>
    <!-- <div>
      <p class="my-2 pl-4 text-xl text-gray-700 text-width text-left">使用したファイター</p>
      <FighterSelecter
        @select="select"
        ref="fighter"
        :usedFighterIds="usedFighterIds"
        iconSize="40px"
        class="pl-4"
      />
    </div> -->
    <div class="py-2 px-1">
      <div class="w-full bg-white rounded-lg shadow overflow-y-auto relative" style="height: 100%;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th
                v-for="heading in headings" :key="heading.id"
                class="bg-gray-100 sticky top-0 border-b border-gray-200 pl-5 pr-2 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >{{ heading }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in recordsThisWeek.slice().reverse()" :key="day.id">
              <td class="border-dashed border-t border-gray-200 px-3">
                <span class="text-gray-700 pl-2 py-3 flex items-center">{{ day.date }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 pl-8 py-3 flex items-center">{{ day.records }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 pl-8 py-3 flex items-center">{{ day.wins }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 pl-4 py-3 flex items-center">{{ day.records ? Math.round((day.wins/day.records)*100 * 10) / 10 + '%' : '--' }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200 px-3 py-2 flex justify-center items-center flex-wrap">
                <div v-for="fighterId in day.userdFighters" :key="fighterId.id">
                  <FighterIcon :fighterId="fighterId" size="32px" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticsSettingModal from '@/components/modals/AnalyticsSettingModal.vue'
import Button from '@/components/parts/Button.vue'
import MatchesChart from '@/components/chart/MatchesChart.vue'
import WinningPercentageChart from '@/components/chart/WinningPercentageChart.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import FighterSelecter from '@/components/parts/FighterSelecter.vue'
import RadioButton from '@/components/input/RadioButton.vue'
import { today, subtractDays, date2string } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import fighters from '@/assets/fighters.json'
import _ from 'lodash'

export default {
  components: {
    AnalyticsSettingModal,
    Button,
    MatchesChart,
    WinningPercentageChart,
    FighterIcon,
    FighterSelecter,
    RadioButton
  },
  data() {
    return {
      today: today(),
      fighters,
      chartType: '',
      chartTypeLabel: {
        matches: '対戦数',
        winningPercentage: '勝率',
        globalSmashPower: '世界戦闘力'
      },
      headings: ['日付', '対戦数', '勝ち数', '勝率', '使用ファイター']
    }
  },
  mounted() {
    this.chartType = this.$store.state.chartType
  },
  computed: {
    records() {
      return this.$store.state.records.filter(record => record.roomType !== 'arena')
    },
    recordsFiltered() {
      return this.records.filter(r => this.inPeriod(r.createdAt, 7, 0))
    },
    recordsThisWeek() {
      let recordsWeek = []
      for (let day = 6; day >= 0; day--) {
        const recordsByDay = this.records.filter(r => this.inPeriod(r.createdAt, day, day-1))
        recordsWeek.push({
          date: date2string(subtractDays(this.today, day)).split(' ')[0].slice(5),
          records: recordsByDay.length,
          winsSum: this.records.filter(r => this.inPeriod(r.createdAt, 6, day-1)).filter(r => r.result).length,
          wins: recordsByDay.filter(r => r.result).length,
          winningPercentage: recordsByDay.filter(r => r.result).length / recordsByDay.length * 100 || 0,
          userdFighters: this.getUsedFighters(recordsByDay)
        })
      }
      return recordsWeek
    },
    usedFighterIds() {
      if (!this.recordsFiltered.length) return Object.keys(this.fighters).sort()
      const used = this.recordsFiltered.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used)).sort()
    },
    chartdata() {
      return {
        data: {
          labels: this.recordsThisWeek.map(day => day.date),
          datasets: [
            {
              label: '対戦数',
              data: this.recordsThisWeek.map(day => day.records),
            },
            {
              label: '勝ち数',
              data: this.recordsThisWeek.map(day => day.wins),
              borderColor: '#579aff',
              fill: false,
              type: 'line',
              lineTension: 0.1,
            }
          ]
        }
      }
    },
    usedFighterIds() {
      const used = this.recordsFiltered.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used))
    },
    periodText() {
      if (this.analyticsSettings.period === 0) return '本日'
      if (this.analyticsSettings.period === 'whole') return '全期間'
      return this.analyticsSettings.period + ' 日以内' 
    }
  },
  methods: {
    inPeriod(date, start, end) {
      const startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(start))
      const endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(end))
      return (startDate < date && date < endDate)
    },
    getUsedFighters(records) {
      if (!records.length) return []
      const used = records.map(r => {
        return r.fighterId
      })
      return Array.from(new Set(used)).sort()
    },
    winningPercentageText(records) {
      const results = calcWinningPercentage(records)
      return results.wins + '勝' + results.loses + '敗 勝率' + results.percentage + '%'
    },
    select() {
      this.fighterId = String(this.$refs.fighter.get())
    },
    selectChartType() {
      this.$store.commit('setChartType', this.chartType)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  // height: 100px;
  // width: 400px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
@media screen and (min-width: 400px) {
  .container {
    width: 400px;
  }
}
</style>
