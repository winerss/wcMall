<template>
  <div class="my-order animated slideInRight">
    <div class="container">
        <mt-header title="我的订单">
            <router-link to="/about/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <!-- <mt-button slot="right"><router-link to="/about/orderList/allOrder">查看所有订单</router-link></mt-button> -->
        </mt-header>
        <nav>
            <router-link to="/about/orderList/obligation">待付款</router-link>
            <router-link to="/about/orderList/delivery">待发货</router-link>
            <router-link to="/about/orderList/harvest">待收货</router-link>
            <router-link to="/about/orderList/ratings">已完成</router-link>
            <router-link to="/about/orderList/drawback">退款/售后</router-link>
        </nav>        
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    components: {
    }
  }
</script>
<style lang="less">
@import "../../common/animate.css";
a{
    text-decoration: none;
    color:#999;
}
.my-order{
    position: fixed;
    left: 0;
    top: 0px;
    bottom: 49px;
    width: 100%;
    z-index: 2;
    background: #f2f2f2;
    .container{
        height: 88px;
    }
    .mint-header{
        height: 44px;
        background: #fff;
        color: #999;
        border-bottom: 1px solid #ddd;
        .mint-header-title{
            color: #333;
        }
    }
    .el-tabs__header{
        margin: 0;
        .el-tabs__item.is-active{
            color: #19ad19;
        }
        .el-tabs__active-bar{
            background-color: #19ad19;
        }
    }
    nav{
        height: 43px;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #ddd;
        a{
            display: inline-block;
            flex: 1;
            line-height: 44px;
            text-decoration: none;
            color: #999;
            font-size: 14px;
            text-align: center;
            &.active{
                color: #19ad19;
                border-bottom: 2px solid #19ad19;
            }
        }
    }
}
</style>
