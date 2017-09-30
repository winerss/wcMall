<template>
  <div class="detail">
    <div class="detailContent">
      <div class="banner">
        <router-link to=""><span onclick="window.history.go(-1)" class="el-icon-arrow-left"></span></router-link>
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="item in lunbo" :key="item.id">
            <img :src="item.pic" alt="">
        </mt-swipe-item>
      </mt-swipe>
      </div>
      <div class="introduce">
        <p>{{ detailData[0] }}</p>
      </div>
      <div class="price">
        <p class="now-price">￥{{ detailData[1] }}</p>
        <p class="old-price">原价：<del>￥{{ detailData[2] }}</del></p>
        <div class="delivery">
          <p class="delivery-left">包邮</p>
          <p class="delivery-right">上海</p>
        </div>
      </div>
      <div class="sale" @click="showSale">
        <p class="sale-left">本店活动</p>
        <p class="arrow-right"><span class="el-icon-arrow-right"></span></p>
      </div>
      <div class="promise"  @click="showServer">
        <div class="promise-container">
          <p class="promise1"><span class="el-icon-circle-check"></span>运费险</p>
          <p class="promise2"><span class="el-icon-circle-check"></span>七天退货</p>
          <p class="promise3"><span class="el-icon-circle-check"></span>正品保证</p>
        </div>
        <p class="arrow-right"><span class="el-icon-arrow-right"></span></p>
      </div>
      <div class="product-info" @click="showGoods">
        <div v-html="detailData[3]"></div>
      </div>
    </div>
    <div class="detail-footer">
      <div class="left">
        <div class="store">
          <img src="./store.png" alt="">
          <p @click="store">收藏</p>
        </div>
      </div>
      <div class="right">
        <button class="add-cart" @click="addCart">加入购物车</button>
        <button class="buy-now" @click="buyNow">立即购买</button>
      </div>
    </div>
    <detailSale v-show="show" class="animated slideInUp" ref="detailSale"></detailSale>  
    <detailServer v-show="show" class="animated slideInUp" ref="detailServer"></detailServer>  
   </div>
</template>
<script>
import detailSale from './detailSale'
import detailServer from './detailServer'

