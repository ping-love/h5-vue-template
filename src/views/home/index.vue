<!--
  直播会员系统首页
 -->
<template>
  <div class="index">
    <headerBar :isHighColor="false" arrowsType="white" background="#161513" titleColor="#fff"></headerBar>
    <div class="main">
      <div class="topBg"></div>
      <div class="content">
        <div class="userInfoWrap">
          <div class="bg">
            <div class="bgLeft">
              <img :src="userInfo.smallpic" alt="" />
            </div>
            <div class="bgRight">
              <div class="username">{{ userInfo.myname }}</div>
              <div class="tst">
                <p>TST: {{ userInfo.tst }}</p>
                <div class="bgBtnBox">
                  <button class="topup" @click="toTopup" v-if="!isProdEnv">充值</button>
                  <!-- <button class="withdraw" @click="toJumpPage('Withdraw')">提现</button> -->
                </div>
              </div>
              <!-- <div class="tsp">
                <p class="tspLeft">TSP: 104333333333333</p>
                <p class="tspRight">矿池: 103333333333333</p>
              </div> -->
              <div class="tsp">
                <p class="tspLeft">TF: {{ userInfo.tsp }}</p>
                <p class="tspRight">矿池: {{ userInfo.tspPool }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="memberWrap">
          <h4>会员权益</h4>
          <ul class="memberBox">
            <li @click="toJumpPage('InviteDivi')">
              <div>
                <img src="@/assets/images/home/equityIcon1.png" alt="" />
                <p>邀请分红</p>
              </div>
            </li>
            <li @click="toJumpPage('AnchorDivi')" v-if="userInfo.anchor">
              <div>
                <img src="@/assets/images/home/equityIcon2.png" alt="" />
                <p>主播分红</p>
              </div>
            </li>
            <li @click="toJumpPage('ExpenseMining')">
              <div>
                <img src="@/assets/images/home/equityIcon3.png" alt="" />
                <p>消费挖矿</p>
              </div>
            </li>
            <li @click="toJumpPage('Task')">
              <div>
                <img src="@/assets/images/home/equityIcon4.png" alt="" />
                <p>任务</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="jumpPageWrap">
          <ul class="jumpPageBox">
            <li @click="toJumpPage('Certification')" v-if="isProdEnv">
              <div>
                <span class="jumpIcon1"></span>
                <p>实名认证</p>
              </div>
              <div class="rightArrow"></div>
            </li>

            <li @click="toJumpPage('HostAuthentication')" v-if="userInfo.anchor">
              <div>
                <span class="jumpIcon2"></span>
                <p>主播认证</p>
              </div>
              <div class="rightArrow"></div>
            </li>

            <li @click="toJumpPage('WithdrawalAddress')">
              <div>
                <span class="jumpIcon3"></span>
                <p>提现地址</p>
              </div>
              <div class="rightArrow"></div>
            </li>

            <li @click="toJumpPage('MyTeam')" v-if="!isProdEnv">
              <div>
                <span class="jumpIcon4"></span>
                <p>我的团队</p>
              </div>
              <div class="rightArrow"></div>
            </li>

            <li @click="toJumpPage('InviteCode')">
              <div>
                <span class="jumpIcon5"></span>
                <p>邀请码</p>
              </div>
              <div class="rightArrow"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import store from '@/store'
import openNative from '@/native/openNative'
import { Dialog } from 'vant'
import { mapGetters } from 'vuex'
import api from '@/api'
export default {
  name: 'Index',
  inject: ['reload'],
  data() {
    return {
      env: '',
      userInfo: {}
    }
  },
  computed: {
    isProdEnv() {
      return process.env.VUE_APP_SERVER_ENV == 'prod'
    },
    ...mapGetters('globalStatus', ['loadErrorCount'])
  },
  created() {
    // console.log(this.$route.query)
    if (this.$route.query) {
      window.localStorage.setItem('locationSearch', window.location.search)
      let key = this.$route.query.key
      // console.log(key)
      // 通知store更改状态
      store.commit('user/setAccessToken', key)
      window.localStorage.setItem('accessToken', key)
    }
    openNative.setHeaderBar()
    // 非主播账号不显示主播分红按钮
    this.getData()
  },
  mounted() {
    console.log('count', this.loadErrorCount)
    console.log('测试服版本v0.1.1', '-env-', process.env.VUE_APP_SERVER_ENV)
  },
  methods: {
    onBack() {
      openNative.closeWebview()
    },
    toTopup() {
      this.$router.push({ name: 'TopupAddress' })
      // console.log('充值')
      // openNative.recharge()
      // this.$toast('暂未开放！')
      // this.$toast('即将唤醒另一个app')
    },
    toLogin() {
      this.$router.push({ name: 'Login' })
    },
    toJumpPage(item) {
      // console.log(item)
      this.$router.push({ name: item })
    },
    getData() {
      this.$loading.show()
      api
        .getTsInfo()
        .then(res => {
          this.$loading.hide()
          if (res.code == 200) {
            // console.log(res.data.data)
            this.userInfo = res.data
            window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            this.$store.commit('user/setUserInfo', this.userInfo)
            // this.userInfo.anchor = true // TODO
            console.log('-userinfo-data-', this.userInfo)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(error => {
          this.$loading.hide()
          this.handleErrorRes(error)
        })
    },
    // 请求失败/超时
    handleErrorRes(error) {
      Dialog.confirm({
        title: '服务器开小差了!',
        message: error.message,
        cancelButtonText: '返回',
        confirmButtonText: '重新加载'
      })
        .then(() => {
          console.log('-confirm-')
          this.$store.commit('globalStatus/setLoadErrorCount')
          console.log('-load-count-', this.loadErrorCount)
          if (this.loadErrorCount > 3) {
            this.$toast({
              message: '服务器开小差了，请稍后再重试!',
              onClose: () => {
                openNative.closeWebview()
              }
            })
            return
          }
          this.reload()
        })
        .catch(() => {
          console.log('-cancel-')
          openNative.closeWebview()
        })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
@import './index';
</style>
