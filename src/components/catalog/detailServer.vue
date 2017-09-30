<template>
  <div class="detailServer" v-show="show" @click="hideServer">
      <div class="detail-wrapper">
        <div class="main">

        </div>
      </div>
      <div class="content">
         <p class="title">本店活动</p>
         <ul>
             <li>
                 <img src="./icon1.png" >
                 <div class="text">
                     <p class="title">赠运费险</p>
                     <p>商家为您购买商品投保退货运费险</p>
                 </div>
             </li>
             <li>
                 <img src="./icon2.png" >
                 <div class="text">
                     <p class="title">赠运费险</p>
                     <p>商家为您购买商品投保退货运费险</p>
                 </div>
             </li>
             <li>
                 <img src="./icon3.png" >
                 <div class="text">
                     <p class="title">赠运费险</p>
                     <p>商家为您购买商品投保退货运费险</p>
                 </div>
             </li>   
         </ul>
         <button>确定</button>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showServer () {
      this.show = true
    },
    hideServer () {
      this.show = false
    }
  }
}
</script>
<style lang="less">
.detailServer{
    z-index: 5;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    height: 100%;
    width: 100%;
    overflow: hidden;
    .detail-wrapper{
        min-height: 100%;
        width: 100%;
       .main{
          padding-bottom: 299px;
        }
    }
    .content{
        position: relative;
        height: 250px;
        width: 100%;
        clear: both;
        margin: -299px auto 0 auto;
        background: #fff;
        .title{
            text-align: center;
            font-size: 18px;
            line-height: 50px;
            color:#f19600;
        }
        p{  
            width: 90%;
            margin: 0 auto;
            line-height: 25px;
        }
        ul{
            margin: 0 auto;
            padding: 0;
            width: 90%;
            li{
                list-style-type: none;
                height: 45px;
                img{
                    width: 30px;
                    height: 30px;
                    float: left;
                    vertical-align: top;
                    margin-top: 7px;
                }
                .text{
                    float: left;
                    margin-left: 5%;
                    p{
                        width: 100%;
                        text-align: left;
                        color: #999;
                        line-height: 20px;
                    }
                    .title{
                        line-height: 20px;
                        color: #333;
                        font-size: 16px;
                    }
                }
            }
        }
        button{
            position: absolute;
            bottom: 0;
            border: none;
            background: #f19600;
            color: #fff;
            font-size: 16px;
            height: 50px;
            width: 100%;
        }
    }
}
</style>
