<template>
<div class="harvest animated fadeIn">
    <div class="conatiner">
        <li v-for="(item, key) in goods" :key="item.id">
            <div class="goods-wrapper">
                <div class="goods">
                    <div class="image">
                        <img :src="item.pic">
                    </div>
                    <div class="info-wrapper">
                        <div class="amount-wrapper">
                            <div class="left">
                                <p>{{ item.name }}</p>
                                <p>数量:<span>{{ item.counter }}</span></p>
                            </div>
                            <div class="right">
                                <p>金额：<span class="price">￥{{ item.total }}</span></p>
                                <el-button type="primary" size="mini" @click="comfirm(item)">确认收货</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </li>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      checked: false,
      num1: 1,
      goods: []
    }
  },
  methods: {
    comfirm (item) {
      this.axios.post('http://www.ethedot.com/chatshop/Index/harvest', {
        id: sessionStorage.getItem('id'),
        oid: item.oid
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error)
      })
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
        if (response[i].state === '2') {
          that.goods.push({
            oid: response[i].oid,
            name: response[i].name,
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
a{
    text-decoration: none;
    color: #999;
}
.el-button{
    background: #fff;
    color: #666;
    border: 1px solid #ddd;
}
li{
    list-style: none;
}
.harvest{
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none; 
    }
    .conatiner{
        margin-bottom: 95px;
        background: #f2f2f2;
        .goods-wrapper{
            background: #fff;
            height: 120px;
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
                    .description{
                        color:#333;
                    }
                    .amount-wrapper{
                        height: 70px;
                        margin-top: 5px;
                        .left{
                            width: 50%;
                            float: left;
                            p{
                                line-height: 35px;
                            }
                        }
                        .right{
                            height: 80px;
                            width: 50%;
                            float: left;
                            text-align: center;
                            p{
                                line-height: 35px;
                            }
                            .price{
                                color:red;
                            }
                            button{
                                margin: 0 auto;
                                width: 80px;
                                height: 25px;
                                display: block;
                                margin-top: 10px;
                                border-radius: 8px;
                                outline: none;
                            }
                        }
                    }
                }            
            }
        }        
    }
}
</style>
