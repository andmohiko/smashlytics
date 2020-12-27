<template>
  <div class="modal-bg">
    <div class="record-modal bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col overflow-auto">
      <div class="close" @click="onClose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="form">
        <h2 class="text-xl py-2 border-b mb-4">戦績を登録する</h2>
        <p class="error">{{ error }}</p>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="fighter"
            :usedFighterIds="usedFighterIds"
            :previouslySelected="lastRecord.fighterId"
            iconSize="48px"
            :isShowOption="true"
            label="自分のファイター"
          />
        </div>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="opponent"
            :previouslySelected="lastRecord.opponentId"
            iconSize="48px"
            label="相手のファイター"
          />
        </div>
        <form class="mb-4 px-4">
          <div class="input">
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
import FighterSelecter from '@/components/FighterSelecter.vue'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  props: {
    lastRecord: {
      required: true,
      type: Object
    }
  },
  components: {
    Button,
    TextField,
    FighterSelecter
  },
  data() {
    return {
      record: {
        fighterId: null,
        opponentId: null,
        result: true,
        globalSmashPower: null,
        stage: null
      },
      error: ''
    }
  },
  mounted() {
    console.log(this.lastRecord)
    if(!this.lastRecord) return
    this.record.fighterId = this.lastRecord.fighterId
    this.record.opponentId = this.lastRecord.opponentId
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    fighters() {
      return this.$store.state.fighters
    },
    usedFighterIds() {
      const used = this.$store.state.records.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used)).sort()
    },
    allFighterIds() {
      return Object.keys(this.fighters).sort()
    }
  },
  methods: {
    select() {
      this.record.fighterId = String(this.$refs.fighter.get())
      this.record.opponentId = String(this.$refs.opponent.get())
      console.log('select emit', this.record.fighterId, this.record.opponentId)
    },
    async submit () {
      console.log('submit', this.record.fighterId, this.record.opponentId)
      this.error = ''
      this.record.globalSmashPower = this.$refs.globalSmashPower.input
      if (
        !this.record.fighterId ||
        !this.record.opponentId ||
        this.record.result === null
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
            userId: this.user.userId,
            fighter: this.fighters[this.record.fighterId].name,
            fighterId: this.record.fighterId,
            opponent: this.fighters[this.record.opponentId].name,
            opponentId: this.record.opponentId,
            result: this.record.result,
            stage: this.record.stage,
            globalSmashPower: this.record.globalSmashPower ? Number(this.record.globalSmashPower) * 10000 : null,
          })
          .catch(error => {
            console.log(error)
          })
        await this.$store.dispatch('getRecords', this.user.userId)
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
  z-index: 20;
}
.record-modal {
  position: relative;
  height: 80%;
  max-width: 95%;
  z-index: 30;
}
.close {
  position: absolute;
  margin: 8px 8px 0 0;
  right: 0;
  top: 0;
}
</style>
