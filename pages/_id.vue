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
    <!-- <div class="logout text-gray-500">
      <button @click="logout">googleログアウト</button>
    </div> -->
  </div>
</template>

<script>
import Mypage from "@/components/Mypage.vue";
import PublicAccountPage from "@/components/PublicAccountPage.vue";
import PrivateAccountPage from "@/components/PrivateAccountPage.vue";
import UserNotFound from "@/components/UserNotFound.vue";
import { getUserByUserOriginalId } from '@/repositories/users.js'
import { getRecords } from '@/repositories/records.js'
import { logEvent } from '@/utils/analytics.js'
import Cookies from "universal-cookie"


export default {
  components: {
    Mypage,
    PublicAccountPage,
    PrivateAccountPage,
    UserNotFound
  },
  async asyncData({ route, router, store }) {
    const isLogin = store.state.isLogin
    if (!isLogin) {
      return {
        isMyUserPage: false,
        isPublicAccount: false,
        isPrivateAccount: false
      }
    }
    // ユーザかどうか
    const myUserId = isLogin ? store.state.user.userOriginalId : null
    let pageUserId = ''
    try {
      pageUserId = route.path.replaceAll('/', '')

    } catch(e) {
      console.log('error at replacing /', e, route.path)
      // route取得に失敗したのでマイページに飛ばすために自分のユーザIDを入れる
      pageUserId = store.state.user.userOriginalId
    }

    let pageData = {
      isMyUserPage: (myUserId === pageUserId)
    }
    // 自分のページ
    if (myUserId === pageUserId) return pageData

    const pageUser = await getUserByUserOriginalId(pageUserId)
    // ユーザが見つかりませんでした
    if (!pageUser) {
      return {
        ...pageData,
        userId: pageUserId,
        pageUser,
        isPublicAccount: false,
        isPrivateAccount: false
      }
    }

    // 他の人のページの場合
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
  },
  mounted() {
    if (!this.$store.state.isLogin) this.$router.push("/new")
  },
  methods: {
    logout(){
      const cookie = new Cookies()
      cookie.remove('smash_access_token')
      this.$store.commit('setUid', '')
      this.$store.commit('setIsLogin', false)
      this.$store.commit('setUser', {})
      this.$store.commit('setRecords', [])
      window.localStorage.clear();
      logEvent('logoutFromMypage', undefined)
      this.$router.push("/new")
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
.logout {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: right;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 10px;
}

</style>