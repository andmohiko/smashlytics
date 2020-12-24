<template>
  <div class="records-table">
    <div class="container mx-auto py-6 px-4">
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height: 405px;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <!-- <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                <label
                  class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                  <input type="checkbox" class="form-checkbox focus:outline-none focus:shadow-outline" @click="selectAllCheckbox($event);">
                </label>
              </th> -->
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
                <span class="text-gray-700 px-6 py-3 flex items-center">{{ jpName(record.fighter) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 px-6 py-3 flex items-center">{{ jpName(record.opponent) }}</span>
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
  // computed: {
  //   fighters() {
  //     return this.$store.state.fighters
  //   }
  // },
  methods: {
    bool2result(result) {
      return result ? '勝ち' : '負け'
    },
    jpName(fighterE) {
      return this.fighters[fighterE].japanese
    },
    jpStageName(stageE) {
      return this.stages[stageE]
    },
    get() {
      const fightersVals = Object.values(this.fighters)
      console.log(fightersVals)
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