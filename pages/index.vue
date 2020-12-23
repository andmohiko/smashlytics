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
              :value="'win'"
            />
            <label for="result-win">勝ち</label>
            <input
              id="result-lose"
              v-model="record.result"
              type="radio"
              name="lose"
              :value="'lose'"
            />
            <label for="result-lose">負け</label>
            <!-- <input
              id="result-other"
              v-model="record.result"
              type="radio"
              name="other"
              :value="'other'"
            />
            <label for="result-other">その他</label> -->
          <input v-model="record.result" type="text">
          <p>世界戦闘力(万)</p>
          <input v-model="record.globalSmashPower" type="text">
          <p>ステージ</p>
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
      <div class="records-table">
        <ul class="records-list">
          <li
            v-for="record in records"
            :key="record.id"
          >
            {{ record.fighter }}, {{ record.opponent }}, {{ record.result }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {},
  data() {
    return {
      record: {
        fighter: 'ロイ',
        opponent: '',
        result: 'win',
        globalSmashPower: '',
        stage: ''
      },
      error: '',
      userId: 'andmohiko',
      records: []
    }
  },
  // mounted() {
  //   this.user = this.$store.state.user
  //   console.log(this.$store.state.user)
  // },
  // computed: {
  //   user() {
  //     return this.$store.state.uid
  //   }
  // },
  methods: {
    async submit () {
      console.log('submit')
      this.error = ''
      console.log('uid')
      if (
        this.record.fighter === '' ||
        this.record.opponent === '' ||
        this.record.result === ''
      ) {
        this.error = '自分・相手・結果は入力してください'
        return
      }
      const db = firebase.firestore()
      console.log('db')
      const sendingRecord = db.collection('records').add({
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
          userId: this.userId,
          fighter: this.record.fighter,
          opponent: this.record.opponent,
          result: this.record.result,
          globalSmashPower: this.record.globalSmashPower,
          stage: this.record.stage
        })
        .then(ref => {
          console.log('Add ID: ', ref)
          return ref
        })
      console.log('sendingRecord', sendingRecord)
      await this.getRecords()
    },
    async getRecords() {
      const db = firebase.firestore()
      this.records = await db
        .collection('records')
        .where("userId", "==", this.userId)
        .get()
        .then(querySnapshot => {
          let recordsArray = []
          querySnapshot.forEach(doc => {
            recordsArray.push(doc.data())
          })
          return recordsArray.sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1
          })
        }).catch(function(error) {
          console.log("Error getting document:", error);
        })
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
  margin: 0 100px;
}
.records {
  margin: 0 100px;
  width: 300px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
