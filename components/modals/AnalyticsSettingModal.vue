<template>
  <div class="flex flex-col overflow-auto">
    <div class="modal-header">
      <h2 class="text-xl py-2 border-b">分析の詳細設定</h2>
    </div>
    <div class="modal-content pt-4 overflow-auto">
      <p class="error">{{ error }}</p>
      <div class="pl-4 pb-4">
        <p class="text-lg text-left pb-2">並べ替え</p>
        <!-- <div class="toggleDescending">
          <template>
            <div class="flex justify-between items-center px-4 py-1" @click="toggleSort">
              <p class="text-right pr-2">逆順</p>
              <div class="w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': analyticsSettings.descending}">
                <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': analyticsSettings.descending,}"></div>
              </div>
            </div>
          </template>
        </div> -->
        <div class="flex flex-wrap">
          <RadioButton v-model="analyticsSettings.sorting" label="相手ファイター順" value="opponentId" />
          <RadioButton v-model="analyticsSettings.sorting" label="試合数" value="matches" />
          <RadioButton v-model="analyticsSettings.sorting" label="勝率" value="winningPercentage" />
        </div>
      </div>
      <div class="pl-4 pb-10 flex flex-col">
        <p class="text-lg text-left pb-2">期間</p>
        <form class="mb-4 text-gray-800 flex flex-wrap justify-start items-center">
          <div class="option pb-1">
          <input
            id="selectMethod-period"
            v-model="selectMethod"
            type="radio"
            name="period"
            :value="'period'"
          />
          <label for="selectMethod-period" class="pr-2 whitespace-nowrap">日数で絞る(n日前まで)</label>
          </div>
          <div class="option pb-1">
          <input
            id="selectMethod-date"
            v-model="selectMethod"
            type="radio"
            name="date"
            :value="'date'"
          />
          <label for="selectMethod-date" class="pr-2 whitespace-nowrap">日付を指定して絞る(m月n日以降)</label>
          </div>
        </form>
        <div class="h-20 flex justify-start">
          <div v-if="selectMethod === 'period'" class="flex pr-4 flex-wrap justify-start items-center">
            <RadioButton v-model="analyticsSettings.period" label="本日" :value="0" />
            <RadioButton v-model="analyticsSettings.period" label="1日" :value="1" />
            <RadioButton v-model="analyticsSettings.period" label="7日" :value="7" />
            <RadioButton v-model="analyticsSettings.period" label="30日" :value="30" />
            <RadioButton v-model="analyticsSettings.period" label="全期間" value="whole" />
          </div>
          <date-picker v-else-if="selectMethod === 'date'" v-model="selectDate" valueType="format"></date-picker>
        </div>
      </div>
      <div class="fighter-selecter pb-3">
        <p class="text-lg text-left pl-4">自分のファイターで絞る</p>
        <button @click="selectAllFighters" class="flex items-start pl-4 text-gray-700">全ファイター表示</button>
        <FighterSelecter
          @select="select"
          ref="fighter"
          :usedFighterIds="usedFighterIds"
          :previouslySelected="analyticsSettings.selectedMyFighter"
          iconSize="40px"
          class="pl-4"
        />
      </div>
      <StageSelecter
        ref="stageSelecter"
        :previousSelect="analyticsSettings.stage"
        :isShowOptionAll="true"
        :isShowOptionEmpty="false"
        class="pl-4"
      />
      <div class="input-radio pb-6 flex flex-col items-start">
        <p class="text-lg text-left pl-4">相手ファイターでまとめる</p>
        <div class="pl-5">
          <input v-model="analyticsSettings.groupSimilarFighters" type="radio" name="allFighters" :value="false"/>
          <label for="allFighters">全ファイター表示</label>
        </div>
        <div class="pl-5">
          <input v-model="analyticsSettings.groupSimilarFighters" type="radio" name="similar" :value="true"/>
          <label for="similar">類似ファイターでまとめる</label>
        </div>
      </div>
      <div class="pl-4 pb-6">
        <p class="text-lg text-left pb-2">ストック数</p>
        <div class="flex pr-4 flex-wrap justify-start items-center">
          <RadioButton v-model="analyticsSettings.stocks" label="全部" value="all" />
          <RadioButton v-model="analyticsSettings.stocks" label="2スト" :value="2" />
          <RadioButton v-model="analyticsSettings.stocks" label="3スト" :value="3" />
        </div>
      </div>
      <div class="input-radio pb-6 flex flex-col items-start">
        <p class="text-lg text-left pl-4">その他</p>
        <Checkbox ref="filterRepeat" :defaultValue="analyticsSettings.filterRepeat" label="連戦を省く" class="pl-4" />
      </div>
      <div class="flex justify-between text-gray-700 pb-3">
        <button @click="resetSettings" class="flex items-end ml-4">設定をリセット</button>
      </div>
    </div>
    <div class="modal-footer border-t pt-2">
      <Button @onClick="save" label="設定を保存する" />
    </div>
  </div>
</template>

<script>
import TextField from '@/components/input/TextField.vue'
import Button from '@/components/parts/Button.vue'
import Checkbox from '@/components/input/Checkbox.vue'
import RadioButton from '@/components/input/RadioButton.vue'
import FighterSelecter from '@/components/parts/FighterSelecter.vue'
import StageSelecter from '@/components/parts/StageSelecter.vue'
import fighters from '@/assets/fighters.json'
import { today } from '@/utils/date.js'
import { logEvent } from '@/utils/analytics.js'

export default {
  props: {
    analyticsSettings: {
      required: false,
      type: Object
    }
  },
  components: {
    Button,
    Checkbox,
    TextField,
    RadioButton,
    FighterSelecter,
    StageSelecter
  },
  data() {
    return {
      error: '',
      fighters,
      today: today(),
      selectDate: null,
      selectMethod: 'period'
    }
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
      this.analyticsSettings.selectedMyFighter = String(this.$refs.fighter.get())
      console.log('select', this.analyticsSettings.selectedMyFighter)
    },
    selectAllFighters() {
      this.analyticsSettings.selectedMyFighter = 'all'
    },
    toggleSort() {
      return this.analyticsSettings.descending = !this.analyticsSettings.descending
    },
    save() {
      if (this.selectMethod === 'date') {
        const selectDate = new Date(Number(this.selectDate.slice(0,4)), Number(this.selectDate.slice(5,7)) - 1, Number(this.selectDate.slice(8,10)))
        this.analyticsSettings.period = Math.round((this.today - selectDate)/1000/60/60/24)
      }
      this.analyticsSettings.fighterId = this.fighterId
      this.analyticsSettings.stage = this.$refs.stageSelecter.stage
      this.$store.commit('setAnalyticsSettings', {
        ...this.analyticsSettings,
        filterRepeat: this.$refs.filterRepeat.get()
      })
      logEvent('saveAnalyticsSettings', undefined)
      this.$emit('close')
    },
    resetSettings() {
      this.$store.commit('setAnalyticsSettings', {
        sorting: 'opponentId',
        period: 30,
        selectedMyFighter: 'all',
        groupSimilarFighters: false,
        stage: 'all',
        stocks: 'all',
        filterRepeat: false
      })
      this.$emit('close')
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.option {
  padding-bottom: 2px;
}
label {
  white-space: nowrap;
  padding-right: 8px;
}
</style>
