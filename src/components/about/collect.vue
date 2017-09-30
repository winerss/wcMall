<template>
  <div class="my-collect animated slideInRight">
    <div class="container">
        <mt-header title="收藏夹">
            <router-link to="/about/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper">
            <li v-for="(item, key) in goods" :key="item.id">
                <div class="list">
                    <div class="image">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="description">
                        <p class="name">{{ item.name }}</p>
                        <p class="price">￥{{item.price}}</p>
                    </div>
                    <i class="el-icon-delete" @click="delStore(key, item)"></i>
                </div>            
            </li>            
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goods: []
    }
  },
  methods: {
    delStore: function (key, item) {
      this.axios.post('http://www.ethedot.com/chatshop/Index/delStore', {
        id: item.id
      })
      .then(function (response) {
        if (response.data === 1) {
          alert('删除成功！')
          location.reload()
        } else if (response.data === 2) {
          alert('删除失败！')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.axios.post('http://www.ethedot.com/chatshop/Index/store', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      response = response.data
      for (var i = 0; i < response.length; i++) {
        that.goods.push({
          gid: response[i].gid,
          id: response[i].id,
          name: response[i].name,
          price: parseFloat(response[i].price),
          total: parseFloat(response[i].price),
          counter: parseFloat(response[i].sum),
          pic: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response[i].pic,
          status: false
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
@import "../../common/animate.css";
a{
    text-decoration: none;
    color:#999;
}
li{
    list-style: none;
}
p{
    margin: 0;
    padding: 0;
}
.my-collect{
    position: fixed;
    left: 0;
    top: 0px;
    bottom: 49px;
    width: 100%;
    z-index: 2;
    background: #f2f2f2;
    .container{
        background: #eee;
    }
    .mint-header{
        height: 44px;
        background: #fff;
        color: #999;
        border-bottom: 1px solid #ddd;
    }
    .wrapper{
        overflow-y: scroll;
        position: fixed;
        width: 100%;
        top: 44px;
        bottom: 0px;
        &::-webkit-scrollbar{
            display: none;
        }
        .list{
            height: 80px;
            background: #fff;
            margin-bottom: 10px;
            .image{
                float: left;
                height: 80px;
                width: 30%;
                background: #ebebeb;
                img{
                    height: 40px;
                    width: 40px;
                    display: block;
                    margin: 20px auto;
                }
            }
            .description{
                float: left;
                margin: 10px 0 0 5%;
                width: 50%;
                .name{
                    font-size: 18px;
                    margin-top: 10px
                }
                .price{
                    color:red;
                }
            }
            .el-icon-delete{
                float: right;
                color: #999;  
                display: block;
                margin-right: 10%;
                margin-top: 50px;
            }
        }        
    }

}
</style>
