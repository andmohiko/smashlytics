<template>
  <div class="container">
    <div class="register">
      <template v-if="isShowModal">
        <AddRecordModal :lastRecord="lastRecord" @close="closeModal" />
      </template>
    </div>
    <div class="results">
      <p v-show="isLogin" class="results-number">本日の戦績: {{ resultsToday }}</p>
      <Button @onClick="openModal" label="戦績を登録する" />
    </div>
    <div class="records">
      <h2 class="records-title">直近10戦の戦績</h2>
      <Records :records="records.slice(0, 10)" />
    </div>
    <p class="error text-xl py-2 mb-4 text-red-700">{{ error }}</p>
    <div v-show="error" class="border-b">
      <button @click="toNew">ログインはこちら</button>
    </div>
    <!-- <div class="add-button">
      <button @click="openModal">
        <div class="plus">+</div>
      </button>
    </div> -->
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { timestamp2dateString, now } from '@/utils/date.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
import Button from '@/components/Button.vue'
import Records from '@/components/Records.vue'
import AddRecordModal from '@/components/AddRecordModal.vue'

export default {
  components: {
    Records,
    AddRecordModal,
    Button
  },
  data() {
    return {
      isShowModal: false,
      now: now(),
      error: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records
    },
    isLogin() {
      return Boolean(this.$store.state.user.userId)
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
      this.error = ''
      if (!this.isLogin) {
        this.error = '登録するにはログインしてください'
        return
      }
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
    },
    toNew() {
      this.$router.push("/new")
    }
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
  &-number {
    font-size: 20px;
    color: #4a5568;
    letter-spacing: 2px;
    margin: 4px 0 4px 0;
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
    justify-content: center;
    text-align: center;
    font-size: 16px;
    margin: 8px 0 0 0;
    color: #4a5568;
  }
}
// .add-button {
//   position: absolute;
//   position: relative;
//   bottom: 60px;
//   z-index: 1;
//   border-radius: 50%;
//   background-color: #579AFF;
//   width: 50px;
//   height: 50px;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.45);
//   transition: all .5s ease;
//   .plus {
//     font-size: 50px;
//     color: white;
//     position: absolute;
//     bottom: -8px;
//     right: 9px;
//   }
// }
// .add-button:hover {
//   box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.75);
//   bottom: 65px;
// }
</style>
