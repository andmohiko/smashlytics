<template>
  <div class="container">
    <div v-if="isShowModal">
      <AnalyticsSettingModal
        :analyticsSettings="analyticsSettings"
        @close="closeModal"
      />
    </div>
    <div class="winning-percentage">
      <div class="flex flex-col items-end text-gray-500 pb-2">
        <nuxt-link to="/arenaAnalyticsBeta">専用部屋の分析は<span class="text-gray-600">こちら</span>(β版)</nuxt-link>
      </div>
      <Button @onClick="openModal" label="分析の詳細設定" />
      <button @click="resetSettings" class="flex items-end ml-8 mt-1 py-1 text-gray-700">設定をリセット</button>
      <form class="mb-2 px-4">
        <div class="input-radio pb-2">
          <div class="sort flex justify-between items-center">
            <p class="text-l text-left pl-4">並べ替え</p>
            <div class="toggleSort">
              <template>
                <div class="flex justify-between items-center px-4 py-1" @click="toggleSort">
                  <p class="text-right pr-2">逆順</p>
                  <div class="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': analyticsSettings.descending}">
                    <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': analyticsSettings.descending,}"></div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <input v-model="analyticsSettings.sorting" type="radio" name="fighterId" value="opponentId"/>
          <label for="1">相手ファイター順</label>
          <input v-model="analyticsSettings.sorting" type="radio" name="matches" value="matches"/>
          <label for="3">試合数</label>
          <input v-model="analyticsSettings.sorting" type="radio" name="winningPercentage" value="winningPercentage"/>
          <label for="7">勝率</label>
        </div>
        <div class="input-radio mb-2 flex justify-between">
          <span class="text-l text-left pl-4">期間(日)</span>
          <div class="pr-2">
            <input v-model="analyticsSettings.period" type="radio" name="1" :value="1"/>
            <label for="1">1日</label>
            <input v-model="analyticsSettings.period" type="radio" name="7" :value="7"/>
            <label for="7">7日</label>
            <input v-model="analyticsSettings.period" type="radio" name="30" :value="30"/>
            <label for="30">30日</label>
            <input v-model="analyticsSettings.period" type="radio" name="whole" :value="'whole'"/>
            <label for="whole">全期間</label>
          </div>
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
              <th v-for="heading in ['自分', '相手', '勝敗数', '勝率']" :key="heading.id"
                class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >{{ heading }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in entries" :key="entry.id">
              <td class="border-dashed border-t border-gray-200 px-3"
              ><FighterIcon :fighterId="entry.fighterId" size="32px" /></td>
              <td class="border-dashed border-t border-gray-200 px-3 py-2 flex">
                <FighterIcon :fighterId="entry.opponentId" size="32px" />
                <FighterIcon :fighterId="fighters[entry.opponentId].child" v-if="showSimilarFighter(entry.opponentId)" size="32px" />
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
import AnalyticsSettingModal from '@/components/modals/AnalyticsSettingModal.vue'
import Button from '@/components/parts/Button.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import { today } from '@/utils/date.js'
import { calcWinningPercentage } from '@/utils/records.js'
import fighters from '@/assets/fighters.json'
import _ from 'lodash'

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
      fighters
    }
  },
  computed: {
    analyticsSettings() {
      return this.$store.state.analyticsSettings
    },
    records() {
      return this.$store.state.records
        .filter(record => record.roomType !== 'arena')
        .slice()
        .sort((a, b) => (a.opponentId < b.opponentId ? -1 : 1))
    },
    groupedRecords() {
      return _.cloneDeep(this.records)
        .map(record => {
          if (this.fighters[record.opponentId].parent) {
            record.opponentId = this.fighters[record.opponentId].parent
          }
          return record
        })
    },
    recordsFiltered() {
      let recordsGrouped = this.analyticsSettings.groupSimilarFighters ? this.groupedRecords : this.records
      if (this.analyticsSettings.selectedMyFighter !== 'all') recordsGrouped = recordsGrouped.filter(record => record.fighterId === this.analyticsSettings.selectedMyFighter)
      if (this.analyticsSettings.filterRepeat) recordsGrouped = recordsGrouped.filter(record => !record.isRepeat)
      if (this.analyticsSettings.period === 'whole' && this.analyticsSettings.stage === 'all') return recordsGrouped
      if (this.analyticsSettings.period === 'whole' && this.analyticsSettings.stage !== 'all') return recordsGrouped.filter(record => record.stage === this.analyticsSettings.stage)
      if (this.analyticsSettings.period !== 'whole' && this.analyticsSettings.stage === 'all') return recordsGrouped.filter(record => this.inPeriod(record.createdAt, this.analyticsSettings.period))
      const recordsByStage = recordsGrouped.filter(record => record.stage === this.analyticsSettings.stage)
      return recordsByStage.filter(record => this.inPeriod(record.createdAt, this.analyticsSettings.period))
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
      if (!this.analyticsSettings.descending) {
        if (this.analyticsSettings.sorting === 'opponentId') return entries.sort((a, b) => (a[this.analyticsSettings.sorting] < b[this.analyticsSettings.sorting] ? -1 : 1))
        return entries.sort((a, b) => (a[this.analyticsSettings.sorting] > b[this.analyticsSettings.sorting] ? -1 : 1))
      }
      if (this.analyticsSettings.sorting === 'opponentId') return entries.sort((a, b) => (a[this.analyticsSettings.sorting] > b[this.analyticsSettings.sorting] ? -1 : 1))
      return entries.sort((a, b) => (a[this.analyticsSettings.sorting] < b[this.analyticsSettings.sorting] ? -1 : 1))
    },
    periodText() {
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
      const targetDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - Number(period))
      return date > targetDate
    },
    showDetails() {
      return this.isShowDetails = !this.isShowDetails
    },
    toggleSort() {
      return this.analyticsSettings.descending = !this.analyticsSettings.descending
    },
    winningPercentageText(records) {
      const results = calcWinningPercentage(records)
      return results.wins + '勝' + results.loses + '敗 勝率' + results.percentage + '%'
    },
    showSimilarFighter(fighterId) {
      return (
        this.analyticsSettings.groupSimilarFighters &&
        this.fighters[fighterId].child
      )
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
