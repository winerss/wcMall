<template>
<div class="trade">
    <div class="list">
        <p class="description">您的物流有了新的进展</p>
        <p class="time">2017.08.16</p>
    </div>
    <div class="list">
        <p class="description">您的物流有了新的进展</p>
        <p class="time">2017.08.16</p>
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
.trade{
    .list{
        width: 300px;
        height: 60px;
        background: #eee;
        margin: 10px auto;
        border-radius: 10px;
        color: #666;
        p{
            padding: 0 25px;
            line-height: 30px;
            margin: 0;
        }
        .description{
            padding: 0 20px;
        }
        
    }    
}

</style>
