<template>
  <section class="content error-page">
    <h2 >404 未找到页面</h2>
    <div class="text">
      <p class="h3">您访问的页面不存在，请返回主页！</p>
      <p><a href="/" class="btn yellow">返回主页</a></p>
    </div>
    
  </section>
</template>

<script>

export default {
    name: 'error-page',
    data () {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
body{
  background-color :#f8f8f8;
}
.error-page{
  padding: 40px!important;
  position: relative;
  height: 500px;
  height: 500px;
  background: url('../../assets/images/404.jpg') no-repeat center center ;
  h2{display: none}
  .text{
    margin-top: 340px;
    text-align: center;
    .h3{
      font-size: 18px;
      color: #666;
      padding-bottom :20px;
      }
  }
}
</style>
