<!-- 消费挖矿体系 -->
<template>
  <div class="expenseMining">
    <headerBar background="#ffd347"></headerBar>
    <div class="main">
      <diviTop :infoList="infoList"></diviTop>
      <!-- <van-pull-refresh
        v-model="isRefreshLoading"
        @refresh="onRefresh"
        loosing-text="松开立即刷新"
        loading-text="正在刷新数据中..."
        success-text="刷新成功"
        :disabled="isDisRefresh"
      >
      </van-pull-refresh> -->
      <template v-if="!isNoData">
        <div class="expenseWrap">
          <van-list
            class="expenseList itemContent"
            v-model="isMoreLoading"
            :finished="isMoreFinished"
            :error.sync="isMoreError"
            finished-text="没有更多了"
            @load="getExpenseList"
            :immediate-check="false"
          >
            <div class="diviCom itemBox">
              <div class="item">
                <p class="time">投入津贴</p>
                <p class="coinType">时间</p>
              </div>
            </div>
            <div class="itemBox">
              <div class="item" v-for="(item, index) in expenseList" :key="index">
                <p class="time">{{ item.cash }}</p>
                <p class="coinType">{{ item.createTime }}</p>
              </div>
            </div>
          </van-list>
        </div>
      </template>
      <template v-else>
        <noData></noData>
      </template>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import diviTop from '@/components/viewComp/diviTop'
import noData from '@/components/viewComp/noData'
import tools from '@/utils/tools'
import api from '@/api'
import openNative from '@/native/openNative'
export default {
  name: 'expenseMining',
  data() {
    return {
      infoList: [
        { num: '0', text: '总矿池' },
        { num: '0', text: '已出矿' }
      ],
      isNoData: true,
      pageNo: 0, // 页码
      pageSize: 15, // 每页条数
      totalList: [], // 总的数据
      expenseList: [], // 消费list
      isMoreError: false, // 加载失败状态
      isMoreLoading: false, // 加载更多状态
      isMoreFinished: false, // 加载完成状态
      isRefreshLoading: false, // 下拉刷新状态
      isDisRefresh: false // 是否禁用刷新
    }
  },
  mounted() {
    this.isDisRefresh = false
    this.$loading.show()
    openNative.setHeaderBar()
    this.getExpenseList()
  },
  computed: {},
  methods: {
    onRefresh() {
      console.log('下拉刷新')
      this.pageNo = 0
      this.isMoreFinished = false
      this.getExpenseList(true)
    },
    // isFresh 是否下拉刷新
    getExpenseList(isFresh) {
      console.log('-isfresh-', isFresh)
      api
        .getConsumetMining()
        .then(res => {
          console.log(res, res.code)
          if (res.code == 200) {
            const data = res.data
            this.infoList[0].num = data.tspPool
            this.infoList[1].num = data.tspProfit
            // if (this.totalList.length < 50) {
            //   for (let i = 0; i < 50; i++) {
            //     this.totalList.push({ cash: i, createTime: '2020-04-30 03:15:59' })
            //   }
            // }
            if (!data.detailList || data.detailList.length === 0) {
              this.$loading.hide()
              this.isMoreLoading = false
              this.isRefreshLoading = false
              this.isNoData = true
              return
            }
            this.isNoData = false
            this.totalList = data.detailList
            this.getMoreData(isFresh)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(error => {
          console.log('-ERROR-', error)
          this.$loading.hide()
          this.isDisRefresh = true
        })
    },
    getMoreData(isFresh) {
      setTimeout(() => {
        this.$loading.hide()
        this.isMoreLoading = false
        this.isRefreshLoading = false
        if (isFresh) {
          // 下拉刷新
          this.expenseList = this.setData()
        } else {
          this.expenseList = [...this.expenseList, ...this.setData()]
        }
        console.log('-list-', this.expenseList.length, this.totalList.length)
        if (this.expenseList.length >= this.totalList.length) {
          console.log('全部加载完成')
          this.isMoreFinished = true
        }
      }, 1000)
    },
    setData() {
      let sliceArr = []
      let start = this.pageNo * this.pageSize
      let end = (this.pageNo + 1) * this.pageSize
      console.log(start, end)
      sliceArr = this.totalList.slice(start, end)
      this.pageNo++
      return sliceArr
    }
  },
  components: { headerBar, diviTop, noData }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.expenseMining {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .main {
    // overflow-y: auto;
    /deep/ .van-pull-refresh {
      // overflow-y: auto;
      // -webkit-overflow-scrolling: touch;
    }
    .expenseWrap {
      padding: 12px 15px 0;
      .itemContent {
        font-size: 13px;
        line-height: 16px;
        color: #171717;
        .diviCom {
          opacity: 0.6;
        }
        .itemBox {
          .item {
            display: flex;
            padding: 3px 0;
            // border-bottom: 1px solid #eee;
            p {
              text-align: center;
              line-height: 30px;
              &.time {
                width: 40%;
              }
              &.coinType {
                width: 60%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
