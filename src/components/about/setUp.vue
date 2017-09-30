<template>
<div class="setUp">
    <mt-header title="设置">
        <router-link to="" slot="left">
            <mt-button  onclick="window.history.go(-1)" icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <mt-cell title="基本信息" to="/about/setUp/personInfo" is-link> </mt-cell>
    <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    openAlert: function () {
      this.show = true
    },
    colseAlert: function () {
      this.show = false
    }
  },
  mounted: function () {
    this.distinguish()
  }
}
</script>

<style lang="less">
*{
    outline: none;
    margin: 0;
    padding: 0;
}
.setUp{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #eee;
    .mint-header{
        height: 44px;
        background: #fff;
        color: #999;
        border-bottom: 1px solid #ddd;
        margin-bottom: 3px;
    }
    .mint-cell{
        margin-top: 5px;
    }
    .button{
        position: fixed;
        bottom: 50px;
        width: 100%;
        height: 50px;
        background: #f19600;
        border: none;
        color: #fff;
    }
    .alterShow{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        .content{
            height: 150px;
            width: 250px;
            background: #fff;
            margin: 150px auto 0;
            text-align: center;
            padding: 1px;
            p{
                margin: 35px auto;
            }
            button{
                border: none;
                width: 60px;
                height: 18px;
                font-size: 12px;
                color: #fff;
                background: #b3b3b3;
            }
            .cancel{
                margin-right: 13px;
            }
            .comfirm{
                background: #f19600;
                margin-left: 13px;
            }
        }
    }
}
</style>
