<template>
  <div class="container">
    <div class="add">
      <template v-if="isShowAddModal">
        <ModalBase @close="closeModal">
          <AddRecordModal :lastRecord="lastRecord" @close="closeModal" />
        </ModalBase>
      </template>
    </div>
    <div class="edit">
      <template v-if="isShowEditModal">
        <ModalBase @close="closeModal">
          <EditRecordModal :editingRecord="editingRecord" @close="closeModal" />
        </ModalBase>
      </template>
    </div>

    <div class="results">
      <p v-show="isLogin" class="my-2 text-xl text-gray-700 tracking-widest">本日の戦績: {{ resultsToday }}</p>
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
                  class="bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
                >{{ heading }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in records" :key="record.id">
                <td class="border-dashed border-t border-gray-200 px-3">
                  <span class="text-gray-700 px-1 py-3 flex items-center">
                    {{ record.createdAtString.slice(5, -3) }}
                  </span>
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
    <div class="pt-2" v-if="!isShowAllRecords">
      <Button @onClick="showAllRecords" label="戦績をもっと表示する" />
    </div>
    
    <p class="error text-xl py-2 mb-4 text-red-700">{{ error }}</p>
    <div v-show="error" class="border-b">
      <button @click="toNew">ログインはこちら</button>
    </div>

    <!-- <div class="add-button shadow-lg">
      <button @click="openModal">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0ZM17.25 12.9999H12.9999V17.25C12.9999 17.8021 12.5521 18.2499 12 18.2499C11.4479 18.2499 11.0001 17.8021 11.0001 17.25V12.9999H6.75C6.19794 12.9999 5.75006 12.5521 5.75006 12C5.75006 11.4479 6.19794 11.0001 6.75 11.0001H11.0001V6.75C11.0001 6.19794 11.4479 5.75006 12 5.75006C12.5521 5.75006 12.9999 6.19794 12.9999 6.75V11.0001H17.25C17.8021 11.0001 18.2499 11.4479 18.2499 12C18.2499 12.5521 17.8021 12.9999 17.25 12.9999V12.9999Z" fill="#579AFF"/>
        </svg>
      </button>
    </div> -->
  </div>
</template>

<script>
import { now, date2string } from '@/utils/date.js'
import Button from '@/components/parts/Button.vue'
import Records from '@/components/Records.vue'
import FighterIcon from '@/components/parts/FighterIcon.vue'
import ModalBase from '@/components/modals/ModalBase.vue'
import AddRecordModal from '@/components/modals/AddRecordModal.vue'
import EditRecordModal from '@/components/modals/EditRecordModal.vue'
// import Cookies from "universal-cookie"

export default {
  components: {
    Records,
    ModalBase,
    AddRecordModal,
    EditRecordModal,
    FighterIcon,
    Button
  },
  data() {
    return {
      isShowAddModal: false,
      isShowEditModal: false,
      headings: ['日付','自分','相手','勝敗','編集'],
      editingRecord: {},
      now: now(),
      isShowAllRecords: false,
      error: ''
    }
  },
  mounted() {
  //   const cookie = new Cookies()
  //   const auth_token = cookie.get('smash_access_token')
    // if (!Boolean(auth_token)) this.$router.push("/new")
    if (!this.$store.state.user.userId) this.$router.push("/new")
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    records() {
      if (this.isShowAllRecords) {
        return this.$store.state.records.filter(record => record.roomType !== 'arena')
      }
      return this.$store.state.records.filter(record => record.roomType !== 'arena').slice(0, 30)
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
        .filter(record => record.roomType !== 'arena')
        .filter(record => record.createdAtString.split(' ')[0] === today)
      const wins = recordsToday.filter(record => record.result).length
      return wins + '勝' + (recordsToday.length - wins) + '敗'
    }
  },
  methods: {
    showAllRecords() {
      this.isShowAllRecords = true
    },
    openAddModal() {
      this.error = ''
      if (!this.isLogin) {
        this.error = '登録するにはログインしてください'
        return
      }
      this.isShowAddModal = true
      this.$store.dispatch('setIsShowModal', true)
    },
    openEditModal(record) {
      this.error = ''
      if (!this.isLogin) {
        this.error = '編集するにはログインしてください'
        return
      }
      this.isShowEditModal = true
      this.editingRecord = record
      this.$store.dispatch('setIsShowModal', true)
    },
    closeModal() {
      this.isShowAddModal = false
      this.isShowEditModal = false
      this.$store.dispatch('setIsShowModal', false)
    },
    toNew() {
      this.$router.push("/new")
    }
  }
}
</script>
 
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
.add {
  // width: 400px;
  margin: 0 50px;
}
.records {
  margin: 0 50px;
  // width: 500px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // text-align: left;
  &-title {
    width: 100%;
    display: block;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    margin: 8px 0 0 0;
    color: #4a5568;
  }
}
// .add-button {
//   position: absolute;
//   bottom: 50px;
//   z-index: 10;
//   border-radius: 50px;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.45);
//   transition: all .5s ease;
// }
// .add-button:hover {
//   box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.75);
//   bottom: 65px;
// }
</style>
