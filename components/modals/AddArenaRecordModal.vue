<template>
  <div class="flex flex-col overflow-auto">
    <div class="modal-header">
      <h2 class="text-xl py-2 border-b">専用部屋の戦績を登録する</h2>
    </div>
    <div class="modal-content pt-2 overflow-auto">
      <p class="error">{{ error }}</p>
      <div class="fighter-selecter">
        <FighterSelecter
          @select="select"
          ref="fighter"
          :usedFighterIds="usedFighterIds"
          :previouslySelected="lastRecord.fighterId"
          iconSize="44px"
          :isShowAllOption="true"
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
      
      <div class="mt-6 px-4">
        <span class="text-gray-700 px-1 pt-3 flex items-center">▼詳しく記録したい人向け</span>
        <span class="text-gray-600 text-xs px-1 pb-4 flex items-center">入力しておくとあとで詳しく分析できるよ！</span>
        <AgainstSelecter ref="againstSelect" :fightedPlayers="fightedPlayers" :previousSelect="''" />
        <span class="text-gray-700 text-base">名前を入力する</span>
        <TextField ref="againstText" label="対戦相手" :isLabelShow="false" placeholder="はじめて対戦した人なら入力してね" class="pb-4"/>
        <StageSelecter ref="stageSelecter" :isShowSmamateStages="true" :previousSelect="lastRecord.stage" class="pb-4" />
        <StocksSelecter ref="stocksSelecter" :defaultValue="lastRecord.stocks" />
      </div>
    </div>
    <div class="modal-footer border-t pt-2">
      <ResultButton @clickWin="isWin" @clickLose="isLose" class="pb-2" />
      <div class="submit">
        <Button @onClick="submit" label="登録する" />
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
import fighters from '@/assets/fighters.json'
import { logEvent } from '@/utils/analytics.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  props: {
    lastRecord: {
      default: null,
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
    AgainstSelecter
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
      return this.$store.state.records.filter(record => record.roomType === 'arena')
    },
    usedFighterIds() {
      if (!this.records.length) return Object.keys(this.fighters).sort()
      const used = this.records.map(record => {
        return record.fighterId
      })
      return Array.from(new Set(used)).sort()
    },
    fightedPlayers() {
      if (!this.records.length) return []
      const fighted = this.records
        .map(record => {
          return record.against
        })
        .filter(player => Boolean(player))
      return Array.from(new Set(fighted))
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
        this.error = '自分・相手のファイター・結果は入力してください'
        return
      }
      // 選択入力を優先する
      const against = this.$refs.againstSelect.input ? this.$refs.againstSelect.input : this.$refs.againstText.input
      const newRecord = {
        createdAt: serverTimestamp,
        updatedAt: serverTimestamp,
        roomType: 'arena',
        userId: this.user.userId,
        userOriginalId: this.user.userOriginalId,
        fighter: this.fighters[this.record.fighterId].name,
        fighterId: this.record.fighterId,
        opponent: this.fighters[this.record.opponentId].name,
        opponentId: this.record.opponentId,
        result: this.record.result,
        stage: this.$refs.stageSelecter.stage,
        against,
        stocks: this.$refs.stocksSelecter.stocks
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
        batch
        .commit()
        .then(() => {
          newRecord.docId = newRecordRef.id
          this.$store.dispatch('addRecords', newRecord)
          this.$store.dispatch('updateUser', updateUserDto)
          logEvent('addArenaResult', undefined)
        })
        .catch(function(error) {
          console.log("Error updating in batch:", error);
          this.$store.commit('setNotice', { noticeType: 'error', message: "戦績の登録に失敗しました。\nリロードして再度試してください" })
        })
        this.onClose()
      } catch(error) {
        console.log('error in sending record', error)
        this.$store.commit('setNotice', { noticeType: 'error', message: "戦績の登録に失敗しました。\nリロードして再度試してください" })
      }
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
</style>
