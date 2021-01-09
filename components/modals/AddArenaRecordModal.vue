<template>
  <div class="modal-bg">
    <div class="record-modal bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 flex flex-col overflow-auto">
      <div class="close" @click="onClose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="form">
        <h2 class="text-xl py-2 border-b mb-4">専用部屋の戦績を登録する</h2>
        <p class="error">{{ error }}</p>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="fighter"
            :usedFighterIds="usedFighterIds"
            :previouslySelected="lastRecord.fighterId"
            iconSize="44px"
            :isShowOption="true"
            label="自分のファイター"
          />
        </div>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="opponent"
            :previouslySelected="lastRecord.opponentId"
            iconSize="44px"
            label="相手のファイター"
          />
        </div>
        <ResultButton @clickWin="isWin" @clickLose="isLose" class="pt-4 pb-2" />
        
        <div v-show="isShowInputDetails" class="details mt-20 mb-20 px-4">
          <span class="text-gray-700 px-1 pt-3 flex items-center">▼詳しく記録したい人向け</span>
          <span class="text-gray-600 text-xs px-1 pb-3 flex items-center">入力しておくとあとで詳しく分析できるよ！</span>
          <StageSelecter ref="stage" :isShowSmamateStages="true" :previousSelect="lastRecord.stage" :isShowOptionEmpty="false" />
          <TextField ref="against" :defaultValue="lastRecord.against" label="対戦相手" placeholder="もひこ" />
        </div>
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
import Button from '@/components/parts/Button.vue'
import ResultButton from '@/components/parts/ResultButton.vue'
import FighterSelecter from '@/components/FighterSelecter.vue'
import StageSelecter from '@/components/parts/StageSelecter.vue'
import fighters from '@/assets/fighters.json'
import { logEvent } from '@/utils/analytics.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  props: {
    lastRecord: {
      default: null,
      type: Object
    },
    isShowInputDetails: {
      default: true,
      type: Boolean
    }
  },
  components: {
    Button,
    ResultButton,
    TextField,
    FighterSelecter,
    StageSelecter
  },
  data() {
    return {
      record: {
        fighterId: null,
        opponentId: null,
        result: true,
        stage: ''
      },
      error: '',
      fighters,
    }
  },
  mounted() {
    if (!this.lastRecord) return
    this.record.fighterId = this.lastRecord.fighterId
    this.record.opponentId = this.lastRecord.opponentId
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records
    },
    usedFighterIds() {
      if (!this.records.length) return Object.keys(this.fighters).sort()
      const used = this.records.map(record => {
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
    isWin() {
      this.record.result = true
    },
    isLose() {
      this.record.result = false
    },
    async submit () {
      console.log('submit', this.record.fighterId, this.record.opponentId)
      this.error = ''
      if (!this.record.fighterId || !this.record.opponentId || this.record.result === null) {
        this.error = '自分・相手・結果は入力してください'
        return
      }
      const newRecord = {
        createdAt: serverTimestamp,
        updatedAt: serverTimestamp,
        roomType: 'arena',
        userId: this.user.userId,
        fighter: this.fighters[this.record.fighterId].name,
        fighterId: this.record.fighterId,
        opponent: this.fighters[this.record.opponentId].name,
        opponentId: this.record.opponentId,
        result: this.record.result,
        stage: this.$refs.stage.input,
        against: this.$refs.against.input
      }
      const updateUserDto = {
        resultsArena: {
          matches: this.user.resultsArena.matches + 1,
          wins: this.record.result ? this.user.resultsArena.wins + 1 : this.user.resultsArena.wins,
          loses: this.record.result ? this.user.resultsArena.loses : this.user.resultsArena.loses + 1,
        },
        updatedAt: serverTimestamp
      }
      const db = firebase.firestore()
      const batch = db.batch()
      try {
        const newRecordRef = db.collection('records').doc()
        batch.set(newRecordRef, newRecord)
        const userRef = db.collection('users').doc(this.user.userId)
        batch.update(userRef, updateUserDto)
        batch.commit().catch(function(error) {
          console.log("Error updating in batch:", error);
        })
        newRecord.docId = newRecordRef.id
        this.$store.dispatch('addRecords', newRecord)
        this.$store.dispatch('updateUser', updateUserDto)
        logEvent('addResult', undefined)
        this.onClose()
      } catch(error) {
        console.log('error in sending record', error)
      }
    },
    switchShowDetails() {
      this.isShowInputDetails = !this.isShowInputDetailss
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
  height: 90%;
  max-width: 400px;
  z-index: 30;
}
.close {
  position: absolute;
  margin: 8px 8px 0 0;
  right: 0;
  top: 0;
}
.details {
  margin: 20px 0 30px 0;
}
</style>
