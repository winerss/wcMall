<template>
<div class="obligation animated fadeIn">
    <div class="conatiner">
        <p class="noGoods" v-show="goods.length === 0">您未购买商品，快去选购吧~~</p>
        <li v-for="(item, key) in goods" :key="item.id"> 
            <div class="goods-wrapper">
                <div class="goods">
                    <div class="image">
                        <img :src="item.pic">
                    </div>
                    <div class="info-wrapper">
                        <div class="text">
                            <p class="description">{{ item.name }}</p>
                            <p>金额：<span class="price">￥{{ item.total }}</span></p>
                        </div>
                        <div class="amount-wrapper">
                            <el-button type="danger" size="mini"  @click="deleteItem(key,item)">取消订单</el-button>
                            <el-button type="primary" size="mini" @click="account(item)">结算</el-button>
                            <div class="cancel-wrapper" v-show="show" @click="closeAlert">
                                <div class="alert">
                                    <p>确定取消订单吗?</p>
                                    <button class="confirm" @click="cancel(item, key)">确定</button>
                                    <button class="cancel">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-footer">
                    <p class="selectGood" @click.stop.prevent="selectGoods(item)"><span v-show="item.status === true">✔</span></p>
                    <p>共<span class="num">{{ item.counter }}</span>件商品 合计：￥<span class="price">{{ item.price }}</span></p>
                </div>
            </div>
        </li>   
    </div>
    <div class="total-wrapper">
        <div class="left">
            <p @click='selectAll' class="selectAll"><span v-show="checkAll">✔</span></p>
            合计：￥<span class="bill">{{ sum }}</span>
        </div>
        <el-button type="primary" @click="accounts" size="mini">结算</el-button>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      checkAll: false,
      checked: false,
      num1: 1,
      goods: [],
      sum: 0,
      num: 0,
      oidArr: []
    }
  },
  methods: {
    account (item) {
      var that = this
      if (item.status === true) {
        this.oidArr.push(item.oid)
        that.axios.post('http://www.ethedot.com/chatshop/Index/account', {
          oid: that.oidArr,
          id: sessionStorage.id
        })
        .then(function (response) {
          if (response.data !== 2) {
            that.$router.push('/about/orderList/obligation/myOrder/' + response.data)
          } else if (response.data === 2) {
            alert('失败！')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert('请选择该商品！')
      }
    },
    accounts () {
      var that = this
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].status === true) {
          this.oidArr.push(this.goods[i].oid)
        }
      }
      if (this.oidArr.length !== 0) {
        that.axios.post('http://www.ethedot.com/chatshop/Index/account', {
          oid: that.oidArr,
          id: sessionStorage.id
        })
        .then(function (response) {
          if (response.data !== 2) {
            that.$router.push('/about/orderList/obligation/myOrder/' + response.data)
          } else if (response.data === 2) {
            alert('失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert('请选择商品！')
      }
    },
    cancel (item, key) {
      var that = this
      this.axios.post('http://www.ethedot.com/chatshop/Index/orderDel', {
        oid: item.oid,
        id: sessionStorage.id
      })
      .then(function (response) {
        if (response.data === 1) {
          alert('取消成功！')
          that.goods.splice(key, 1)
        } else if (response.data === 2) {
          alert('取消失败！')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    closeAlert () {
      this.show = false
    },
    deleteItem () {
      this.show = true
    },
    selectAll () {
      this.sum = 0
      if (this.checkAll === false) {
        this.checkAll = true
        this.num = this.goods.length
        for (var i = 0; i < this.goods.length; i++) {
          this.sum += this.goods[i].total * this.goods[i].counter
          this.goods[i].status = true
        }
      } else {
        this.checkAll = false
        this.num = 0
        for (var j = 0; j < this.goods.length; j++) {
          this.goods[j].status = false
          this.sum = 0
        }
      }
    },
    selectGoods (item) {
      if (item.status === false) {
        this.sum += item.price
        item.status = true
        if (item.status === true) {
          this.num += 1
        }
      } else {
        this.sum -= item.price
        item.status = false
        if (item.status === false) {
          this.num -= 1
        }
      }
      if (this.num === this.goods.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    }
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.axios.post('http://www.ethedot.com/chatshop/Index/orderlist', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      response = response.data
      for (var i = 0; i < response.length; i++) {
        if (response[i].state === '0') {
          that.goods.push({
            oid: response[i].oid,
            name: response[i].name,
            price: parseFloat(response[i].price),
            total: parseFloat(response[i].price),
            counter: parseFloat(response[i].sum),
            pic: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response[i].pic,
            status: false
          })
        }
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>
<style lang="less">
p{
    margin: 0;
    padding: 0
}
.el-button{
    background: #fff;
    color: #666;
    border: 1px solid #ddd;
}
.obligation{
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    .conatiner{
        .noGoods{
            text-align: center;
            color:#666;
            margin-top: 50%;
        }
        position: absolute;
        width: 100%;
        top: 88px;
        bottom: 50px;
        overflow-y: scroll;
        background: #f2f2f2;
        &::-webkit-scrollbar{
            display: none;
        }
        li{
            list-style: none;
        }
        .goods-wrapper{
            background: #fff;
            margin-bottom: 8px;
            padding: 1px;
            .goods{
                margin: 20px auto;
                height: 80px;
                margin-left: 5%;
                .image{
                    width: 28%;
                    float: left;
                    height: 80px;
                    img{
                        height: 80px;
                        width: 80px;
                        display: block;
                    }
                }
                .info-wrapper{
                    width: 68%;
                    float: left;
                    margin-left: 3%;
                    height: 80px;
                    color:#333;
                    .text{
                        width: 50%;
                        float: left;
                        line-height: 35px;
                        .price{
                            color: red;
                        }
                    }
                    .amount-wrapper{
                        height: 80px;
                        width: 50%;
                        float: left;
                        text-align: center;
                        .el-button{
                            margin: 0 auto;
                            width: 80px;
                            height: 25px;
                            display: block;
                            margin-top: 10px;
                            border-radius: 8px;
                            outline: none;
                        }
                        a{
                            color: #666;
                        }
                    }

                }            
            }
            .goods-footer{
                border-top: 1px solid #ddd;
                height: 37px;
                .selectGood{
                    float: left;
                    margin-top: 13px;
                    margin-left: 5%;
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    border: 1px solid #ddd;
                    font-size: 0;
                    outline: none;
                    position: relative;
                    span{
                        position: absolute;
                        color: rgb(250, 140, 0);
                        font-size: 16px;
                        line-height: 10px;
                        text-align: center;
                    }
                }
                p{
                    float: right;
                    color: #333;
                    line-height: 38px;
                    margin-right: 5%;
                    font-size: 14px;
                }
            }            
        }        
    }
    .total-wrapper{
        z-index: 2;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0; 
        height: 48px;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        background: #fff;
        .left{
            line-height: 48px;
            float: left;
            margin-left: 5%;
            width: 65%;
            .selectAll{
                float: left;
                margin-top: 18px;
                width: 12px;
                height: 12px;
                background: #fff;
                border: 1px solid #ddd;
                font-size: 0;
                outline: none;
                position: relative;
                span{
                    position: absolute;
                    color: rgb(250, 140, 0);
                    font-size: 16px;
                    line-height: 10px;
                    text-align: center;
                }
            }
            .bill{
                color: red;
                padding-right: 14%;
            }
        }
        .el-button  {
            margin-top: 12px;  
            height: 30px;
            width: 100px;  
            border-radius: 16px; 
            float: right; 
            a{
                color: #333;
                padding: 2px 5px;
            }      
        }
    }
    .cancel-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, 0.1);
        z-index: 5;
        .alert{
            position: absolute;
            height: 20%;
            width: 50%;
            top: 40%;
            left: 25%;
            background: #ebebeb;
            border-radius: 6px;
            p{
                text-align: center;
                color: #000;
                font: 16px;
                margin-top: 10%;
            }
            button{
                border: 0;
                background: rgb(250, 140, 0);
                color: #ebebeb;
                font-size: 14px;
                padding: 2px 10px;
                border-radius: 4px;
            }
            .confirm{
                float: left;
                margin-top: 10%;
                margin-left: 15%;
            }
            .cancel{
                float: right;
                margin-top: 10%;
                margin-right: 15%;
            }
        }
    }
}
</style>
