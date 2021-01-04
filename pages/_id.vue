<template>
  <div class="container">
    <div v-if="isMyUserPage">
      <Mypage />
    </div>
    <div v-else-if="isPrivateAccount">
      <PrivateAccountPage :user="pageUser" />
    </div>
    <div v-else-if="isPublicAccount">
      <PublicAccountPage :user="pageUser" :records="pageUserRecords" />
    </div>
    <div v-else>
      <UserNotFound />
    </div>
  </div>
</template>

<script>
import Mypage from "@/components/Mypage.vue";
import PublicAccountPage from "@/components/PublicAccountPage.vue";
import PrivateAccountPage from "@/components/PrivateAccountPage.vue";
import UserNotFound from "@/components/UserNotFound.vue";
import { getUser } from '@/repositories/users.js'
import { getRecords } from '@/repositories/records.js'

export default {
  components: {
    Mypage,
    PublicAccountPage,
    PrivateAccountPage,
    UserNotFound
  },
  async asyncData({ route, store }) {
    const user = store.state.user
    const pageUserId = route.path.replaceAll('/', '')
    let pageData = { isMyUserPage: (user.userId === pageUserId) }
    if (user.userId === pageUserId) return pageData

    const pageUser = await getUser(pageUserId)
    if (!pageUser) {
      return {
        ...pageData,
        userId: pageUserId,
        pageUser,
        isPublicAccount: false,
        isPrivateAccount: false
      }
    }
    pageData = {
      ...pageData,
      userId: pageUserId,
      pageUser,
      isPublicAccount: !pageUser.isPrivateAccount,
      isPrivateAccount: pageUser.isPrivateAccount
    }
    if (pageUser.isPrivateAccount) return pageData

    const pageUserRecords = []
    // const pageUserRecords = await getRecords(pageUserId)
    return {
      ...pageData,
      pageUserRecords
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}
.goole-login {
  margin: 16px 0;
}
.introduction {
  li {
    margin: 4px 0;
  }
}
.title {
  margin: 20px 0;
  font-size: 24px;
  color: black;
  letter-spacing: 1px;
}
</style>