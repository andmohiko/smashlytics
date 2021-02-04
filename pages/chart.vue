<template>
  <div class="container">
    <div>
      グラフ
    </div>
    <div>
      <Chart :records="recordsThisWeek" />
    </div>
  </div>
</template>

<script>
import AnalyticsSettingModal from '@/components/modals/AnalyticsSettingModal.vue'
import Button from '@/components/parts/Button.vue'
import Chart from '@/components/Chart.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import { today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import fighters from '@/assets/fighters.json'
import _ from 'lodash'

export default {
  components: {
    AnalyticsSettingModal,
    Button,
    Chart,
    FighterIcon
  },
  data() {
    return {
      today: today(),
      isShowModal: false,
      fighters
    }
  },
  computed: {
    records() {
      return this.$store.state.records.filter(record => record.roomType !== 'arena')
    },
    recordsThisWeek() {
      return this.records.filter(r => this.inPeriod(r.createdAt, 7))
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
    inPeriod(date, period) {
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    winningPercentageText(records) {
      const results = calcWinningPercentage(records)
      return results.wins + '勝' + results.loses + '敗 勝率' + results.percentage + '%'
    },
    openModal() {
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
