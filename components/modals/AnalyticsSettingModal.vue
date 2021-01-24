<template>
  <div class="modal-bg">
    <div class="modal bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 flex flex-col overflow-auto">
      <div class="modal-header">
        <div class="close" @click="onClose">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="text-xl py-2 border-b">分析の詳細設定</h2>
      </div>
      <div class="modal-content pt-2 overflow-auto">
        <p class="error">{{ error }}</p>
        <div class="input-radio pb-6 flex flex-col items-start">
          <div class="sort flex justify-between items-center">
            <p class="text-lg text-left pl-4">並べ替え</p>
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
          </div>
          <div class="pl-4">
            <input v-model="analyticsSettings.sorting" type="radio" name="fighterId" value="opponentId"/>
            <label for="1">相手ファイター順</label>
            <input v-model="analyticsSettings.sorting" type="radio" name="matches" value="matches"/>
            <label for="3">試合数</label>
            <input v-model="analyticsSettings.sorting" type="radio" name="winningPercentage" value="winningPercentage"/>
            <label for="7">勝率</label>
          </div>
        </div>
        <div class="input-radio pb-6 flex flex-col items-start">
          <p class="text-lg text-left pl-4">期間(日)</p>
          <div class="pl-4">
            <input v-model="analyticsSettings.period" type="radio" name="1" :value="1"/>
            <label for="1">1日</label>
            <input v-model="analyticsSettings.period" type="radio" name="3" :value="3"/>
            <label for="3">3日</label>
            <input v-model="analyticsSettings.period" type="radio" name="7" :value="7"/>
            <label for="7">7日</label>
            <input v-model="analyticsSettings.period" type="radio" name="30" :value="30"/>
            <label for="30">30日</label>
            <input v-model="analyticsSettings.period" type="radio" name="whole" :value="'whole'"/>
            <label for="whole">全期間</label>
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
        <div class="input-radio pb-6 flex flex-col items-start">
          <p class="text-lg text-left pl-4">ステージ</p>
          <div class="pl-4">
            <input v-model="analyticsSettings.stage" type="radio" name="allStages" value="all"/>
            <label for="allStages">全部</label>
            <input v-model="analyticsSettings.stage" type="radio" name="finalDestination" value="finalDestination"/>
            <label for="finalDestination">終点</label>
            <input v-model="analyticsSettings.stage" type="radio" name="battleField" value="battleField"/>
            <label for="battleField">戦場</label>
            <input v-model="analyticsSettings.stage" type="radio" name="smallBattleField" value="smallBattleField"/>
            <label for="smallBattleField">小戦場</label>
          </div>
        </div>
        <!-- <div class="input-radio pb-6 flex flex-col items-start">
          <p class="text-lg text-left pl-4">ストック数</p>
          <div class="pl-4">
            <input v-model="analyticsSettings.stocks" type="radio" name="allStocks" value="all" />
            <label for="allStages">全部</label>
            <input v-model="analyticsSettings.stocks" type="radio" name="2stocks" :value="2" />
            <label for="2stocks">2スト</label>
            <input v-model="analyticsSettings.stocks" type="radio" name="3stocks" :value="3" />
            <label for="3stocks">3スト</label>
            <input v-model="analyticsSettings.stocks" type="radio" name="other" value="other"/>
            <label for="other">その他</label>
          </div>
        </div> -->
        <div class="input-radio pb-6 flex flex-col items-start">
          <p class="text-lg text-left pl-4">その他</p>
          <Checkbox ref="filterRepeat" :defaultValue="analyticsSettings.filterRepeat" label="連戦を省く" class="pl-4" />
        </div>
      </div>
      <div class="modal-footer border-t pt-2">
        <Button @onClick="save" label="設定を保存する" />
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/input/TextField.vue'
import Button from '@/components/parts/Button.vue'
import Checkbox from '@/components/input/Checkbox.vue'
import FighterSelecter from '@/components/parts/FighterSelecter.vue'
import StageSelecter from '@/components/parts/StageSelecter.vue'
import fighters from '@/assets/fighters.json'
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
    FighterSelecter,
    StageSelecter
  },
  data() {
    return {
      error: '',
      fighters
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
      this.analyticsSettings.fighterId = this.fighterId
      this.$store.commit('setAnalyticsSettings', {
        ...this.analyticsSettings,
        filterRepeat: this.$refs.filterRepeat.get()
      })
      logEvent('saveAnalyticsSettings', undefined)
      this.$emit('close')
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
.modal  {
  position: relative;
  max-height: 90%;
  width: 100vw;
  z-index: 30;
}
@media screen and (min-width: 400px) {
  .modal {
    max-width: 400px;
  }
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
