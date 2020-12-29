<template>
  <div class="container">
    <div class="register">
      <div class="form">
        <h2 class="text-xl py-2 border-b mb-4">過去の戦績を登録する</h2>
        <p class="error">{{ error }}</p>
        <form class="mb-4 px-4">
          <div class="input">
            <label class="block">
              <input v-model="record.wins" class="form-input mt-1 block w-full p-2 border" placeholder="0">
              <span class="text-xl text-gray-700 px-2">勝</span>
              <input v-model="record.loses" class="form-input mt-1 block w-full p-2 border" placeholder="0">
              <span class="text-xl text-gray-700 px-2">敗</span>
            </label>
          </div>
        </form>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="fighter"
            :usedFighterIds="usedFighterIds"
            :previouslySelected="'25'"
            iconSize="48px"
            :isShowOption="true"
            label="自分のファイター"
          />
        </div>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="opponent"
            iconSize="48px"
            label="相手のファイター"
          />
        </div>
        <p class="error">{{ error }}</p>
        <div class="submit">
          <Button @onClick="submit" label="登録する" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import Button from '@/components/Button.vue'
import FighterSelecter from '@/components/FighterSelecter.vue'
import fighters from '@/assets/fighters.json'
import { timestamp2dateString, today } from '@/utils/date.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {
    Button,
    FighterSelecter
  },
  data() {
    return {
      record: {
        fighterId: null,
        opponentId: null,
        wins: 0,
        loses: 0
      },
      error: '',
      today: today(),
      fighters
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    usedFighterIds() {
      const used = this.$store.state.records.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used)).sort()
    }
  },
  methods: {
    select() {
      this.record.fighterId = String(this.$refs.fighter.get())
      this.record.opponentId = String(this.$refs.opponent.get())
    },
    async submit () {
      this.error = ''
      const wins = Number(this.record.wins)
      const loses = Number(this.record.loses)
      if (!this.record.fighterId || !this.record.opponentId || (wins+loses) === 0) {
        this.error = '自分・相手・結果を入力してください'
        return
      }
      const db = firebase.firestore()
      for (let i=0; i<wins; i++) {
        const newRecord = {
          createdAt: new Date(this.today.getFullYear(), this.today.getMonth() - Number(1), this.today.getDate(), 0, 0, 0),
          updatedAt: serverTimestamp,
          userId: this.user.userId,
          fighter: this.fighters[this.record.fighterId].name,
          fighterId: this.record.fighterId,
          opponent: this.fighters[this.record.opponentId].name,
          opponentId: this.record.opponentId,
          result: true,
          globalSmashPower: null,
          stage: null
        }
        db.collection('records')
          .add(newRecord)
          .catch(error => {
            console.log(error)
          })
      }
      for (let i=0; i<loses; i++) {
        const newRecord = {
          createdAt: new Date(this.today.getFullYear(), this.today.getMonth() - Number(1), this.today.getDate(), 0, 0, 0),
          updatedAt: serverTimestamp,
          userId: this.user.userId,
          fighter: this.fighters[this.record.fighterId].name,
          fighterId: this.record.fighterId,
          opponent: this.fighters[this.record.opponentId].name,
          opponentId: this.record.opponentId,
          result: false,
          globalSmashPower: null,
          stage: null
        }
        db.collection('records')
          .add(newRecord)
          .catch(error => {
            console.log(error)
          })
      }
      this.error = '登録しました'
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
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
}
.register {
  width: 400px;
  margin: 0 10px;
}
.input {
  // background-color: pink;
  display: flex;
  justify-content: center;
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
</style>