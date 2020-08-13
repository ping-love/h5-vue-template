<template>
  <div id="app">
    <!-- <router-view class="app-view" v-if="isRouterAlive" /> -->
    <transition name="loading-transition">
      <keep-alive :include="cacheModules">
        <router-view class="app-view" v-if="isRouterAlive" :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
      // 初始过度动画方向
      transitionName: 'slide-right',
      cacheModules: this.$store.state.globalStatus.cacheModules
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      this.setAni(to, from)
      this.setCacheModule(to, from)
    }
  },
  methods: {
    // 重新加载当前页
    reload() {
      console.log('重新加载...')
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    // 设置打开页面动画
    setAni(to, from) {
      // console.log('-setAni-', to, from)
      let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      this.transitionName = isBack ? 'slide-left' : 'slide-right'
      this.$router.isBack = false
      // console.log(this.$router.isBack)
    },
    // 设置缓存组件
    setCacheModule(to, from) {
      // console.log('-setCacheModule-', to, from)
      // console.log('-route-', this.$route)
      this.cacheModules = this.$store.state.globalStatus.cacheModules
      console.log('-cache-modules-', this.cacheModules)
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
  // overflow: auto;
  font-size: 14px;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
  .app-view {
    // width: 100%;
    // height: 100%;
    // position: absolute;
    // overflow-x: hidden;
  }
}
.loading-transition-enter {
  opacity: 1;
}
.loading-transition-leave-active {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
