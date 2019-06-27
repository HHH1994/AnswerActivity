<style scoped rel='stylesheet/scss' lang='scss'>
  .person-info{
    user-select: none;
    font-size: 0.18rem;
  }
  .mask{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 100;
  }
  .info-form{
    box-sizing: border-box;
    padding: 15px;
    width: 3rem;
    height: 2.4rem;
    border-radius: 0.1rem;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -1.5rem;
    margin-top: -1.2rem;
    z-index: 101;
    .close{
      position: absolute;
      top:0.15rem;
      right: 0.25rem;
      cursor: pointer;
      .x-left,.x-right{
        display: inline-block;
        height: 0.2rem;
        width: 0.02rem;
        background: #000000;
      }
      .x-left{
        transform:rotate(45deg) translate(0.04rem,0);
        -ms-transform:rotate(45deg) translate(0.04rem,0); 	/* IE 9 */
        -moz-transform:rotate(45deg) translate(0.04rem,0); 	/* Firefox */
        -webkit-transform:rotate(45deg) translate(0.04rem,0); /* Safari 和 Chrome */
        -o-transform:rotate(45deg) translate(0.04rem,0);
      }
      .x-right{
        transform:rotate(-45deg) translate(-0.04rem,0);
        -ms-transform:rotate(-45deg) translate(-0.04rem,0); 	/* IE 9 */
        -moz-transform:rotate(-45deg) translate(-0.04rem,0); 	/* Firefox */
        -webkit-transform:rotate(-45deg) translate(-0.04rem,0); /* Safari 和 Chrome */
        -o-transform:rotate(-45deg) translate(-0.04rem,0);
      }
    }
    .box-tit{
      text-align: center;
      font-size: 0.2rem;
      font-weight: bold;
      margin-bottom: 0;
    }
    .box-input{
      display: block;
      width: 90%;
      text-indent: 0.1rem;
      padding: 0.1rem 0.1rem;
      margin: 0.15rem auto;
      outline: none;
      font-size: 0.14rem;
      border-radius: 0.02rem;
      border: 0.01rem solid #d1d1d1;
    }
    .box-btn{
      margin: 0 auto;
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.2rem;
      background: orange;
      color: #ffffff;
      border-radius: 0.05rem;
    }
  }
</style>
<template>
  <div class="person-info" v-show="isShow">
    <div class="mask"></div>
    <div class="info-form">
      <div class="close" @click="close">
        <span class="x-left"></span>
        <span class="x-right"></span>
      </div>
      <p class="box-tit">填写信息</p>
      <input class="box-input" type="text" placeholder="请填写您的姓名" v-model="userInfo.name">
      <input class="box-input" type="text" placeholder="请填写您的手机号" v-model="userInfo.mobile">
      <div class="box-btn" @click="submit">确认</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        userInfo:{}
      }
    },
    props:{
      isShow:{
        type:Boolean,
        default:false
      }
    },
    watch:{
        isShow:function(){
            this.userInfo = {};
        }
    },
    methods:{
      close(){
        this.$emit("closeBox",false);
      },
      submit(){
        let data = this.userInfo;
        if(data.name==""||data.name==undefined){
          this.$ToolTip({
            message:"请输入姓名"
          });
          return;
        }
        else if(!(/^1[34578]\d{9}$/.test(data.mobile))){
          this.$ToolTip({
            message:"手机号码有误"
          });
          return
        }
        console.log(this.userInfo.name);
        let url = "prize/qualify?name="+this.userInfo.name+"&mobile="+this.userInfo.mobile;
        this.$http.get(url)
          .then(res=>{
            console.log(res);
            if(res.result){
              this.$emit("returnUserInfo",this.userInfo);
            }
            else {
              this.$ToolTip({
                message:res.error.message
              })
            }
          });
      }
    }
  }
</script>
