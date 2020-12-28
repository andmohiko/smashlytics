<template>
  <div class="container">
    <div class="register">
      <template v-if="isShowModal">
        <RecordModal :lastRecord="lastRecord" @close="closeModal" />
      </template>
    </div>
    <div class="results">
      <p class="results-number">本日の戦績: {{ resultsToday }}</p>
      <Button @onClick="openModal" label="戦績を登録する" />
    </div>
    <div class="records">
      <!-- <p class="records-title">直近10戦の戦績</p> -->
      <Records :records="records.slice(0, 10)" />
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { timestamp2dateString, now } from '@/utils/date.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
import Button from '@/components/Button.vue'
import Records from '@/components/Records.vue'
import RecordModal from '@/components/RecordModal.vue'

export default {
  components: {
    Records,
    RecordModal,
    Button
  },
  data() {
    return {
      isShowModal: false,
      now: now()
    }
  },
  watch: {},
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records
    },
    lastRecord() {
      if (this.records.length) return this.records[0]
      return {
        fighterId: this.user.main,
        opponentId: '01',
      }
    },
    resultsToday() {
      const today = new Date(this.now).toLocaleString({ timeZone: 'Asia/Tokyo' }).slice(0, 10)
      const recordsToday = this.records.filter(record => record.createdAt.toLocaleString({ timeZone: 'Asia/Tokyo' }).slice(0, 10) === today)
      const wins = recordsToday.filter(record => record.result).length
      const loses = recordsToday.length - wins
      return wins + '勝' + loses + '敗'
    }
  },
  methods: {
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
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.results {
  margin: 16px 0 0 0;
  &-number {
    font-size: 18px;
    color: #4a5568;
    letter-spacing: 2px;
  }
}
.register {
  // width: 400px;
  margin: 0 50px;
}
.records {
  margin: 0 50px;
  // width: 500px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // text-align: left;
  &-title {
    width: 100%;
    display: block;
    justify-content: left;
    text-align: left;
    font-size: 18px;
    margin: 4px 0;
    color: #4a5568;
  }
}
</style>
