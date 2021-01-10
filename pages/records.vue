<template>
  <div class="container">
    <div class="edit">
      <template v-if="isShowModal">
        <EditRecordModal :editingRecord="editingRecord" @close="closeModal" />
      </template>
      <template v-if="!this.$store.state.notice">
        <Notice :notice="notice" />
      </template>
    </div>
    <div class="records">
      <div class="mx-auto py-2 px-1">
        <div
          class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
          style="height: 100%"
        >
          <table
            class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative"
          >
            <thead>
              <tr class="text-left">
                <th
                  v-for="heading in headings"
                  :key="heading.id"
                  class="bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
                >
                  {{ heading }}
                </th>
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
                  <span
                    v-if="record.result"
                    class="text-red-700 px-3 py-3 flex items-center"
                    >勝ち</span
                  >
                  <span v-else class="text-blue-700 px-3 py-3 flex items-center"
                    >負け</span
                  >
                </td>
                <td
                  class="border-dashed border-t border-gray-200 text-gray-600 text-xs"
                >
                  <button class="pt-1" @click="openModal(record)">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13L11 5ZM17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9V12.1716L17.5858 3.58579Z"
                        stroke="#A0AEC0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/parts/Button.vue";
import FighterIcon from "@/components/parts/FighterIcon.vue";
import EditRecordModal from "@/components/modals/EditRecordModal.vue";
import fighters from "@/assets/fighters.json";
import Notice from "@/components//Notice.vue";

export default {
  components: {
    FighterIcon,
    EditRecordModal,
    Button,
    Notice,
  },
  data() {
    return {
      fighters,
      headings: ["日付", "自分", "相手", "勝敗", "編集"],
      isShowModal: false,
      editingRecord: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    records() {
      return this.$store.state.records;
    },
  },
  methods: {
    async getRecords() {
      await this.$store.dispatch("getRecords", this.user.userId);
    },
    openModal(record) {
      this.isShowModal = true;
      this.editingRecord = record;
    },
    closeModal() {
      this.isShowModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
</style>