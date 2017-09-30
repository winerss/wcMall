<template>
<div class="system">
    <div class="list">
        <p class="description">您的退货申请已经审核，点击查看</p>
    </div>
</div>
</template>

<script>
export default {
  mounted: function () {
    this.distinguish()
  }
}
</script>

<style lang="less">
.system{
    .list{
        width: 300px;
        height: 30px;
        background: #eee;
        margin: 10px auto;
        border-radius: 10px;
        color: #666;
        p{
            padding: 0 25px;
            line-height: 30px;
        }
        .description{
            padding: 0 20px;
        }
        
    }    
}

</style>
