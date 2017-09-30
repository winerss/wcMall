<template>
<div class="myMessage">
    <mt-header>
        <router-link to="/about/home" slot="left">
            <mt-button icon="back">我的消息</mt-button>
        </router-link>
    </mt-header>
    <nav>
        <p><router-link to="/about/message/trade">交易信息</router-link></p>
        <p><router-link to="/about/message/system">系统信息</router-link></p>
    </nav>  
    <router-view></router-view>
</div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.myMessage{
    .mint-header{
        height: 44px;
        background: #eee;
        color: #999;
    }
    nav{
        height: 44px;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #ddd;
        p{
            display: inline-block;
            flex: 1;
            margin-top: 15px;
            text-decoration: none;
            font-size: 14px;
            text-align: center;
            a{
                color: #333;
                text-decoration: none;
                &.active{
                    color: #f19600;
                    border-bottom: 2px solid #f19600;
                }
            }
        }
    }
}
</style>
