<!-- 邀请/主播分红list -->
<template>
  <div class="diviWrap">
    <h4>收益明细</h4>
    <van-list
      class="diviList"
      v-model="isLoading"
      :finished="isFinished"
      :error.sync="isError"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="initLoading"
    >
      <div class="diviCom item">
        <p v-for="(item, index) in titles" :key="index">{{ item }}</p>
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <p class="time">{{ item.time | ymdTime }}</p>
        <p class="anchor">{{ item.anchorId }}</p>
        <p class="num">{{ item.num }}</p>
        <p class="gainReward">{{ item.gainReward }}</p>
        <p class="earning">{{ item.earning }}</p>
      </div>
    </van-list>
  </div>
</template>

<script>
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 标题组
    titles: {
      type: Array,
      default: function() {
        return []
      }
    },
    // list数据源
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否正在加载状态
    isMoreLoading: {
      type: Boolean,
      default: false
    },
    // 是否全部加载完成
    isMoreFinished: {
      type: Boolean,
      default: false
    },
    // 是否加载失败
    isMoreError: {
      type: Boolean,
      default: false
    }
  },
  // watch: {
  //   isMoreLoading(newVal, oldVal) {
  //     console.log('isMoreLoading-newVal:', newVal, oldVal)
  //   }
  // },
  computed: {
    isLoading: {
      get() {
        return this.isMoreLoading
      },
      set(val) {
        // console.log(val)
        this.$emit('update:isMoreLoading', val)
      }
    },
    isFinished(val) {
      return this.isMoreFinished
    },
    isError: {
      get() {
        return this.isMoreError
      },
      set(val) {
        // console.log(val)
        this.$emit('update:isMoreError', val)
      }
    }
  },
  filters: {
    ymdTime(val) {
      return tools.formatDate(val, '{y}.{m}.{d}')
    }
  },
  mounted() {},
  methods: {
    initLoading() {
      // console.log('即将发起请求')
      this.$emit('loading')
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.diviWrap {
  padding: 30px 15px 0;
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #000;
    padding-bottom: 6px;
  }
  .diviList {
    font-size: 13px;
    color: #171717;
    .item {
      display: flex;
      p {
        text-align: center;
        line-height: 35px;
      }
      p:nth-child(1) {
        width: 25%;
      }
      p:nth-child(2) {
        width: 25%;
      }
      p:nth-child(3) {
        width: 10%;
      }
      p:nth-child(4) {
        width: 20%;
      }
      p:nth-child(5) {
        width: 20%;
      }
    }
    .diviCom {
      opacity: 0.6;
    }
  }
}
</style>
