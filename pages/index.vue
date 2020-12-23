<template>
  <div class="container">
    <div class="register">
      <div class="title">
        戦績を登録する
        <p class="results-number">本日の戦績: {{ resultsToday }}</p>
      </div>
      <div class="form">
        <p class="error">{{ error }}</p>
        <div class="input">
          <div class="input-text">
            <p>自分</p>
            <input v-model="record.fighter" type="text">
          </div>
          <div class="input-text">
            <p>相手</p>
            <input v-model="record.opponent" type="text">
          </div>
          <div class="input-radio">
            <p>勝敗</p>
            <input
              id="result-win"
              v-model="record.result"
              type="radio"
              name="win"
              :value="true"
            />
            <label for="result-win">勝ち</label>
            <input
              id="result-lose"
              v-model="record.result"
              type="radio"
              name="lose"
              :value="false"
            />
            <label for="result-lose">負け</label>
          </div>
          <div class="input-text">
            <p>世界戦闘力(万)</p>
            <input v-model="record.globalSmashPower" type="text">
          </div>
          <div class="input-radio">
            <p>ステージ</p>
            <input
              id="stage-finalDestination"
              v-model="record.stage"
              type="radio"
              name="finalDestination"
              :value="'finalDestination'"
            />
            <label for="stage-finalDestination">終点(FD)</label>
            <input
              id="stage-battleField"
              v-model="record.stage"
              type="radio"
              name="battleField"
              :value="'battleField'"
            />
            <label for="stage-battleField">戦場(BF)</label>
            <input
              id="stage-smallBattleField"
              v-model="record.stage"
              type="radio"
              name="smallBattleField"
              :value="'smallBattleField'"
            />
            <label for="stage-smallBattleField">小戦場(SBF)</label>
          </div>
        </div>
        <div class="submit">
          <button @click="submit" type="button" class="uppercase px-8 py-2 rounded-full border border-yellow-600 text-yellow-600 max-w-max shadow-sm hover:shadow-md">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div class="records">
      <Records :records="records" :fighters="fighters" />
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { jp2en } from '@/utils/fighter.js'
import { timestamp2dateString } from '@/utils/date.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

import Records from '@/components/Records.vue'

export default {
  components: {
    Records
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
      const loses = recordsToday.filter(record => !record.result).length
      return wins + '勝' + loses + '敗'
    }
  },
  methods: {
    async submit () {
      console.log('submit')
      this.error = ''
      if (
        this.record.fighter === '' ||
        this.record.opponent === '' ||
        this.record.result === ''
      ) {
        this.error = '自分・相手・結果は入力してください'
        return
      }
      const db = firebase.firestore()
      try {
        const sendingRecord = db
          .collection('records')
          .add({
            createdAt: serverTimestamp,
            updatedAt: serverTimestamp,
            userId: this.userId,
            fighter: jp2en(this.record.fighter. this.fighters),
            opponent: jp2en(this.record.opponent. this.fighters),
            result: this.record.result,
            globalSmashPower: this.record.globalSmashPower ? Number(this.record.globalSmashPower) * 10000 : null,
            stage: this.record.stage
          })
          .then(ref => {
            console.log('Add ID: ', ref)
            return ref
          })
          .catch(error => {
            console.log(error)
          })
        console.log('sendingRecord', sendingRecord)
      } catch(error) {
        console.log('error in sending record')
        console.log(error)
      }
      this.getRecords()
    },
    async getRecords() {
      await this.$store.dispatch('getRecords', this.userId)
      this.records = this.$store.state.records
    }
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
