<template>
  <div class="container">
    グラフ
  </div>
</template>

<script>
import { now, date2string } from '@/utils/date.js'
import Button from '@/components/parts/Button.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import fighters from '@/assets/fighters.json'

export default {
  components: {
    FighterIcon,
    Button
  },
  data() {
    return {
      fighters,
      headings: ['日付','自分','相手','','勝敗','編集'],
      isShowAddModal: false,
      isShowEditModal: false,
      editingRecord: {},
      now: now()
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records.filter(record => record.roomType === 'arena')
    },
    isLogin() {
      return Boolean(this.$store.state.user.userId)
    },
    lastRecord() {
      if (this.records.length) return this.records[0]
      return {
        fighterId: '01',
        opponentId: '01',
      }
    },
    resultsToday() {
      const today = date2string(this.now).split(' ')[0]
      const recordsToday = this.records.filter(record => record.createdAtString.split(' ')[0] === today)
      const wins = recordsToday.filter(record => record.result).length
      return wins + '勝' + (recordsToday.length - wins) + '敗'
    }
  },
  methods: {
    async getRecords() {
      await this.$store.dispatch('getRecords', this.user.userId)
    },
    normalizeAgainstName(name) {
      if (name.length < 6) return name
      return name.slice(0,4) + '...'
    },
    openAddModal() {
      this.isShowAddModal = true
    },
    openEditModal(record) {
      this.isShowEditModal = true
      this.editingRecord = record
    },
    closeModal() {
      this.isShowAddModal = false
      this.isShowEditModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.get {
  span {
    display: inline-block;
  }
}
.records {
  margin: 10px 0;
}
.title {
  margin: 40px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.results {
  &-number {
    font-size: 20px;
    color: #4a5568;
    letter-spacing: 2px;
    margin: 4px 0 4px 0;
  }
}

</style>