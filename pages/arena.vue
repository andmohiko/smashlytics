<template>
  <div class="container">
    <div class="add">
      <template v-if="isShowAddModal">
        <ModalBase @close="closeModal">
          <AddArenaRecordModal :lastRecord="lastRecord" @close="closeModal" />
        </ModalBase>
      </template>
    </div>
    <div class="edit">
      <template v-if="isShowEditModal">
        <ModalBase @close="closeModal">
          <EditArenaRecordModal :editingRecord="editingRecord" @close="closeModal" />
        </ModalBase>
      </template>
    </div>

    <div class="results pt-2">
      <p v-show="isLogin" class="results-number">本日の戦績: {{ resultsToday }}</p>
      <Button @onClick="openAddModal" label="戦績を登録する" />
    </div>

    <div class="records">
      <div class="mx-auto py-2 px-1">
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height: 100%;">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <thead>
              <tr class="text-left">
                <th
                  v-for="heading in headings" :key="heading.id"
                  class="bg-gray-100 sticky top-0 border-b border-gray-200 px-3 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
                >{{ heading }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in records" :key="record.id">
                <td class="border-dashed border-t border-gray-200 px-3">
                  <span class="text-gray-700 px-1 py-2 flex items-center">
                    {{ record.createdAtString.split(' ')[0].slice(5) }}
                  </span>
                </td>
                <td class="border-dashed border-t border-gray-200">
                  <FighterIcon :fighterId="record.fighterId" size="32px" />
                </td>
                <td class="border-dashed border-t border-gray-200">
                  <FighterIcon :fighterId="record.opponentId" size="32px" />
                </td>
                <td class="border-dashed border-t border-gray-200">
                  <span class="text-gray-700 px-2 py-3 flex items-center">{{ normalizeAgainstName(record.against) }}</span>
                </td>
                <td class="border-dashed border-t border-gray-200">
                  <span v-if="record.result" class="text-red-700 px-2 py-3 flex items-center">勝ち</span>
                  <span v-else class="text-blue-700 px-2 py-3 flex items-center">負け</span>
                </td>
                <td class="border-dashed border-t border-gray-200 text-gray-600 text-xs">
                  <button class="pt-1" @click="openEditModal(record)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13L11 5ZM17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9V12.1716L17.5858 3.58579Z" stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="pt-2 pb-4" v-if="!isShowAllRecords">
      <Button @onClick="showAllRecords" label="戦績をもっと表示する" />
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { now, date2string } from '@/utils/date.js'
import Button from '@/components/parts/Button.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import ModalBase from '@/components/modals/ModalBase.vue'
import AddArenaRecordModal from '@/components/modals/AddArenaRecordModal.vue'
import EditArenaRecordModal from '@/components/modals/EditArenaRecordModal.vue'
import fighters from '@/assets/fighters.json'

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export default {
  components: {
    FighterIcon,
    ModalBase,
    AddArenaRecordModal,
    EditArenaRecordModal,
    Button
  },
  data() {
    return {
      fighters,
      headings: ['日付','自分','相手','','勝敗','編集'],
      isShowAddModal: false,
      isShowEditModal: false,
      editingRecord: {},
      now: now(),
      isShowAllRecords: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      if (this.isShowAllRecords) {
        return this.$store.state.records.filter(record => record.roomType === 'arena')
      }
      return this.$store.state.records.filter(record => record.roomType === 'arena').slice(0, 30)
    },
    isLogin() {
      return Boolean(this.$store.state.user.userId)
    },
    lastRecord() {
      if (this.records.length) return this.records[0]
      return {
        fighterId: '01',
        opponentId: '01',
      }
    },
    resultsToday() {
      const today = date2string(this.now).split(' ')[0]
      const recordsToday = this.$store.state.records
        .filter(record => record.roomType === 'arena')
        .filter(record => record.createdAtString.split(' ')[0] === today)
      const wins = recordsToday.filter(record => record.result).length
      return wins + '勝' + (recordsToday.length - wins) + '敗'
    }
  },
  methods: {
    async getRecords() {
      await this.$store.dispatch('getRecords', this.user.userId)
    },
    normalizeAgainstName(name) {
      if (name.length < 6) return name
      return name.slice(0,4) + '...'
    },
    showAllRecords() {
      this.isShowAllRecords = true
    },
    openAddModal() {
      this.isShowAddModal = true
      this.$store.dispatch('setIsShowModal', true)
    },
    openEditModal(record) {
      this.isShowEditModal = true
      this.editingRecord = record
      this.$store.dispatch('setIsShowModal', true)
    },
    closeModal() {
      this.isShowAddModal = false
      this.isShowEditModal = false
      this.$store.dispatch('setIsShowModal', false)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.get {
  span {
    display: inline-block;
  }
}
.records {
  margin: 10px 0;
}
.title {
  margin: 40px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.results {
  &-number {
    font-size: 20px;
    color: #4a5568;
    letter-spacing: 2px;
    margin: 4px 0 4px 0;
  }
}

</style>