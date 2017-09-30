<template>
  <div class="homePage">
    <div class="search-top">
      <div class="search">
          <router-link to="/home/search">
            <i class="el-icon-search"></i>
            <input type="text">
            <button class="btn-search">搜索</button>
          </router-link>
      </div>
    </div>
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="item in banners" :key="item.id">
          <img @click="banner(item)" :src="item.pic" alt="">
      </mt-swipe-item>
    </mt-swipe>
      <!-- <el-carousel :interval="3000" arrow="always">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <img @click="banner(item)" :src="item.pic" alt="">
        </el-carousel-item>
      </el-carousel> -->
    <div class="list">
      <div class="loadhome" v-show="loading">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <div class="title">
        <font>推荐</font>
      </div>
      <li v-for="item in goods" :key="item.id">
        <div class="goods" @click="goDetail(item)">
          <img v-lazy='item' :src="item.src" alt="">
          <p class="text">
            <span class="name">{{ item.name }}</span>
            ￥<span class="price">{{ item.price }}</span>
          </p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: [],
      banners: [],
      loading: false
    }
  },
  methods: {
    banner (item) {
      // sessionStorage.gid = item.gid
      this.$router.push('/catalog/detail/' + item.gid)
    },
    goDetail (item) {
      sessionStorage.gid = item.gid
      this.$router.push('/catalog/detail/' + item.gid)
    }
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.loading = true
    this.axios.post('http://www.ethedot.com/chatshop/Index/test')
    .then(function (response) {
      that.loading = false
      for (var i = 0; i < response.data.length; i++) {
        that.goods.push({click: response.data[i].click, gid: response.data[i].gid, name: response.data[i].name, price: response.data[i].price, src: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response.data[i].pic})
      }
    })
    .catch(function (error) {
      console.log(error)
    })
    // banner
    this.axios.post('http://www.ethedot.com/chatshop/Index/banner')
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        that.banners.push({
          bid: response.data[i].bid,
          pic: 'http://www.ethedot.com/chatshop/Public/Uploads/' + response.data[i].url,
          gid: response.data[i].gid
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang='less'>
body{
  margin: 0;
} 
li{
 list-style: none;
}
p{
  padding: 0;
  margin: 0;
}
.homePage {
  margin-bottom: 60px;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  .list{
    width: 100%;
    .loadhome{
      .spinner {
        margin: 100px auto;
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
    .title{
      text-align: center;
      margin-top: 3%;
      font{
        padding-bottom: 2px;
        border-bottom: 2px solid #f29600;
      }
    }
    .goods{
      float: left;
      width: 44%;
      background: #ddd;
      margin-left: 4%;
      margin-top: 4%;
      height: 150px;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
        height: 150px;
      }
      img[lazy=loading] {
        width: 40;
        height: 40px;
        margin: 55px auto;
      }
      .text{
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: absolute;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        padding: 0 5%;
        color:#999;
        .name{
          width: 60%;
          display: block;
          float: left;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .price{
          color: #f29600;
        }
      }
    }
  }
  .search-top {
    background: #eee;
    height: 50px;
    .el-icon-arrow-left {
      line-height: 50px;
      margin-left: 2%;
    }
    .search {
      height: 30px;
      width: 80%;
      vertical-align: top;
      margin-top: 10px;
      margin-left: 10%;
      border-radius: 8px;
      display: inline-block;
      overflow: hidden;
      font-size: 0;
      background: #fff;
      .el-icon-search {
        margin: 0 2%;
        height: 30px;
        line-height: 30px;
        width: 6%;
        color: #f29600;
        font-size: 15px;
      }
      input {
        height: 30px;
        vertical-align: top;
        outline: none;
        border: none;
        width: 75%;
      }
      .btn-search {
        border: none;
        background: #f29600;
        color: #fff;
        height: 30px;
        line-height: 30px;
        width: 15%;
        vertical-align: top;
        margin: 0;
        padding: 0;
      }
    }
  }
  .top{
        position:absolute;
        height: 30px;
        top: 50px;
        z-index: 1;
        width: 80%;
        left: 10%;
         p{
            margin: 0;
            padding: 0;
            line-height: 30px;
            color: #bbb;
        }
        .location,.name,.search{
            float: left;
            width: 33.3%;
            height: 30px;
        }
        .location{
            text-align: left;
            img{
                width: 12px;
                margin-right: 4%;
                float: left;
                margin-top: 6px;
            }
            .city{
                margin: 0;
                padding: 0;
                float:left;
                line-height: 30px;
            }
            .el-icon-caret-bottom{
                float: left;
                margin-left: 4%;
                font-size: 12px;
                margin-top: 10px;
                color: #bbb;
            }
        }
    }  
}

.mint-swipe{
  height: 175px;
  width: 100%;
  img{
    display: inline-block;
    height: auto;
    width: 100%;
  }
  .mint-swipe-indicator{
    opacity: 1;
    background: #fff;
  }
  .mint-swipe-indicator.is-active{
    background: #f29600;
  }
}

</style>
