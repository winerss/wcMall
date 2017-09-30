<template>
    <div class="about_home">
        <div class="head">
            <img class="header-bg" src="./header_bg.png" />
            <p class="message">
                <router-link to="/about/message">
                <span class="el-icon-message"></span>消息</router-link>
            </p>
            <div class="avatar">
                <div class="img">
                    <img :src="pic" />
                </div>
                <div class="person-info">
                    <p class="nick-name">{{ user }}</p>
                </div>
            </div>
        </div>
        <div class="container">
            <ul>
                <router-link to="/about/orderList">
                    <li>
                        <span class="list-icon">
                            <img src="./icon-myorder.png" alt="">
                        </span>
                        <span class="text">我的订单</span>
                        <!-- <router-link class="right" to="/about/orderList/allOrder">查看所有订单</router-link> -->
                    </li>
                </router-link>
                <li class="list">
                    <ul>
                        <li>
                            <router-link to="/about/orderList/obligation">
                                <el-badge :value="num1" class="item">
                                    <img src="./icon-obligation.png" alt="">
                                </el-badge>
                                <p>待付款</p>   
                            </router-link>                         
                        </li>
                        <li>
                            <router-link to="/about/orderList/delivery">
                                <el-badge :value="num2" class="item">
                                    <img src="./icon-delivery.png" alt="">
                                </el-badge>
                                <p>待发货</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about/orderList/harvest">
                                <el-badge :value="num3" class="item">
                                    <img src="./icon-harvest.png" alt="">
                                </el-badge>
                                <p>待收货</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about/orderList/ratings">
                                <el-badge :value="num4" class="item">
                                    <img src="./icon-ratings.png" alt="">
                                </el-badge>
                                <p>已完成</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about/orderList/drawback">
                                <!-- <el-badge :value="num" class="item"> -->
                                    <img src="./icon-drawback.png" alt="">
                                <!-- </el-badge> -->
                                <p>退款/售后</p>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <span class="list-icon">
                        <img src="./icon-wallet.png" alt="">
                    </span>
                    <span class="text">我的钱包</span>
                </li>
                <li class="balance">
                    <div class="left-slide">
                        <p>0</p>
                        <p>积分</p>
                    </div>
                    <div class="right-slide">
                        <p><span>￥0</span></p>
                        <p>余额</p>
                    </div>
                </li>
                <router-link to="/about/collect">
                    <li>
                        <span class="list-icon">
                            <img src="./icon-star.png" alt="">
                        </span>
                        <span class="text">收藏夹</span>
                        <span class="el-icon-arrow-right"></span>
                    </li>
                </router-link>
                <!-- <router-link to="/about/orderList/obligation/myOrder/address">
                    <li>
                        <span class="color color4"></span>
                        <span>收货地址</span>
                        <span class="el-icon-arrow-right"></span>
                    </li>
                </router-link> -->
                <router-link to="/about/setUp">
                    <li>
                        <span class="list-icon">
                            <img src="./icon-setting.png" alt="">
                        </span>
                        <span class="text">设置</span>
                        <span class="el-icon-arrow-right"></span>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      user: '',
      pic: '',
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0
    }
  },
  methods: {
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.axios.post('http://www.ethedot.com/chatshop/Index/index', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      that.user = response.data.nickname
      that.pic = response.data.headimgurl
    })
    .catch(function (error) {
      console.log(error)
    })

    this.axios.post('http://www.ethedot.com/chatshop/Index/orderlist')
    .then(function (response) {
      response = response.data
      for (var i = 0; i < response.length; i++) {
        if (response[i].state === '0') {
          that.num1 += 1
        } else if (response[i].state === '1') {
          that.num2 += 1
        } else if (response[i].state === '2') {
          that.num3 += 1
        } else if (response[i].state === '3') {
          that.num4 += 1
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
@import "../../common/animate.css";
* {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
    color: #ddd;
}

.about_home {
    position: fixed;
    left: 0;
    top: 0px;
    bottom: 49px;
    width: 100%;
    z-index: 2;
    background: #f2f2f2;
    .head {
        height: 160px;
        margin-bottom: 8px;
        position: relative;
        .header-bg {
            position: absolute;
            display: inline-block;
            height: 160px;
            width: 100%;
        }
        .message {
            position: absolute;
            width: 90%;
            margin: 8px auto 0;
            text-align: right;
            color: #e7e7e7;
            span {
                margin-right: 5px;
            }
        }
        .avatar {
            position: absolute;
            height: 120px;
            width: 100%;
            top: 20px;
            .img{
                float: left;
                height: 100px;
                width: 100px;
                border-radius: 50%;
                margin-left: 5%;
                img {
                    height: 100px;
                    width: 100px;
                }                
            }
        
            .person-info {
                float: left;
                margin: 40px 0 0 20px;
                color: #ddd;
                width: 200px;
                .nick-name {
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    font-size: 18px;
                    line-height: 25px;
                }
            }
        }
    }
    .container {
        a {
            text-decoration: none;
            color: #000;
        }
        ul {
            li {
                list-style: none;
                height: 45px;
                border-bottom: 1px solid #ddd;
                background: #fff;
                .el-badge__content{
                    margin-top: 10px;
                    background: #f29600;
                }
                .list-icon {
                    float: left;
                    margin-left: 5%;
                    img {
                        width: 25px;
                        margin-top: 10px;
                    }
                }
                .text{
                    margin-left: 2%;
                    display: inline-block;
                    line-height: 45px;
                }
                .right{
                    float: right;
                    margin-right: 5%;
                    display: block;
                    line-height: 45px;
                }
                .el-icon-arrow-right {
                    float: right;
                    line-height: 45px;
                    color: #bbb;
                    margin-right: 5%;
                }
            }
            .list{
                height: 80px;
                margin-bottom: 8px;
                ul{
                    display: flex;
                    li{
                        flex: 1;
                        border-bottom: none;
                        text-align: center;
                        img{
                            height: 25px;
                            margin-top: 15px;
                        }
                        p{
                            font-size: 0.8rem;
                            line-height: 1.5rem;
                        }
                    }
                }
            }
            .balance{
                height: 70px;
                display: flex;
                text-align: center;
                margin-bottom: 8px;
                .left-slide,.right-slide{
                    flex: 1;
                    height: 40px;
                    margin-top: 15px;
                }
                .left{
                    border-right: 1px solid #ddd;
                }
            }
        }
    }
}
</style>
