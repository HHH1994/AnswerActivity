<style scoped rel='stylesheet/scss' lang='scss'>
  p{
    position: absolute;
    margin: 0;
    bottom: -.27rem;
    font-size: .2rem;
    font-weight: bold;
    height: 0.2rem;
    color:#ffffff;
    letter-spacing: 2px;
    width: 100%;
    text-align: center;
  }
</style>
<template>
  <div v-show="isShow">
    <div class="mask"></div>
    <div class="loadEffect">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <p>请等待</p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {}
    },
    props:{
      isShow:{
        type:Boolean,
        defalut:false
      }
    }
  }
</script>
