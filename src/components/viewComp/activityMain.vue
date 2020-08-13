<!--
  活动页公共组件
 -->
<template>
  <div class="content">
    <headerBar
      :background="headerBgColor"
      :arrowsType="arrowsType"
      :titleOpacity="titleOpacity"
      :isMainFullScreen="true"
      :isHighColor="false"
      :onBack="prevPageEnv === 'native' ? onBack : null"
    ></headerBar>
    <div class="main">
      <!-- 主要内容区 -->
      <div class="imgBg">
        <img :src="bgImgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import openNative from '@/native/openNative'
import headerBar from '@/components/headerBar'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      headerBgColor: 'rgba(255,255,255,0)',
      arrowsType: 'white',
      titleOpacity: 0,
      bgImgs: {
        recruitHost: require('@/assets/images/activity/recruitHost.png'),
        liveFeature: require('@/assets/images/activity/liveFeatureBg.png'),
        gameStrategy: require('@/assets/images/activity/gameStrategyBg.png')
      }
    }
  },
  props: {
    // 活动页类型
    type: {
      type: String,
      required: true
    },
    // 前一页环境，默认为客户端环境
    prevPageEnv: {
      type: String,
      default: 'native'
    }
  },
  watch: {
    prevPageEnv(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  created() {
    // TODO 注意全屏图片
    // console.log(this.prevPageEnv)
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
    openNative.setHeaderBar()
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.prevPageEnv)
    })
    // console.log(this.headerBgColor, this.arrowsType, this.titleOpacity)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    ...mapGetters('globalStatus', ['scollTop']),
    bgImgUrl() {
      // console.log('-type-', this.type, this.bgImgs[`${this.type}`])
      return this.bgImgs[`${this.type}`]
    }
  },
  methods: {
    handleScroll(e) {
      // console.log(this.prevPageEnv)
      // 61
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      // console.log('-top-', top)
      if (top < 10) {
        this.arrowsType = 'white'
        this.titleOpacity = 0
        this.headerBgColor = `rgba(255,255,255,0)`
        return
      }
      if (top > 200) {
        this.titleOpacity = 1
        this.headerBgColor = `rgba(255, 255, 255, 1)`
        return
      }
      console.log(top)
      this.arrowsType = 'black'
      this.titleOpacity = top / 150
      this.headerBgColor = `rgba(255, 255, 255, ${top / 150})`
    },
    onBack() {
      console.log('返回')
      openNative.closeWebview()
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
// @imgUrl: '~@/assets/images/';
.content {
  height: 100%;
  .main {
    font-size: 0px;
    img {
      width: 100%;
    }
  }
}
</style>
