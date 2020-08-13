<!--
   活动一
-->
<template>
  <div class="actOne">
    <!-- <activityMain type="gameStrategy"></activityMain> -->
    <activityMain type="liveFeature" :prevPageEnv="prevPageEnv"></activityMain>
  </div>
</template>

<script>
import activityMain from '@/components/viewComp/activityMain'
export default {
  name: '',
  data() {
    return {
      // 前一页环境
      prevPageEnv: 'native'
    }
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    // console.log(to, from, from.name)
    next(vm => {
      if (from.name !== null) {
        // console.log(vm.prevPageEnv)
        vm.prevPageEnv = 'h5'
      }
    })
  },
  created() {
    console.log('actOne')
  },
  mounted() {},
  methods: {},
  components: { activityMain }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
