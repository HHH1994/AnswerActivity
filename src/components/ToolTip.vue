<style scoped rel='stylesheet/scss' lang='scss'>
  .tooltip{
    position: fixed;
    bottom: 0;
    -webkit-transition: bottom 0.6s;
    transition: bottom 0.6s;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    text-align: center;
    width: 1.5rem;
    padding:0.1rem  0.15rem;
    border-radius: 0.07rem;
    z-index: 1000;
    left: 50%;
    font-size: 0.16rem;
    margin-left: -0.85rem;
  ;
  }
</style>
<template>
  <div class="tooltip">{{message}}</div>
</template>
<script>
  export default{
    data(){
      return {
        message:"提示"
      }
    },
    mounted(){
        setTimeout(()=>{this.$el.style.bottom = "20%";},0);
        setTimeout(()=>{document.body.removeChild(this.$el)},3000);
    }
  }
</script>
