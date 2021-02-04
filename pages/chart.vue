<template>
  <div class="container">
    <div v-if="isShowModal">
      <AnalyticsSettingModal
        :analyticsSettings="analyticsSettings"
        @close="closeModal"
      />
    </div>
    <Button @onClick="openModal" label="分析の詳細設定" />
    chart
    <BarChart :records="recordsThisWeek" />
  </div>
</template>

<script>
import AnalyticsSettingModal from '@/components/modals/AnalyticsSettingModal.vue'
import Button from '@/components/parts/Button.vue'
import Chart from '@/components/Chart.vue'
import BarChart from '@/components/BarChart.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import { today } from '@/utils/date.js'
import fighters from '@/assets/fighters.json'

export default {
  components: {
    AnalyticsSettingModal,
    Button,
    FighterIcon,
    BarChart,
    Chart
  },
  data() {
    return {
      today: today(),
      isShowModal: false,
      fighters
    }
  },
  computed: {
    analyticsSettings() {
      return this.$store.state.analyticsSettings
    },
    records() {
      return this.$store.state.records.filter(record => record.roomType !== 'arena')
    },
    chartRecords() {
      return this.records.slice(0,7)
    },
    recordsThisWeek() {
      let week = []
      for (let i = 6; i => 0; i--) {
        const date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(i))
        week.push({
          date: date.toLocaleString({ timeZone: 'Asia/Tokyo'}),
          records: this.records.filter(record => this.inPeriod(record.createdAt, i))
        })
      }
      return week
    }
  },
  methods: {
    inPeriod(date, period) {
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    openModal() {
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
    }
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