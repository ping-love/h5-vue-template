<template>
  <div>
    <div class="demo">
      <img class="btn" :src="imgUrl" alt="" />
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      imgUrl: '',
      isShowVis: false
    }
  },
  mounted() {
    console.log(html2canvas)
    // html2canvas(document.body).then(res => {
    //   console.log(res)
    // })
    // html2canvas(document.body).then(function(canvas) {
    //   // document.body.appendChild(canvas)
    //   // // this.imgPic = canvas
    //   // console.log(canvas)
    //   html2canvas(document.body).then(canvas => {
    //     let dataURL = canvas.toDataURL('image/png')
    //     this.imgUrl = dataURL
    //   })
    // })
    // const scaleSize = 2
    // const newCanvas = document.createElement('canvas')
    // const target = document.querySelector('div')
    // const width = parseInt(window.getComputedStyle(target).width)
    // const height = parseInt(window.getComputedStyle(target).height)
    // newCanvas.width = width * scaleSize
    // newCanvas.height = width * scaleSize
    // newCanvas.style.width = width + 'px'
    // newCanvas.style.height = width + 'px'
    // const context = newCanvas.getContext('2d')
    // context.scale(scaleSize, scaleSize)
    // html2canvas(document.querySelector('.demo'), { canvas: newCanvas }).then(function(canvas) {
    //   // 简单的通过超链接设置下载功能
    //   document.querySelector('.btn').setAttribute('src', canvas.toDataURL())
    // })
  }
}
</script>
<style lang="less" scoped>
.demo {
  height: 100px;
  .btn {
    height: 100px;
  }
}
</style>
