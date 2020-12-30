<template>
  <div class="records-table">
    <div class="mx-auto py-2 px-1">
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height: 100%;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr class="text-left">
              <th
                v-for="heading in headings" :key="heading.key"
                class="bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
              >{{ heading.value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td class="border-dashed border-t border-gray-200 px-3">
                <span class="text-gray-700 px-1 py-3 flex items-center">{{ record.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }).slice(0, 5) }}</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <FighterIcon :fighterId="record.fighterId" size="32px" />
              </td>
              <td class="border-dashed border-t border-gray-200">
                <FighterIcon :fighterId="record.opponentId" size="32px" />
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span v-if="record.result" class="text-red-700 px-3 py-3 flex items-center">勝ち</span>
                <span v-else class="text-blue-700 px-3 py-3 flex items-center">負け</span>
              </td>
              <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 px-3 py-3 flex items-center">{{ record.globalSmashPower }}</span>
              </td>
              <!-- <td class="border-dashed border-t border-gray-200">
                <span class="text-gray-700 px-3 py-3 flex items-center" x-text="record.stage">{{ jpStageName(record.stage) }}</span>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import FighterIcon from '@/components/FighterIcon.vue'
import fighters from '@/assets/fighters.json'

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  components: {
    FighterIcon
  },
  data() {
    return {
      fighters,
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
    jpStageName(stageE) {
      return this.stages[stageE]
    },
    get() {
      const fightersVals = Object.values(this.fighters)
      console.log(fightersVals)
    }
  }
}
</script>

<style scoped lang="scss">
.records-table {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  // align-items: center;
}
ul {
  display: flex;
  flex-direction: column;
}
li {
  list-style-type: none;
}
</style>