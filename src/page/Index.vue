<style scoped rel='stylesheet/scss' lang='scss'>
  #content{
    position: relative;
    top:0;
    transition: top 1s 0.3s;
    overflow: hidden;
  }
  .page{
    width: 100vw;
    height: 100vh;
    position: relative;
    user-select: none;
  }
  /* 欢迎页*/
  .page-welcome{
    background: url("../assets/welcome.jpeg") center center no-repeat;
    background-size:cover;
    .tit{
      margin-top: 0;
      text-align: center;
      font-size: 0.26rem;
      font-weight: 600;
      position: relative;
      top: 0.4rem;
    }
    .rule{
      padding: 0.1rem;
      width: 80%;
      margin: 0 auto;
      margin-top: 0.9rem;
      border-radius: 7px;
      border: 2px solid;
      font-weight: 600;
      font-size: 0.18rem;
      .rule-tit{
        text-align: center;
        font-size: 0.2rem;
        font-weight: bold;
      }
    }
  }
  /* 答题页*/
  .page-question{
    background: url("../assets/question.jpeg") center center no-repeat;
    background-size:cover;
    box-sizing: border-box;
    padding-top:1px;
    position: relative;
    .question-item{
      width: 100%;
      .question-title{
        text-align: center;
        font-size: 0.2rem;
        background: #FFE4E1;
        max-width: 80%;
        margin:0 auto;
        padding: 0.12rem;
        border-radius: 0.06rem;
        letter-spacing: 1px;
      }
      .index-warp{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin: 0.45rem auto .05rem;
        background: #ffffff;
        position: relative;
        .line{
          width: 100%;
          height: 2px;
          background: #d1d1d1;
          transform: translate(0,.5rem) rotate(-45deg);
        }
      }
      .logo{
        position: absolute;
        width: 32px;
        height: 32px;
        top: .32rem;
        left: .32rem;
        margin-top: -16px;
        margin-left: -16px;
        display: inline-block;

      }
      .question-index{
        position: absolute;
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        bottom: .18rem;
        right: .18rem;
        margin-top: 16px;
        margin-left: 16px;
        text-align: center;
        color:#FF6A6A;
        font-size: 0.29rem;
        font-weight: bold;
      }
      .question-optionlist{
        width: 80%;
        margin: 0.15rem auto;
      }
      .question-option{
        background: #ffffff;
        color:#222222;
        text-align: center;
        padding: 0.06rem;
        border-radius: 0.06rem;
        font-size: 0.24rem;
        margin:0.13rem 0;
      }
    }
  }
  .page-outcome{
    font-size: .2rem;
  }
  /* 公共样式*/
  .btn{
    width: 2rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.18rem;
    /*display: inline-block;*/
    cursor: pointer;
  }
  .start-btn{
    background: #CD5555;
    color: #B22222;
    font-weight: bold;
    font-size: .18rem;
    letter-spacing: 2px;
    margin:0 auto;
    margin-top:0.4rem;
  }
  .question-next-btn{
    background: #CD5555;
    color: #B22222;
    margin:0 auto;
    font-weight: bold;
    font-size: 0.18rem;
    letter-spacing: 2px;
  }
  .question-last-btn{
    background: #d1d1d1;
    color: #222222;
    margin:0 auto;
    margin-top:0.1rem;
    font-weight: bold;
    font-size: .18rem;
    letter-spacing: 2px;
  }
  .active{
    background: red!important;
  }
</style>
<template>
  <div id="content">
    <!-- 欢迎-->
    <div class="page page-welcome" v-show="step == 1">
      <p class="tit">灌篮高手大竞猜--圣诞版</p>
      <div class="rule">
        <p class="rule-tit">活动规则</p>
        <p>1.凡进入页面活动需要回答10道问题,答对5道即可参与抽奖</p>
        <p>2.每日每个手机只能参加一次</p>
        <p>3.此次活动最终解释权由Big Huang所有</p>
      </div>
      <div class="btn start-btn" @click="startAnswer">开始答题</div>
    </div>
    <!-- 答题页-->
    <div class="page page-question" v-show="step == 2">
      <div class="question-item">
        <div class="index-warp">
          <img src="../assets/backetball.png" alt="" class="logo">
          <div class="question-index">{{curIndex+1}}</div>
          <div class="line"></div>
        </div>
        <p class="question-title">
          {{curQuestion.title}}
        </p>
        <div class="question-optionlist">
          <p class="question-option" v-for="(option,index) in curQuestion.optionList" @click="selectAnswer(option.id,index)">{{option.text}}</p>
        </div>
      </div>
      <div class="btn question-next-btn" @click="nextQuestion" v-show="!(curIndex=== questionList.length-1)">下一题</div>
      <div class="btn question-next-btn" @click="submitQuestion" v-show="(curIndex=== questionList.length-1)">提交</div>
      <div class="btn question-last-btn" @click="lastQuestion" v-show="!(curIndex===0)">上一题</div>
    </div>
    <!--抽奖页-->
    <div class="page page-choujiang" v-show="step == 3">
      <div class="btn start-btn" @click="choujiang">抽奖</div>
    </div>
    <!-- 结果页-->
    <div class="page page-outcome" v-show="step == 4">
      {{message}}
    </div>
    <InfoBox :isShow="isShowInfo" @returnUserInfo="getUserInfo" @closeBox = "close"></InfoBox>
    <Loading :isShow="isShowLoading"></Loading>
      <Float></Float>
  </div>
