<!-- 分红公共top -->
<template>
  <div class="diviTop">
    <ul class="divitopContent">
      <li :class="{ oneListBox: isOneList }" v-for="(item, index) in infoList" :key="index">
        <span>{{ item.num || '0' }}</span>
        <p>{{ item.text }}</p>
      </li>
    </ul>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    infoList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    isOneList() {
      return this.infoList.length === 1
    }
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.diviTop {
  position: relative;
  width: 100%;
  height: 134px;
  background: url('@{imgUrl}commonBg.png') no-repeat center center;
  background-size: cover;
  padding: 15px 15px;
  .divitopContent {
    width: 100%;
    height: 104px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      height: 100%;
      padding: 26px 0;
      color: #171717;
      font-size: 14px;
      span {
        font-size: 21px;
        font-weight: 600;
      }
    }
    .oneListBox {
      width: 100%;
    }
  }
}
.slot {
  position: absolute;
  top: 30px;
  right: 25px;
}
</style>
