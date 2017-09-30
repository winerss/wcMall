<template>
  <div class="myOrder">
    <mt-header title="我的订单">
        <router-link to="/about/orderList/obligation" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>        
    <p @click="showA"><mt-cell is-link>{{ this.defaultAddress }}</mt-cell></p>
    <li v-for="item in goods" :key="item.id">
        <div class="content">
                <p>订单号：{{ item.order }}</p>
                <p>金额：<span class="price">￥{{ item.count }}</span></p>
                <p>数量：{{ item.shuliang }}</p>
        </div>
        <div class="footer">
            <p>合计：<span class="total">￥{{ item.count }}</span> 商品件数<span class="amount">{{ item.shuliang }}</span>
            <button class="bill" @click="bill">结算</button>
            </p>
        </div>  
    </li>
    <Vaddress v-show="show" ref='address' @addr="childAddr" :child-order='this.order'></Vaddress>
  </div>
</template>
<script>
import Vaddress from './address'
export default {
  data () {
    return {
      num1: 1,
      goods: [],
      message: '',
      defaultAddress: '',
      order: '',
      show: false
    }
  },
  methods: {
    childAddr (data) {
      this.defaultAddress = data
    },
    showA () {
      this.$refs.address.showaddress()
    },
    bill () {
      if (this.defaultAddress !== null) {
        console.log(this.order)
        window.open('http://www.ethedot.com/chatshop/Pay/pubpay/order/' + this.order)
      } else {
        alert('请选地址')
      }
    }
  },
  components: {
    Vaddress
  },
  mounted: function () {
    this.distinguish()
    //  收货地址
    var that = this
    this.order = that.$route.params.num
    this.axios.post('http://www.ethedot.com/chatshop/Index/defaultaddress', {
      id: sessionStorage.getItem('id'),
      order: this.$route.params.num
    })
    .then(function (response) {
      that.defaultAddress = response.data.address
      that.goods.push({
        order: that.order,
        adress: response.data.address,
        count: response.data.count,
        shuliang: response.data.shuliang
      })
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
}
li{
    list-style: none;
}
.myOrder{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 5;
    background:#fff;
    .mint-cell{
        margin: 0 0 8px 0;
        border-bottom: 1px solid #ddd;
    }
    .content{
        background: #fff;
        border-bottom: 2px dotted #ddd;
        margin-bottom: 10px;
        p{
            padding: 0 5%;
            line-height: 30px;
        }
   }
   .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: #fff;
        p{
            padding: 0 5%;
            line-height: 50px;
            .total,.bill,.amount{
                color:red;
            }
            .bill{
                float: right;
                height: 23px;
                width: 70px;
                margin-top: 12px;
                border: 1px solid red;
                background: none;
                border-radius: 4px;
                outline: none;
                a{
                    color:red;
                }
            }
        }
    }
}
</style>
