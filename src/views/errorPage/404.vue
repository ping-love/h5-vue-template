<!--
   404页面
-->
<template>
  <div class="page404 fx-column-center">
    <p class="text">网络不给力，请稍后重试</p>
    <div class="reload">
      <van-button type="default" size="normal" @click="onBack">返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    onBack() {
      console.log('返回首页')
      this.$router.push('/index')
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.page404 {
  height: 100%;
  font-size: 14px;
  line-height: 32px;
  letter-spacing: 2px;
  color: #333;
  .text {
    margin-bottom: 10px;
  }
  /deep/ .van-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    border-radius: 4px;
    border: 1px solid rgb(146, 146, 146);
  }
}
</style>