</template>
<script>
  import InfoBox from "../components/InfoBox.vue";
  import Loading from '../components/Loading.vue';
  import  Float from "../components/floatIcon.vue";
  export default{
    data(){
      return {
        curTop:0,
          step:1,
        info:{},
        isShowInfo:false,
        isShowLoading:false,
        curIndex:0,
        curQuestion:{},
        questionList:[
          {
            title:"樱木花道几号球衣?",
            optionList:[
              {
                id:101,
                text:"4"
              },
              {
                id:102,
                text:"7"
              },
              {
                id:103,
                text:"10"
              },
              {
                id:104,
                text:"11"
              }
            ]
          },
          {
            title:"流川枫几号球衣?",
            optionList:[
              {
                id:201,
                text:"5"
              },
              {
                id:202,
                text:"13"
              },
              {
                id:203,
                text:"11"
              },
              {
                id:204,
                text:"10"
              }
            ]
          }
        ],
        answerList:[],
        message:""
      }
    },
    methods:{
      close(val){
        this.isShowInfo = val;
      },
      startAnswer(){
        this.isShowInfo=true;
      },
      nextPage(){
        this.curTop+= 100;
        document.querySelector("#content").style.top = -this.curTop+"vh";
      },
      getUserInfo(val){
        this.info = val;
        this.isShowInfo = false;
        this.nextPage();
      },
      /* 答题部分*/
      selectAnswer(val,index){
        if(this.answerList[this.curIndex]==val)return;
        this.answerList[this.curIndex]=val;
        this.clearAndChooseActive(index);
      },
      nextQuestion(){
        if(this.answerList[this.curIndex]==""||this.answerList[this.curIndex]==undefined){
          this.$ToolTip({
            message:"请选择"
          });
          return;
        }
        this.curIndex += 1;
        this.curQuestion = this.questionList[this.curIndex];
        this.justifyActive();
      },
      lastQuestion(){
        this.curIndex -= 1;
        this.curQuestion = this.questionList[this.curIndex];
        this.justifyActive();
      },
      submitQuestion(){
        if(this.answerList[this.curIndex]==""||this.answerList[this.curIndex]==undefined){
          this.$ToolTip({
            message:"请选择"
          });
          return;
        }
        this.isShowLoading = true;
        let url = "prize/answer";
        let data = this.info;
        data.answerList = this.answerList;
        this.$http.post(url,JSON.stringify(data))
          .then(res=>{
            console.log(res);
            this.info = res.data;
            if(res.data.isCorrect==1){
              this.nextPage();
            }
            else {
              // 跳转至安慰页
              this.$ToolTip({
                message: "很遗憾,再接再厉!"
              });
            }
            this.isShowLoading=false;

          });
      },
      choujiang(){
        let url = "prize/choujiang";
        this.$http.post(url,JSON.stringify(this.info))
          .then(res=>{
            console.log(res);
            if(res.result==1){
                this.message = "您获得了"+res.data.prize_type+"等奖";
            }
            else {
                this.message = res.error.message;
            }
            this.nextPage();
          });
      },
      clearAndChooseActive(index){
        let list = document.querySelectorAll(".question-option");
        for(let i = 0,len=list.length;i<len;i++){
          list[i].className = list[i].className.replace("active","");
          if(i==index&&list[i].className.indexOf("active")==-1){
            list[i].className+=" active";
          }
        }
      },
      justifyActive(){
        let optionList = this.curQuestion.optionList,
          index = -1;
        for(let j = 0,len=optionList.length;j<len;j++){
          if(optionList[j].id==this.answerList[this.curIndex]){
            index=j;
            break;
          }
        }
        this.clearAndChooseActive(index);

      }
    },
    components:{
      InfoBox,
      Loading,
        Float
    },
    created(){
      this.curQuestion = this.questionList[this.curIndex];
    }
  }
</script>
