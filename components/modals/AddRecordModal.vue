<template>
  <div class="flex flex-col overflow-auto">
    <div class="modal-header">
      <h2 class="text-xl py-2 border-b">オンラインの戦績を登録する</h2>
    </div>
    <div class="modal-content pt-2 overflow-auto">
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
      
      <div class="mt-6 px-4 mb-2">
        <span class="text-gray-700 px-1 pt-3 flex items-center">▼詳しく記録したい人向け</span>
        <span class="text-gray-600 text-xs px-1 pb-4 flex items-center">入力しておくとあとで詳しく分析できるよ！</span>
        <TextField ref="globalSmashPower" :allowEmpty="false" label="世界戦闘力(万)" placeholder="504" suffix="万" width="90px" class="pb-2" />
        <StageSelecter ref="stageSelecter" :isShowOptionEmpty="false" />
        <StocksSelecter ref="stocksSelecter" :isShowOptionEmpty="false" />
        <Checkbox ref="isRepeat" label="連戦だった" />
        <Checkbox ref="isVip" :defaultValue="lastRecord.isVip" label="VIP入りしている" />
      </div>
    </div>
    <div class="modal-footer border-t pt-2">
      <ResultButton @clickWin="isWin" @clickLose="isLose" class="pb-2" />
      <p class="error">{{ error }}</p>
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
import Checkbox from '@/components/input/Checkbox.vue'
import fighters from '@/assets/fighters.json'
import { logEvent } from '@/utils/analytics.js'
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  props: {
    lastRecord: {
      required: false,
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
    Checkbox
  },
  data() {
    return {
      record: {
        fighterId: null,
        opponentId: null,
        result: true,
        globalSmashPower: null,
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
    // if (this.lastRecord.stage || this.lastRecord.globalSmashPower) this.isShowInputDetails = true
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      return this.$store.state.records.filter(record => record.roomType !== 'arena')
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
      this.record.globalSmashPower = this.$refs.globalSmashPower.input
      if (!this.record.fighterId || !this.record.opponentId || this.record.result === null) {
        this.error = '自分・相手・結果は入力してください'
        return
      }
      const globalSmashPower = Number(this.record.globalSmashPower)
      if (this.record.globalSmashPower && !Number.isInteger(globalSmashPower)) {
        this.error = '世界戦闘力には整数を入力してください'
        return
      }
      if (this.record.globalSmashPower && (globalSmashPower < 1 || globalSmashPower > 2000)) {
        this.error = '世界戦闘力は1万~2000万の間で入力してください'
        return
      }
      const newRecord = {
        createdAt: serverTimestamp,
        updatedAt: serverTimestamp,
        userId: this.user.userId,
        userOriginalId: this.user.userOriginalId,
        roomType: 'online',
        fighter: this.fighters[this.record.fighterId].name,
        fighterId: this.record.fighterId,
        opponent: this.fighters[this.record.opponentId].name,
        opponentId: this.record.opponentId,
        result: this.record.result,
        stage: this.$refs.stageSelecter.stage,
        globalSmashPower: this.record.globalSmashPower ? globalSmashPower * 10000 : null,
        stocks: this.$refs.stocksSelecter.stocks,
        isRepeat: this.$refs.isRepeat.input,
        isVip: this.$refs.isVip.input
      }
      const updateUserDto = {
        results: {
          matches: this.user.results.matches + 1,
          wins: this.record.result ? this.user.results.wins + 1 : this.user.results.wins,
          loses: this.record.result ? this.user.results.loses : this.user.results.loses + 1,
        },
        updatedAt: serverTimestamp
      }
      const db = firebase.firestore()
      const batch = db.batch()
      try {
        const newRecordRef = db.collection('records').doc()
        batch.set(newRecordRef, newRecord)
        const userRef = db.collection('users').doc(this.user.authId)
        batch.update(userRef, updateUserDto)
        batch
        .commit()
        .then(() => {
          newRecord.docId = newRecordRef.id
          this.$store.dispatch('addRecords', newRecord)
          this.$store.dispatch('updateUser', updateUserDto)
          logEvent('addResult', undefined)
        })
        .catch(error => {
          console.log('error in batch sending record', error)
          this.$store.commit('setNotice', { noticeType: 'error', message: "戦績の登録に失敗しました。\nリロードして再度試してください" })
        })
        this.onClose()
      } catch(error) {
        this.$store.commit('setNotice', { noticeType: 'error', message: '戦績の登録に失敗しました。\nリロードして再度試してください' })
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
.error {
  color: #ff0000;
  padding-bottom: 4px;
}
</style>
