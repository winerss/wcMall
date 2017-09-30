<template>
  <div class="catalog">
    <div class="left">
      <ul class="leftItem">
        <li v-for="(item, key) in recommend" :class="{ itemActive: activeName == item.catalog }" @click="changItem(item, key+1)" v-bind:key="item.id">
          {{ item.catalog }}
        </li>
      </ul>
    </div>
    <div class="right">
        <div class="rightItem">
            <div class="loadGoods" v-show="loading">
              <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
              </div>
            </div>
            <ul>
              <li v-for="(item, index) in goods" @click="goDetail(item)" :key="item.id">
                <router-link to=''><img class="animated zoomIn" :src="item.src" alt=""></router-link>
                <p :title="item.name">{{ item.name }}</p>
              </li>    
            </ul>            
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recommend: [{
        catalog: '全部'
      }],
      goods: [],
      activeName: '全部',
      firstTid: '',
      loading: false
    }
  },
  methods: {
    changItem (item, key) {
      this.activeName = item.catalog
      this.goods = []
      var that = this
      this.axios.post('http://www.ethedot.com/chatshop/Index/test', {
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].tid.match(item.tid)) {
            that.goods.push({gid: response.data[i].gid, name: response.data[i].name, src: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response.data[i].pic})
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    goDetail (item) {
      sessionStorage.gid = item.gid
      // 点击率
      this.axios.post('http://www.ethedot.com/chatshop/Index/clickRate', {
        id: sessionStorage.getItem('id'),
        gid: item.gid
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error)
      })
      this.$router.push('/catalog/detail/' + item.gid)
    }
  },
  mounted: function () {
    this.loading = true
    this.distinguish()
    var that = this
    // 获取分类
    this.axios.post('http://www.ethedot.com/chatshop/Index/typelist', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      that.loading = false
      for (var i = 0; i < response.data.length; i++) {
        that.recommend.push({tid: response.data[i].tid, catalog: response.data[i].comment})
      }
    })
    .catch(function (error) {
      console.log(error)
    })
    // if (sessionStorage.id === ',,') {
    //   alert('身份过期，请重新登录！')
    // }
    // 获取商品
    this.axios.post('http://www.ethedot.com/chatshop/Index/test', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      // var matchId = that.recommend[0].tid
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].tid.match(that.firstTid)) {
          that.goods.push({gid: response.data[i].gid, name: response.data[i].name, src: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response.data[i].pic})
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
*{
  margin:0;
  padding: 0;
}
.itemActive{
  border-left: 3px solid rgb(250,140,0);
  background: #f4f4f4;
  color: rgb(250,140,0);
}
.product_ul{
  li{
    list-style: none;
    background: #fff;
    width: 30%;
    float: left;
    margin-left: 3%;
    margin-top: 10px;
    img{
      height: 65px;
      width: 100%;
      display: block;
    }
    p{
      font-size: 14px;
      text-align: center;
      color: #333;
      height: 30px;
      line-height: 30px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      padding: 0 2px;
      background: rgba(0,0,0,0.1)
    }
  }
}
.catalog{
  .loadGoods{
    color: red;
    z-index: 2;
    position: fixed;
  }
  .left{
    .leftItem{
        position: fixed;
        top: 0;
        bottom: 50px;
        left: 0;
        width: 25%;
        overflow-y: scroll;
        background: #fff;
      &::-webkit-scrollbar {
        display: none;
      }
      li{
        list-style: none;
        font-size: 0.8rem;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ebebeb;
      }
    }
  }
  .right{
    .rightItem{
        background: #eee; 
        position: fixed;
        top: 0;
        bottom: 50px;
        right: 0;
        width: 75%;
        overflow-y: scroll;
        border-right: 1px solid #ddd;
        .loadGoods{
          width: 100%;
          height: 100%;
          .spinner {
            position: absolute;
            top: 40%;
            left: 20%;
            width: 50px;
            height: 60px;
            text-align: center;
            font-size: 10px;
          }
          .spinner > div {
            background-color: #f29600;
            height: 100%;
            width: 6px;
            display: inline-block;
            
            -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
            animation: stretchdelay 1.2s infinite ease-in-out;
          }
          .spinner .rect2 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
          }
          .spinner .rect3 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
          }
          .spinner .rect4 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
          }
          .spinner .rect5 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
          }
          @-webkit-keyframes stretchdelay {
            0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
            20% { -webkit-transform: scaleY(1.0) }
          }
          @keyframes stretchdelay {
            0%, 40%, 100% {
              transform: scaleY(0.4);
              -webkit-transform: scaleY(0.4);
            }  20% {
              transform: scaleY(1.0);
              -webkit-transform: scaleY(1.0);
            }
          }
        }
        ul{
          height: auto;
          .product_ul;
          clear: both;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      .title{
        clear: both;
        color: rgb(250,140,0);
      }
    }
  }
}
</style>
