<template>
  <div class="container">
    グラフ
    {{ recordsByFighter[0] }}
  </div>
</template>

<script>
import AnalyticsSettingModal from '@/components/modals/AnalyticsSettingModal.vue'
import Button from '@/components/parts/Button.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import { today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import fighters from '@/assets/fighters.json'
import _ from 'lodash'

import { Bar } from 'vue-chartjs'

export default {
  components: {
    AnalyticsSettingModal,
    Button,
    FighterIcon
  },
  data() {
    return {
      today: today(),
      isShowModal: false,
      fighters,
      selectedFighter: 25
    }
  },
  extends: Bar,
  mounted () {
    this.renderChart(data, options)
  },
  computed: {
    analyticsSettings() {
      return this.$store.state.analyticsSettings
    },
    records() {
      return this.$store.state.records.filter(record => record.roomType !== 'arena')
    },
    recordsByFighter() {
      return this.records.filter(record => record.fighterId === this.selectedFighter)
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
    getRecordsByFighters(fighterId, opponentId) {
      return this.recordsFiltered.filter(record => {
        return record.fighterId === fighterId && record.opponentId === opponentId
      })
    },
    inPeriod(date, period) {
      if (this.analyticsSettings.period === 'whole') return true
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    winningPercentageText(records) {
      const results = calcWinningPercentage(records)
      return results.wins + '勝' + results.loses + '敗 勝率' + results.percentage + '%'
    },
    resetSettings() {
      this.$store.commit('setAnalyticsSettings', {
        sorting: 'opponentId',
        period: 30,
        selectedMyFighter: 'all',
        groupSimilarFighters: false,
        stage: 'all',
        stocks: 'all',
        filterRepeat: false
      })
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
