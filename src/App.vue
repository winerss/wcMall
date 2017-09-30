<template>
  <div>
    <router-view></router-view>
    <!-- <div class="loading" v-show="show">
      <button @click="loading">进入商城</button>
    </div> -->
    <div class="mynav">
      <mt-tabbar>
        <mt-tab-item>
          <router-link to="/home">
            <img src="./images/icon/home.png" alt=""><br> 
            首页
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/catalog">
            <img src="./images/icon/Category.png" alt=""><br> 
            分类
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/cart">
            <img src="./images/icon/cart.png" alt=""><br> 
            购物车
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/about">
            <img src="./images/icon/account.png" alt=""><br> 
            我的
          </router-link>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      show: true,
      myArr: []
      // distinguish: 0
    }
  },
  methods: {
    // dist () {
    //   if (this.distinguish === 1) {
    //     console.log(0)
    //   }
    // }
  },
  components: {
  },
  mounted: function () {
    // var that = this
    // this.show = false
    // this.axios.get('http://www.ethedot.com/chatshop/Index/index')
    // .then(function (response) {
    //   console.log(response)
    //   that.myArr.push(response.data.id, response.data.nickname, response.data.openid)
    //   sessionStorage.setItem('id', that.myArr)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
    // if (sessionStorage.id === ',,') {
    //   alert('身份过期，请重新登录！')
    // }
    // this.distinguish = 1
    this.distinguish()
  }
}
</script>

<style lang="less">
  .aStyle{
    text-decoration: none;
  }
  .loading{
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
    button{
      width: 50%;
      height: 40px;
      margin-left: 25%;
      margin-top: 300px; 
      background: #f96000;
      border: none;
      border-radius: 5px;
      color: #fff;
    }
  }
  .mynav{
    position: fixed;
    height: 50px;
    bottom: -1px;
    width: 100%; 
    z-index: 2;
    border-top: 1px solid #ebebeb;
    .mint-tabbar{
      z-index:2;
      position: fixed;
      height: 50px;
      bottom: -1px;
      a{
        .aStyle;
        color: #999;
        &.active{
          color: rgb(250,140,0);
        }
        img{
          width: 25px;
          height: 25px;
        }
      }
      .mint-tab-item-label{
        a{
          display: block;
        }
      }
    }
  }

</style>
