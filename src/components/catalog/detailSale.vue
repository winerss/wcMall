<template>
  <div class="detailSale" v-show="show" @click="hideSale">
      <div class="detail-wrapper">
        <div class="main">

        </div>
      </div>
      <div class="content">
         <p class="title">本店活动</p>
         <p>1.全场满88享受9.5折优惠；</p>
         <p>2.全场满188享受8.5折优惠；</p>
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
    showSale () {
      this.show = true
    },
    hideSale () {
      this.show = false
    }
  }
}
</script>
<style lang="less">
.detailSale{
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
          padding-bottom: 206px;
        }
    }
    .content{
        position: relative;
        height: 157px;
        width: 100%;
        clear: both;
        margin: -206px auto 0 auto;
        background: #fff;
        .title{
            text-align: center;
            font-size: 18px;
            line-height: 50px;
            color: #f19600;
        }
        p{  
            width: 90%;
            margin: 0 auto;
            line-height: 25px;
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
