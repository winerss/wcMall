<template>
    <div class="search-page">
        <div class="search-top">
            <router-link to="/home/homePage">
                <i class="el-icon-arrow-left"></i>
            </router-link>
            <div class="search">
                <i class="el-icon-search"></i>
                <input type="text" class="input" @click="searchInput" v-model="searchContent">
                <button class="cancel" @click="cancelSearch" v-show="cancelSta">取消</button>
                <button class="btn-search" @click="search">搜索</button>
            </div>
        </div>
        <div class="nowSearch" v-show="searchSta">
            <div class="noSearch" v-show="searchList.length === 0">
              <p>很抱歉，没有找到符合您要求的商品~</p>
              <button><router-link to="/catalog">开始购物</router-link></button>  
            </div>
            <li v-for="(item, key) in searchList" :key="item.id" @click="goDetail(item)">
                <router-link to=''>
                    <span>{{ item.name }}</span>
                </router-link>
            </li>
        </div>
        <div class="history-search" v-show="historySta">
            <p class="separate"></p>
            <div class="title">
                <p class="searched">历史搜索</p>
                <p class="deleteAll" @click="clear">清空历史</p>
            </div>
            <ul class="history">
                <li v-for="(item, key) in history" :key="item.id" @click="reSearch(item)">
                    <router-link to=''>
                        <span class="hisName">{{ item.name }}</span>
                        <span class="hisDate">{{ item.date }}</span>
                    </router-link>
                </li>
                <p class="hasHis" v-show="history.length === 0">暂无历史数据</p>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      searchContent: '',
      searchSta: false,
      historySta: true,
      cancelSta: false,
      history: [],
      searchList: []
    }
  },
  methods: {
    reSearch (item) {
      this.searchContent = item.name
      this.search()
    },
    goDetail (item) {
      //  进入详情页
      let that = this
      let arr = []
      this.axios.post('http://www.ethedot.com/chatshop/Index/test', {
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          arr.push(response.data[i].name)
        }
        if (arr.indexOf(item.name) === -1) {
          alert('没有该商品！')
        } else {
          sessionStorage.name = item.name
          that.$router.push('/catalog/detail')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      // 点击率
      this.axios.post('http://www.ethedot.com/chatshop/Index/clickRate', {
        gid: item.gid,
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    clear () {
      var that = this
      this.axios.post('http://www.ethedot.com/chatshop/Index/clearHis', {
        clearHis: 1,
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
        if (response.data === 1) {
          that.history = []
        } else {
          alert('删除异常！')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    hotSearch () {
    },
    searchInput () {
      this.searchSta = true
      this.historySta = false
      this.cancelSta = true
      document.querySelector('.input').style.width = '60%'
    },
    cancelSearch () {
      this.searchSta = false
      this.historySta = true
      this.cancelSta = false
      document.querySelector('.input').style.width = '75%'
      this.searchContent = ''
      this.searchList = []
    },
    search () {
      this.searchSta = true
      this.historySta = false
      this.cancelSta = true
      document.querySelector('.input').style.width = '60%'
      //  获取查询信息
      if (this.searchContent === '') {
        return
      }
      var that = this
      var arr = []
      that.searchList = []
      that.axios.post('http://www.ethedot.com/chatshop/Index/test', {
        id: sessionStorage.getItem('id')
      })
      .then(function (response) {
        var data = response.data
        for (let i = 0; i < data.length; i++) {
          arr.push({gid: data[i].gid, name: data[i].name})
        }
        if (that.searchContent.length !== 0) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].name.length >= that.searchContent.length) {
              var reg = new RegExp(that.searchContent)
              if (arr[i].name.match(reg)) {
                that.searchList.push({gid: data[i].gid, name: arr[i].name})
              }
            } else {
              var reg1 = new RegExp(arr[i])
              if (that.searchContent.match(reg1)) {
                that.searchList.push({gid: data[i].gid, name: arr[i]})
              }
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      // 传搜索的值
      that.axios.post('http://www.ethedot.com/chatshop/Index/dataSearh', {
        name: that.searchContent,
        id: sessionStorage.getItem('id')
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
    this.axios.post('http://www.ethedot.com/chatshop/Index/getSearh', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        that.history.push({name: response.data[i].name, date: response.data[i].date})
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang='less'>
.search-page {
    margin-bottom: 50px;
    position: relative;
    z-index: 2;
    background: #fff;
    .search-top {
        background: #eee;
        height: 50px;
        .el-icon-arrow-left {
            line-height: 50px;
            margin-left: 2%;
        }
        .search {
            height: 30px;
            width: 85%;
            vertical-align: top;
            margin-top: 10px;
            margin-left: 2%;
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
            .cancel{
                height: 30px;
                width: 15%;
                background: none;
                border: none;
                outline: none;
                color: #00B2EE;
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
                outline: none;
            }
        }
    }
    .history-search {
        .separate {
            width: 100%;
            height: 1px;
            background: #eee;
            margin: 0;
            padding: 0;
        }
        .title {
            height: 30px;
            p {
                margin: 0;
                padding: 0;
                line-height: 30px;
                color: #f29600;
            }
            .searched {
                float: left;
                margin-left: 5%;
            }
            .deleteAll {
                float: right;
                margin-right: 5%;
            }
        }
        .history{
            margin: 0;
            padding: 0;
            li{
                list-style: none;
                height: 30px;
                line-height: 30px;
                color:#999;
                border-top: 1px solid #ddd;
                padding: 0 2%;
                font-size: 14px;
                a{
                    color: #999;
                }
                .hisName{
                    float: left;
                    margin-left: 2%;
                }
                .hisDate{
                    margin-right: 2%;
                    float: right;
                }
            }
            .hasHis{
                text-align: center;
                color:#999;
            }
        }
    }
    .nowSearch{
        p{
            text-align: center;
            color:#999;
        }
        .noSearch{
          text-align: center;
          color:#999;
          margin-top: 15%;
          p{
            text-align: center;
            color:#999;
          }
          button{
            background: #fa8c00;
            border: none;
            height: 40px;
            width: 50%;
            font-size: 0.875em;
            border-radius: 4px;
            margin-top: 8%;
            a{
              color: #fff;
              text-decoration: none;
              display: block;
            }
          }
        }
        li{
            list-style: none;
            height: 30px;
            line-height: 30px;
            color:#999;
            border-bottom: 1px solid #ebebeb;
            padding: 0 2%;
            a{
                color: #999;
                text-decoration: none;
            }
        }
    }
}
</style>
