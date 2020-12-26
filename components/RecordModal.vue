<template>
  <div class="modal-bg">
    <div class="record-modal bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div class="close" @click="onClose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    <div class="form">
      <h2 class="text-xl py-2 border-b mb-4">戦績を登録する</h2>
      <p class="error">{{ error }}</p>
      <form class="mb-4 px-4">
        <div class="input">
          <TextField ref="fighter" :allowEmpty="false" defaultValue="ロイ" label="自分のファイター" placeholder="ロイ" />
          <label class="block mt-4">
            <span class="text-gray-700">Select</span>
            <select v-model="record.opponent" class="form-select block w-full mt-1">
              <option v-for="fighter in fighters" :key="fighter.id">
                {{ fighter.number }}: {{ fighter.name }}
              </option>
            </select>
          </label>
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
          <TextField ref="globalSmashPower" :allowEmpty="false" label="世界戦闘力(万)" placeholder="500" />
          <div class="input-radio">
            <p>ステージ</p>
            <input
              id="stage-finalDestination"
              v-model="record.stage"
              type="radio"
              name="finalDestination"
              :value="'finalDestination'"
            />
            <label for="stage-finalDestination">終点( __ )</label>
            <input
              id="stage-battleField"
              v-model="record.stage"
              type="radio"
              name="battleField"
              :value="'battleField'"
            />
            <label for="stage-battleField">戦場( -^- )</label>
            <input
              id="stage-smallBattleField"
              v-model="record.stage"
              type="radio"
              name="smallBattleField"
              :value="'smallBattleField'"
            />
            <label for="stage-smallBattleField">小戦場( - - )</label>
          </div>
        </div>
      </form>
      <div class="submit">
        <Button @onClick="submit" label="登録する" />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import TextField from '@/components/TextField.vue'
import Button from '@/components/Button.vue'
import { jp2id } from '@/utils/fighter.js'
import { timestamp2dateString } from '@/utils/date.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  props: {
    fighters: {
      required: true,
      type: Array
    }
  },
  components: {
    Button,
    TextField
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
      userId: 'andmohiko'
    }
  },
  methods: {
    async submit () {
      console.log('submit')
      this.error = ''
      this.record.fighter = this.$refs.fighter.input
      this.record.globalSmashPower = this.$refs.globalSmashPower.input
      if (
        !this.record.fighter === '' ||
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
            fighter: this.record.fighter,
            fighterId: jp2id(this.record.fighter, this.fighters),
            opponent: this.record.opponent.split(' ')[1],
            opponentId: jp2id(this.record.opponent.split(' ')[1], this.fighters),
            result: this.record.result,
            stage: this.record.stage,
            globalSmashPower: this.record.globalSmashPower ? Number(this.record.globalSmashPower) * 10000 : null,
          })
          .then(ref => {
            // console.log('Add ID: ', ref)
            return ref
          })
          .catch(error => {
            console.log(error)
          })
        // console.log('sendingRecord', sendingRecord)
        this.onClose()
      } catch(error) {
        console.log('error in sending record', error)
      }
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal-bg {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(21, 28, 56, 0.568);
  z-index: 1;
}
.record-modal {
  position: relative;
}
.close {
  position: absolute;
  margin: 8px 8px 0 0;
  right: 0;
  top: 0;
}
</style>
