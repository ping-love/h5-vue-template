<!--
   下拉刷新公共组件
-->
<template>
  <div class="pullRefresh">
    <van-pull-refresh
      v-model="isLoading"
      loosing-text="松开立即刷新"
      loading-text="正在刷新数据中..."
      :success-text="successText"
      @refresh="onRefreshFunc"
    >
      <slot></slot>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 自定义下拉刷新事件
    onRefresh: {
      type: Function
    },
    // 加载完成是否text显示，(true:刷新成功，false:toast提示)
    isTextHint: {
      type: Boolean,
      default: true
    },
    // 是否刷新加载中
    isRefreshLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    successText() {
      return this.isTextHint ? '刷新成功' : ''
    },
    isLoading: {
      get() {
        return this.isRefreshLoading
      },
      set(val) {
        // console.log('-val-', val)
        this.$emit('update:isRefreshLoading', val)
      }
    }
  },
  mounted() {},
  methods: {
    onRefreshFunc() {
      // console.log(this.onRefresh)
      if (this.onRefresh) {
        console.log('自定义onRefresh事件')
        this.onRefresh()
        return
      }
      console.log('调用公共的onRefresh事件')
      setTimeout(() => {
        if (!this.isTextHint) {
          this.$toast('刷新成功')
        }
        this.isLoading = false
      }, 1000)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
