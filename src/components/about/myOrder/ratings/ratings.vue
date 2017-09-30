<template>
<div class="ratings animated fadeIn">
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
                                <p>金额：<span class="price">￥{{item.total}}</span></p>
                                <el-button type="danger" size="mini" @click="showAlert">申请退款</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
            <div class="drawback" v-show="show" @click="hideAlert">
                <div class="alert">
                    <p>确定退款吗?</p>
                    <button class="confirm" @click="cancel(item, key)">确定</button>
                    <button class="cancel">取消</button>                    
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
      show: false,
      goods: []
    }
  },
  methods: {
    showAlert () {
      this.show = true
    },
    hideAlert () {
      this.show = false
    },
    cancel (item, key) {
      this.show = false
      this.axios.post('http://www.ethedot.com/chatshop/Index/drawback', {
        oid: item.oid
      })
      .then(function (response) {
        if (response.data === 1) {
          alert('申请成功')
        } else {
          alert('申请异常')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    var that = this
    this.axios.post('http://www.ethedot.com/chatshop/Index/orderlist', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      response = response.data
      for (var i = 0; i < response.length; i++) {
        if (response[i].state === '3') {
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
.el-button{
    background: #fff;
    color: #666;
    border: 1px solid #ddd;
}
li{
    list-style: none;
}
.ratings{
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    .conatiner{
        margin-bottom: 95px;
        background: #f2f2f2;
        .drawback{
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
                                line-height: 40px;
                            }
                            .price{
                                color:red;
                            }
                        }
                    }
                }            
            }
        }        
    }
}
</style>
