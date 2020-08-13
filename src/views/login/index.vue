<!--  -->
<template>
  <div class="login">
    <!-- <h3>登录</h3> -->
    <headerBar background="#161513" arrowsType="white" titleColor="#fff"></headerBar>
    <van-field v-model="phone" required="" type="digit" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="sms" required center type="digit" clearable label="短信验证码" placeholder="请输入短信验证码">
      <template #button>
        <van-button size="small" type="info">发送验证码</van-button>
      </template>
    </van-field>
    <van-checkbox v-model="radioChecked" class="userAgreement" shape="square" icon-size="13px"
      >我已仔细阅读并同意 <router-link to="/userAgreement"><span>《用户协议》</span></router-link></van-checkbox
    >
    <van-button class="submit" round block type="info" @click="onLogin">登 录</van-button>
  </div>
</template>

<script>
// import {getData} from '@/utils/commonRequest'
import headerBar from '@/components/headerBar'
import adapter from '@/mixins/adapter'
import api from '@/api'
import storage from '@/utils/storage'
export default {
  name: 'Login',
  data() {
    return {
      radioChecked: Boolean,
      phone: '',
      sms: ''
    }
  },
  mixins: [adapter],
  mounted() {
    // post/put请求，method可不传，默认post
    // postOrPutData(url,params，method).then(res=>{})
    //
    // get请求
    // getData(url,params).then(res=>{})
    console.log('登录界面')
    this.getData()
  },
  methods: {
    onLogin() {
      this.$toast('即将登录')
    },
    getData() {
      this.$loading.show()
      api
        .getTsInfo()
        .then(res => {
          // console.log(res)
          this.$loading.hide()
          if (res.code == 200) {
            const data = res.data
            console.log(data)
            this.$store.commit('user/setUserInfo', data)
            storage.setItem('userInfo', JSON.stringify(data))
          }
        })
        .catch(error => {
          console.log(error)
          this.$loading.hide()
        })
    }
  },
  components: { headerBar }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/common/';

.login .van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0.42667rem;
  bottom: 0;
  left: 0.42667rem;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.login .van-checkbox__label {
  color: #afafaf;
}

.login {
  height: 100%;
  h3 {
    text-align: center;
    line-height: 80px;
  }
  .userAgreement {
    margin: 10px 15px;
    font-size: 12px;
    color: #b5b9b6;
  }
  .submit {
    width: 80%;
    margin: 100px auto;
  }
}
</style>
