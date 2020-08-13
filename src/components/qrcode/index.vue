<template>
  <div>
    <img :src="imgPic" alt="" />
  </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  data() {
    return {
      imgPic: ''
    }
  },
  mounted() {
    let urlString = 'https://img.yzcdn.cn/vant/leaf.jpg'
    QRCode.toDataURL(urlString)
      .then(url => {
        this.imgPic = url
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>
