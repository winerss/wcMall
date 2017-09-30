<template>
<div class="address" v-show="show">
    <mt-header>
        <router-link to="" slot="left">
            <mt-button  @click="hide" icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <li v-for="(item, key) in addressList" :key="item.id">
        <div class="addressList">
            <p>
                <span @click.stop.prevent ="select(item)"><el-checkbox v-model="item.status">默认地址</el-checkbox></span>
                <span class="right" @click="deladdress(item, key)"><i class="el-icon-delete"></i>删除</span>
            </p>
            <p>{{ item.name }}<span class="right" @click="test(item, key)">{{ item.tel }}</span></p>
            <p>{{ item.city }}<span class="right" @click="update(item)"><i class="el-icon-edit"></i>编辑</span></p>
        </div>
    </li>
    <div class="addAddress">
        <p @click="address">新增收货地址</p>
    </div> 
    <div class="newAddress animated slideInRight" v-show="newAddress">
        <mt-header title="编辑地址">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="newAddress = !newAddress">返回</mt-button>
            </router-link>
            <mt-button slot="right" @click="save">保存</mt-button>
        </mt-header>
        <p class="name"><span>收货人</span><input type="text" v-model="newData[0]"></p>
        <p class="tel"><span>联系电话</span><input type="text" v-model="newData[1]"></p>
        <p class="city"><span>所在城市</span><input type="text" v-model="newData[2]"></p>
        <p class="street"><span>街道</span><input type="text" v-model="newData[3]"></p>
    </div>
    <div class="updateAddress animated slideInRight" v-show="updateAddress">
        <mt-header title="编辑地址">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="updateAddress = !updateAddress">返回</mt-button>
            </router-link>
            <mt-button slot="right" @click="updatesave">保存</mt-button>
        </mt-header>
        <p class="name"><span>收货人</span><input type="text" v-model="newData[0]"></p>
        <p class="tel"><span>联系电话</span><input type="text" v-model="newData[1]"></p>
        <p class="city"><span>所在城市</span><input type="text" v-model="newData[2]"></p>
        <p class="street"><span>街道</span><input type="text" v-model="newData[3]"></p>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      newAddress: false,
      updateAddress: false,
      newData: ['', '', '', ''],
      addressList: [],
      changeID: '',
      show: false
    }
  },
  props: ['childOrder'],
  methods: {
    test (item, key) {
      console.log(1)
    },
    showaddress () {
      this.show = true
    },
    hide () {
      this.show = false
    },
    select (item, key) {
      var that = this
      item.status = !item.status
      if (item.status === true) {
        this.axios.post('http://www.ethedot.com/chatshop/Index/selectAddress', {
          aid: item.aid,
          id: sessionStorage.getItem('id'),
          order: that.childOrder
        })
        .then(function (response) {
          if (response.data === 1) {
            that.$emit('addr', item.city)
            that.show = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    save () {
      var arr = []
      if (this.newData[0] && this.newData[1] && this.newData[2] && this.newData[3] !== '') {
        for (let i = 0; i < 4; i++) {
          arr.push(this.newData[i])
        }
        this.axios.post('http://www.ethedot.com/chatshop/Index/address', {
          address: arr,
          id: sessionStorage.getItem('id')
        })
        .then(function (response) {
          if (response.data === 1) {
            alert('保存成功！')
            location.reload()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert('信息不完整！')
      }
    },
    address () {
      this.newAddress = true
    },
    update (item) {
      this.updateAddress = true
      this.changeID = item.aid
    },
    updatesave () {
      var that = this
      var arr = []
      if (this.newData[0] && this.newData[1] && this.newData[2] && this.newData[3] !== '') {
        for (let i = 0; i < 4; i++) {
          arr.push(this.newData[i])
        }
        this.axios.post('http://www.ethedot.com/chatshop/Index/updateaddress', {
          address: arr,
          aid: that.changeID,
          id: sessionStorage.getItem('id')
        })
        .then(function (response) {
          if (response.data === 1) {
            alert('修改成功！')
            location.reload()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert('信息不完整！')
      }
    },
    deladdress (item, key) {
      var that = this
      this.axios.post('http://www.ethedot.com/chatshop/Index/deladdress', {
        id: sessionStorage.getItem('id'),
        aid: item.aid
      })
      .then(function (response) {
        if (response.data === 1) {
          alert('删除成功！')
          // location.reload()
          that.addressList.splice(key, 1)
        } else {
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
    this.axios.post('http://www.ethedot.com/chatshop/Index/getaddress', {
      id: sessionStorage.getItem('id')
    })
    .then(function (response) {
      var data = response.data
      for (let i = 0; i < data.length; i++) {
        that.addressList.push({
          aid: data[i].aid,
          name: data[i].name,
          tel: data[i].telphone,
          city: data[i].address,
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
li{
    list-style: none;
}
.address{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 5;
    background:#eee;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    .addressList{
        background: #fff;
        margin-bottom: 8px;
        padding: 0 5%;
        font-size: 0.875em;
        p{
            line-height: 30px;
            margin: 0;
            .right{
                float: right;
                color:#333;
                i{
                    color: #666;  
                    margin-right: 5px;
                    font-size: 14px;
                }
            }
        }
    }
    .addAddress{
        margin-top: 50px;
        width: 70%;
        margin: 50px auto 0;
        p{
            text-align: center;
            background: #f19600;
            line-height: 35px;
            color: #ebebeb;
            border-radius: 8px;
        }
    }
    .newAddress{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #eee;
        z-index: 6;
        p{
            height: 40px;
            line-height: 40px;
            background: #fff;
            border-bottom: 1px solid #ddd;
            color: #666;
            font-size: 0;
            padding: 0 5%;
            span{
                font: 16px sans-serif;
                width: 20%;
                float: left;
                line-height: 40px;
            }
            input{
                float: right;
                width: 70%;
                height: 38px;
                border: none;
                outline: none;
            }
        }
    }
    .updateAddress{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #eee;
        z-index: 6;
        p{
            height: 40px;
            line-height: 40px;
            background: #fff;
            border-bottom: 1px solid #ddd;
            color: #666;
            font-size: 0;
            padding: 0 5%;
            span{
                font: 16px sans-serif;
                width: 20%;
                float: left;
                line-height: 40px;
            }
            input{
                float: right;
                width: 70%;
                height: 38px;
                border: none;
                outline: none;
            }
        }
    }
}
</style>
