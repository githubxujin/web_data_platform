<template>
    <div class="progress-box" >
        <div class="progress ani" :style="{width:value+'%'}"></div>
    </div>
</template>
<script>
export default {
    props:['value']
}
</script>
<style lang="less" scoped>
.progress-box{
    position: relative;
    width:100%;
    height:9px;
    background:#263A81;
    margin-right: 10px;
    transition: width 2s;
    .progress{
        position: absolute;
        top:0;
        left:0;
        width: 0%;
        height: 9px;
        background-image: linear-gradient(to left, #EF6804 0%, #664B6A 98%);
        border-radius: 1px 4.5px 4.5px 1px;
        transition: width 1s;
    }
}
</style>