export default {
  data () {
    return {
      show: false,
      detailData: [],
      gid: '',
      addSuccess: false,
      lunbo: []
    }
  },
  methods: {
    buyNow () {
      this.addCart()
    },
    showSale () {
      this.$refs.detailSale.showSale()
    },
    showServer () {
      this.$refs.detailServer.showServer()
    },
    showGoods () {
      this.$refs.detailGoods.showGoods()
    },
    store () {
      var that = this
      that.axios.post('http://www.ethedot.com/chatshop/Index/store', {
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
        if (response.data.length > 0) {
          var arr = []
          for (var i = 0; i < response.data.length; i++) {
            arr.push(response.data[i].gid)
          }
          if (arr.indexOf(that.gid) < 0) {
            that.axios.post('http://www.ethedot.com/chatshop/Index/addStore', {
              gid: that.gid
            })
            .then(function (response) {
              if (response.data === 1) {
                alert('收藏成功！')
              } else if (response.data === 2) {
                alert('收藏失败！')
              }
            })
            .catch(function (error) {
              console.log(error)
            })
          } else {
            alert('收藏成功！')
          }
        } else {
          that.axios.post('http://www.ethedot.com/chatshop/Index/addStore', {
            gid: that.gid
          })
          .then(function (response) {
            if (response.data === 1) {
              alert('收藏成功')
            } else if (response.data === 2) {
              alert('收藏失败！')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    addCart () {
      var that = this
      that.axios.post('http://www.ethedot.com/chatshop/Index/car', {
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
        if (response.data.length > 0) {
          var arr = []
          for (var i = 0; i < response.data.length; i++) {
            arr.push(response.data[i].gid)
          }
          if (arr.indexOf(that.gid) < 0) {
            that.axios.post('http://www.ethedot.com/chatshop/Index/caozuo', {
              gid: that.gid,
              id: sessionStorage.getItem('id')
            })
            .then(function (response) {
              if (response.data === 1) {
                that.$router.push('/cart')
              } else if (response.data === 2) {
                alert('添加失败！')
              }
            })
            .catch(function (error) {
              console.log(error)
            })
          } else {
            that.$router.push('/cart')
          }
        } else {
          that.axios.post('http://www.ethedot.com/chatshop/Index/caozuo', {
            gid: that.gid,
            id: sessionStorage.getItem('id')
          })
          .then(function (response) {
            if (response.data === 1) {
              that.$router.push('/cart')
            } else if (response.data === 2) {
              alert('添加失败！')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {
    detailSale,
    detailServer
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.axios.post('http://www.ethedot.com/chatshop/Index/test')
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (that.$route.params.gid === response.data[i].gid) {
          that.detailData.push(
            response.data[i].name,
            response.data[i].price,
            response.data[i].oldpri,
            response.data[i].content,
          )
          that.gid = response.data[i].gid
          var arr = response.data[i].lunbo
          for (let i = 0; i < arr.length; i++) {
            that.lunbo.push({
              'pic': arr[i]
            })
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>
 
<style lang='less'>
@import '../../common/animate.css';
p{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
.detail{
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 50px;
  width: 100%;
  z-index: 2;
  background: #fff;
  .detailContent{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 50px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none; 
    }
  }
  .banner{
    height: 300px;
    overflow: hidden;
    position: relative;
    .mint-swipe{
      height: 300px;
        .mint-swipe-indicator{
          opacity: 1;
          background: #fff;
        }
        .mint-swipe-indicator.is-active{
          background: #f29600;
        }
    }
    span{
      position: absolute;
      left: 5%;
      top: 5%;
      color: #ebebeb;
      font-size: 20px;
      font-weight: bold;
      z-index: 10;
    }
    img{
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .mint-cell{
      position: absolute;
      width: 100%;
      bottom: 0;
      background: #000;
      .mint-cell-text{
        color:#f29600;
        font-weight: 500;
        font-size: 16px;
        display: inline-block;
        line-height: 48px;
      }
    }
  }
  .introduce{
    height: 75px;
    background: #f8f8f8;
    p{
      padding: 0 2%;
      line-height: 25px;
    }
  }
  .price{
    .now-price,.old-price,.delivery{
      width: 90%;
      margin: 0 auto;
    }
    .now-price{
      line-height: 35px;
      font-size: 16px;
      color: red;
    }
    .old-price{
      font-size: 14px;
      color: #666;
      line-height: 25px;
    }
    .delivery{
      height: 40px;
      .delivery-left{
        float: left;
        line-height: 40px;
        color: #666;
      }
      .delivery-right{
        float: right;
        line-height: 40px;
        color: #666;
      }
    }
  }
  .sale,.promise,.product-info{
    height: 40px;
    background: #fff;
    padding: 0 5%;
    color: #333;
    .arrow-right{
      float: right;
      line-height: 40px;
    }
  }
  .sale{
    .sale-left{
      float: left;
      line-height: 40px;
    }
    border-bottom: 1px solid #ddd;
  }
  .promise{
    border-bottom: 1px solid #ddd;
    .promise-container{
      p{
        float: left;
        width: 30%;
        line-height: 40px;
        span{
          color: #f29600;
          margin-right: 2%;
        }
      }
    }
  }
  .product-info{
    .product-left{
      float: left;
      line-height: 40px;
    }
  }
  .detail-footer{
    z-index: 3;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 49px;
    border-top: 1px solid #ebebeb;
    background: #fff;
    .left{
      width: 40%;
      float: left;
      height: 50px;
      text-align: center;
      font-size: 0;
      margin: 0;
      border: none;
      p{
        font-size: 14px;
        line-height: 20px;
        color:#666;
      }
      img{
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-top: 8px;
      }
      .store{
        width: 100%;
        float: right;
        height: 50px;
      }
    }
    .right{
      float: right;
      width: 60%;
      height: 50px;
      font-size: 0;
      button{
        padding: 0;
        margin: 0;
        border: none;
        height: 50px;  
        font-size: 14px;
        color:#ebebeb;
      }
      .add-cart{
        background: #999;
        width: 45%;
        float: left;
        outline: none;
      }
      .buy-now{
        background: #f29600;
        width: 55%;
        float: right;
      }
    }
  }
}
</style>
