<template>
  <div class="records-table">
    <div class="container mx-auto py-0 px-4">
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height: 100%;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th
                v-for="heading in headings" :key="heading.key"
                class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >{{ heading.value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td class="border-dashed border-t border-gray-200 px-3">
                <span class="text-gray-700 px-6 py-3 flex items-center">{{ timestamp2dateString(record.createdAt) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <FighterIcon :fighterId="record.fighterId" size="32px" />
              </td>
              <td class="border-dashed border-t border-gray-200">
                <FighterIcon :fighterId="record.opponentId" size="32px" />
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 px-6 py-3 flex items-center">{{ bool2result(record.result) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 px-6 py-3 flex items-center">{{ record.globalSmashPower }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 px-6 py-3 flex items-center" x-text="record.stage">{{ jpStageName(record.stage) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { timestamp2dateString } from '@/utils/date.js'
import FighterIcon from '@/components/FighterIcon.vue'

export default {
  props: {
    records: {
      required: true,
      type: Array
    },
    fighters: {
      required: true,
      type: Object
    }
  },
  components: {
    FighterIcon
  },
  data() {
    return {
      headings: [
        {
          key: 'timestamp',
          value: '日付'
        },
        {
          key: 'fighter',
          value: '自分'
        },
        {
          key: 'opponent',
          value: '相手'
        },
        {
          key: 'result',
          value: '勝敗'
        },
        {
          key: 'globalSmashPower',
          value: '世界戦闘力'
        },
        {
          key: 'stage',
          value: 'ステージ'
        }
      ],
      stages: {
        finalDestination: '終点',
        battleField: '戦場',
        smallBattleField: '小戦場'
      }
    }
  },
  methods: {
    bool2result(result) {
      return result ? '勝ち' : '負け'
    },
    jpStageName(stageE) {
      return this.stages[stageE]
    },
    get() {
      const fightersVals = Object.values(this.fighters)
      console.log(fightersVals)
    },
    fighterIconPath(fighterId){
      const fighterEnName = this.fighters[fighterId].name_en
      return ''
    },
    timestamp2dateString
  }
}
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
}
li {
  list-style-type: none;
}
</style>