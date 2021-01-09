<template>
  <div class="modal-bg">
    <div class="record-modal bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 flex flex-col overflow-auto">
      <div class="close" @click="onClose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="form">
        <h2 class="text-xl py-2 border-b mb-4">戦績を更新する</h2>
        <p class="error">{{ error }}</p>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="fighter"
            :usedFighterIds="usedFighterIds"
            :previouslySelected="editingRecord.fighterId"
            iconSize="44px"
            :isShowOption="true"
            label="自分のファイター"
          />
        </div>
        <div class="fighter-selecter">
          <FighterSelecter
            @select="select"
            ref="opponent"
            :previouslySelected="editingRecord.opponentId"
            iconSize="44px"
            label="相手のファイター"
          />
        </div>
        <ResultButton :previousResult="editingRecord.result" @clickWin="isWin" @clickLose="isLose" class="pt-4 pb-2" />
        
        <div v-show="isShowInputDetails" class="details mt-15 mb-25 px-4">
          <span class="text-gray-700 px-1 pt-3 flex items-center">▼詳しく記録したい人向け</span>
          <span class="text-gray-600 text-xs px-1 pb-3 flex items-center">入力しておくとあとで詳しく分析できるよ！</span>
          <StageSelecter ref="stage" :isShowSmamateStages="true" :previousSelect="editingRecord.stage" />
          <TextField ref="against" :defaultValue="editingRecord.against" label="対戦相手" placeholder="もひこ" />
        </div>
        <div class="pb-4">
          <Button @onClick="updateRecord" label="更新する" />
        </div>
        <div class="pt-4">
          <Button @onClick="deleteRecord" label="削除する" />
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
import Checkbox from '@/components/input/Checkbox.vue'
import { now, date2string } from '@/utils/date.js'
import fighters from '@/assets/fighters.json'
import { updateUser } from '@/repositories/users.js'
import { logEvent } from '@/utils/analytics.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  props: {
    editingRecord: {
      required: true,
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
    StageSelecter,
    Checkbox
  },
  data() {
    return {
      editedRecord: {},
      error: '',
      fighters,
      now: now(),
      originalResult: null
    }
  },
  mounted() {
    this.originalResult = this.editingRecord.result
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records
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
      this.editingRecord.fighterId = String(this.$refs.fighter.get())
      this.editingRecord.opponentId = String(this.$refs.opponent.get())
      console.log('submit', this.editingRecord.fighterId, this.editingRecord.opponentId)
    },
    isWin() {
      this.editingRecord.result = true
    },
    isLose() {
      this.editingRecord.result = false
    },
    async updateRecord () {
      this.error = ''
      if (!this.editingRecord.fighterId || !this.editingRecord.opponentId || this.editingRecord.result === null) {
        this.error = '自分・相手・結果は入力してください'
        return
      }
      let updatingRecord = {
        updatedAt: serverTimestamp,
        roomType: 'arena',
        fighter: this.fighters[this.editingRecord.fighterId].name,
        fighterId: this.editingRecord.fighterId,
        opponent: this.fighters[this.editingRecord.opponentId].name,
        opponentId: this.editingRecord.opponentId,
        result: this.editingRecord.result,
        stage: this.$refs.stage.input,
        against: this.$refs.against.input
      }
      const db = firebase.firestore()
      try {
        const sendingRecord = db
          .collection('records')
          .doc(this.editingRecord.docId)
          .update(updatingRecord)
          .catch(error => {
            console.log(error)
          })
        logEvent('editResult', undefined)
        const updatedRecords = this.records.map(record => {
          if (record.docId !== this.editingRecord.docId) return record
          updatingRecord.createdAt = this.editingRecord.createdAt
          updatingRecord.createdAtString = this.editingRecord.createdAtString
          updatingRecord.updatedAt = this.now
          updatingRecord.docId = this.editingRecord.docId
          return updatingRecord
        })
        this.$store.commit('setRecords', updatedRecords)
        if (this.originalResult !== updatingRecord.result) {
          const updateUserDto = {
            results: {
              matches: this.user.results.matches,
              wins: updatingRecord.result ? this.user.results.wins + 1 : this.user.results.wins - 1,
              loses: updatingRecord.result ? this.user.results.loses - 1 : this.user.results.loses + 1,
            }
          }
          updateUser(this.user, updateUserDto)
          logEvent('reverseResult', undefined)
          this.$store.dispatch('getUser', this.user.userId)
        }
      } catch(error) {
        console.log('error in sending record', error)
      }
      this.onClose()
    },
    deleteRecord() {
      const db = firebase.firestore()
      try {
        db.collection("records").doc(this.editingRecord.docId).delete()
        const deletedRecords = this.records.filter(record => record.docId !== this.editingRecord.docId)
        this.$store.commit('setRecords', deletedRecords)
        const updateUserDto = {
          results: {
            matches: this.user.results.matches - 1,
            wins: this.editingRecord.result ? this.user.results.wins - 1 : this.user.results.wins,
            loses: this.editingRecord.result ? this.user.results.loses : this.user.results.loses - 1,
          }
        }
        updateUser(this.user, updateUserDto)
        this.$store.dispatch('getUser', this.user.userId)
        logEvent('deleteResult', undefined)
        console.log('deleted record')
      } catch(error) {
        console.log('error deleting record', error)
      }
      this.onClose()
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
