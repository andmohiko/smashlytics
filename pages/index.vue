<template>
  <div class="container">
    <div class="register">
      <div class="title">
        <p class="results-number">本日の戦績: {{ resultsToday }}</p>
      </div>
      <template v-if="isShowModal">
        <RecordModal :fighters="fightersArray" @close="closeModal" />
      </template>
    </div>
    <div class="records">
      <Records :records="records" :fighters="fighters" />
    </div>
    <Button @onClick="openModal" label="戦績を登録する" />
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { jp2en } from '@/utils/fighter.js'
import { timestamp2dateString } from '@/utils/date.js'
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
      record: {
        fighter: 'ロイ',
        opponent: '',
        result: true,
        globalSmashPower: null,
        stage: null
      },
      error: '',
      isShowModal: false,
      userId: 'andmohiko',
      records: [],
      fighters: {}
    }
  },
  mounted() {
    this.records = this.$store.state.records
    this.fighters = this.$store.state.fighters
  },
  computed: {
    resultsToday() {
      const today = new Date().toISOString().slice(0,10)
      const recordsToday = this.records.filter(record => timestamp2dateString(record.createdAt) === today)
      const wins = recordsToday.filter(record => record.result).length
      const loses = recordsToday.length - wins
      return wins + '勝' + loses + '敗'
    },
    fightersArray() {
      return Object.values(this.fighters)
        .slice()
        .sort((a, b) => (a.number < b.number ? -1 : 1))
    }
  },
  methods: {
    async getRecords() {
      await this.$store.dispatch('getRecords', this.userId)
      this.records = this.$store.state.records
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
  min-height: 100vh;
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
.subtitle {
  margin: 20px 0;
  font-size: 18px;
  color: black;
  letter-spacing: 1px;
}
.register {
  // width: 400px;
  margin: 0 50px;
}
.input {
  background-color: pink;
  display: flex;
  &-text {
    width: 180px;
  }
  &-radio {
    width: 140px;
  }
}
.records {
  margin: 0 50px;
  width: 500px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.results {
  &-today {
    margin: 10px 0;
  }
  &-number {
    font-size: 16px;
    color: black;
    letter-spacing: 3px;
  }
}
</style>
