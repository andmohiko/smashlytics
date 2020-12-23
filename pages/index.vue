<template>
  <div class="container">
    <div class="register">
      <div class="title"><h2>戦績を登録する</h2></div>
      <div class="form">
        <div class="input">
          <p class="error">{{ error }}</p>
          <p>自分</p>
          <input v-model="record.fighter" type="text">
          <p>相手</p>
          <input v-model="record.opponent" type="text">
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
          <p>世界戦闘力(万)</p>
          <input v-model="record.globalSmashPower" type="text">
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
          <input v-model="record.stage" type="text">
        </div>
        <div class="submit">
          <button @click="submit" type="button">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div class="records">
      <div class="title">
        <h2>戦績一覧</h2>
        <div class="get">
          <button @click="getRecords" type="button">更新</button>
        </div>
      </div>
      <Records :records="records" />
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

import Records from '@/components/Records.vue'

export default {
  components: {
    Records
  },
  data() {
    return {
      record: {
        fighter: 'Roy',
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
  async fetch ({ store, params }) {
    await store.dispatch('getFighters')
  },
  mounted() {
    this.records = this.$store.state.records
    this.fighters = this.$store.state.fighters
    console.log('fighters', this.fighters)
  },
  // computed: {
  //   user() {
  //     return this.$store.state.uid
  //   }
  // },
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
      const sendingRecord = db
        .collection('records')
        .add({
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
          userId: this.userId,
          fighter: this.record.fighter,
          opponent: this.record.opponent,
          result: this.record.result,
          globalSmashPower: this.record.globalSmashPower ? Number(this.record.globalSmashPower) * 10000 : null,
          stage: this.record.stage
        })
        .then(ref => {
          console.log('Add ID: ', ref)
          return ref
        })
      console.log('sendingRecord', sendingRecord)
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
  // flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  text-align: center;
}
.title {
  margin: 40px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.register {
  // width: 400px;
  margin: 0 50px;
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
</style>
