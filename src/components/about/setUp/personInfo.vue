<template>
<div class="person-wrapper">
    <mt-header title="基本信息">
        <router-link to="" slot="left">
            <mt-button  onclick="window.history.go(-1)" icon="back">返回</mt-button>
        </router-link>
        <mt-button slot="right" @click="save">保存</mt-button>
    </mt-header>
    <div class="content">
        <p>用户名<input type="text" v-model="name"></p>
        <p>年龄<input type="text" v-model="age"></p>
        <p>性别<input type="text" v-model="sex"></p>
        <p>电话<input type="text" v-model="tel"></p>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      age: '',
      sex: '',
      tel: ''
    }
  },
  methods: {
    save () {
      if (this.name && this.age && this.age && this.tel !== '') {
        var that = this
        this.show = false
        this.axios.post('http://www.ethedot.com/chatshop/Index/updateInfo', {
          name: that.name,
          age: that.age,
          sex: that.sex,
          tel: that.tel
        })
        .then(function (response) {
          console.log(response)
          if (response.data === 2) {
            alert('保存成功')
            that.$router.replace('/about/setUp')
          } else {
            alert('保存失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert('请填完整')
      }
    }
  },
  mounted: function () {
    this.distinguish()
    var that = this
    this.show = false
    this.axios.post('http://www.ethedot.com/chatshop/Index/personInfo')
    .then(function (response) {
      that.name = response.data.nickname
      that.age = response.data.age
      that.sex = response.data.sex
      that.tel = response.tel
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang="less">
.person-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: #eee;
    .mint-header{
        margin-bottom: 8px;
    }
    .content{
        background: #fff;
        p{
            padding: 0 5%;
            border-top: 1px solid #ddd;
            height: 40px;
            line-height: 40px;
            color: #333;
            input{
                margin-left: 5%;
                border: none;
            }
        }
    }
}
</style>
