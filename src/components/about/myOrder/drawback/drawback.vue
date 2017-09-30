<template>
<div class="drawback animated fadeIn">
    <div class="conatiner">
        <li v-for="item in goods" :key="item.id">
            <div class="goods-wrapper">
                <div class="goods">
                    <div class="image">
                        <img :src="item.pic">
                    </div>
                    <div class="info-wrapper">
                        <div class="amount-wrapper">
                            <div class="left">
                                <p>{{ item.name }}</p>
                                <div class="amount">
                                    <p>数量:<span>{{ item.counter }}</span></p>
                                </div>
                            </div>
                            <div class="right">
                                退款：<span class="price">￥{{ item.price }}</span>
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
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.axios.post('http://www.ethedot.com/chatshop/Index/getDrawback')
    .then(function (response) {
      response = response.data
      for (var i = 0; i < response.length; i++) {
        that.goods.push({
          name: response[i].name,
          price: parseFloat(response[i].price),
          counter: parseFloat(response[i].sum),
          pic: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response[i].pic
        })
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
li{
    list-style: none;
}
.el-button{
    background: #fff;
    color: #666;
    border: 1px solid #999;
}
.drawback{
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
            margin-bottom: 8px;
            .goods{
                margin: 0 auto;
                height: 90px;
                .image{
                    width: 20%;
                    height: 100px;
                    float: left;
                    text-align: center;
                    img{
                    height: 50px;
                    margin-top: 23px;
                    }
                }
                .info-wrapper{
                    width:76%;
                    float: left;
                    height: 90px;
                    margin-top: 10px;
                    color:#999;
                    .description{
                        color:#333;
                    }
                    .amount-wrapper{
                        height: 70px;
                        margin-top: 5px;
                        p{
                            line-height: 25px;
                        }
                        .left{
                            float: left;
                            width: 50%;
                        }
                        .right{
                            line-height: 50px;
                            width: 50%;
                            float: right;
                            text-align: right;
                            .price{
                                color:red;
                            }
                        }
                    }
                }            
            }
            .goods-footer{
                border-top: 1px solid #ddd;
                width: 90%;
                margin: 0 auto;
                padding: 10px 0;
                p{
                    float: right;
                    color: #666;
                }
            }            
        }        
    }
}
</style>
