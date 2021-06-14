<template>
  <div class="flex flex-col overflow-auto">
    <div class="modal-header">
      <h2 class="text-xl py-2 border-b">戦績を更新する</h2>
    </div>
    <div class="modal-content pt-2 overflow-auto">
      <p class="error">{{ error }}</p>
      <div class="fighter-selecter">
        <FighterSelecter
          @select="select"
          ref="fighter"
          :usedFighterIds="usedFighterIds"
          :previouslySelected="editingRecord.fighterId"
          iconSize="44px"
          :isShowAllOption="true"
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
      
      <div class="mt-6 px-4">
        <span class="text-gray-700 px-1 pt-3 flex items-center">▼詳しく記録したい人向け</span>
        <span class="text-gray-600 text-xs px-1 pb-4 flex items-center">入力しておくとあとで詳しく分析できるよ！</span>
        <AgainstSelecter ref="againstSelect" :fightedPlayers="fightedPlayers" :previousSelect="editingRecord.against" />
        <span class="text-gray-700 text-base">名前を入力する</span>
        <TextField ref="againstText" label="対戦相手" :isLabelShow="false" placeholder="はじめて対戦した人なら入力してね" class="pb-4" />
        <StageSelecter
          ref="stageSelecter"
          :isShowSmamateStages="true"
          :previousSelect="editingRecord.stage"
          :isShowOptionEmpty="true"
        />
        <!-- <StocksSelecter ref="stocksSelecter" :defaultValue="editingRecord.stocks" /> -->
      </div>
    </div>
    <div class="modal-footer border-t pt-2">
      <div class="pb-1">
        <Button @onClick="updateRecord" label="更新する" buttonType="high" />
      </div>
      <div class="pt-1">
        <Button @onClick="deleteRecord" label="削除する" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import TextField from '@/components/input/TextField.vue'
import Button from '@/components/parts/Button.vue'
import ResultButton from '@/components/parts/ResultButton.vue'
import FighterSelecter from '@/components/parts/FighterSelecter.vue'
import StageSelecter from '@/components/parts/StageSelecter.vue'
import StocksSelecter from '@/components/parts/StocksSelecter.vue'
import AgainstSelecter from '@/components/parts/AgainstSelecter.vue'
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
    }
  },
  components: {
    Button,
    ResultButton,
    TextField,
    FighterSelecter,
    StageSelecter,
    StocksSelecter,
    AgainstSelecter,
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
    },
    fightedPlayers() {
      const arenaRecords = this.$store.state.records.filter(record => Boolean(record.against))
      if (!arenaRecords.length) return []
      const fighted = arenaRecords.map(record => {
        return record.against
      })
      return Array.from(new Set(fighted))
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
        this.error = '自分・相手のファイター・結果は入力してください'
        return
      }
      // 選択入力を優先する
      const against = this.$refs.againstSelect.input ? this.$refs.againstSelect.input : this.$refs.againstText.input
      let updatingRecord = {
        updatedAt: serverTimestamp,
        roomType: 'arena',
        fighter: this.fighters[this.editingRecord.fighterId].name,
        fighterId: this.editingRecord.fighterId,
        opponent: this.fighters[this.editingRecord.opponentId].name,
        opponentId: this.editingRecord.opponentId,
        result: this.editingRecord.result,
        stage: this.$refs.stageSelecter.stage,
        against,
        // stocks: this.$refs.stocksSelecter.stocks
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
        logEvent('editArenaResult', undefined)
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
            resultsArena: {
              matches: this.user.resultsArena.matches,
              wins: updatingRecord.result ? this.user.resultsArena.wins + 1 : this.user.resultsArena.wins - 1,
              loses: updatingRecord.result ? this.user.resultsArena.loses - 1 : this.user.resultsArena.loses + 1,
            }
          }
          updateUser(this.user, updateUserDto)
          logEvent('reverseArenaResult', undefined)
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
          resultsArena: {
            matches: this.user.resultsArena.matches - 1,
            wins: this.editingRecord.result ? this.user.resultsArena.wins - 1 : this.user.resultsArena.wins,
            loses: this.editingRecord.result ? this.user.resultsArena.loses : this.user.resultsArena.loses - 1,
          }
        }
        updateUser(this.user, updateUserDto)
        this.$store.dispatch('getUser', this.user.userId)
        logEvent('deleteArenaResult', undefined)
        console.log('deleted record')
      } catch(error) {
        console.log('error deleting record', error)
      }
      this.onClose()
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
</style>
