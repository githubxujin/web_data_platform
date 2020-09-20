<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">中水电建设(嘉兴)有限公司
                <span class="table-info">企业评估</span>
            </div>
            <table class="el-table-list">
                <tr>
                    <td>行业类别</td>
                    <td>基建工程</td>
                    <td>行业类别</td>
                    <td>基建工程</td>
                </tr>
                <tr>
                    <td>企业类别</td>
                    <td>核心&融资企业</td>
                    <td>跟进人</td>
                    <td>张新竹</td>
                </tr>
                <tr>
                    <td>统一社会信用代码</td>
                    <td>91330402MA2CUR21X0</td>
                    <td>申请原因</td>
                    <td>中国水利水里第十二工程局有限公司公布通知</td>
                </tr>
                <tr>
                    <td>凭证附件</td>
                    <td colspan="3">
                        <span class="table-img">上传文件.pdf</span>
                    </td>
                </tr>
            </table>
            <div class="table-title mt20">动态</div>
            <el-table :data="list">
                <el-table-column prop="date" label="序号"></el-table-column>
                <el-table-column prop="name" label="操作时间"></el-table-column>
                <el-table-column prop="address" label="操作内容"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  }
};
</script>

<style lang="scss" >
.table-info {
  font-size: 14px;
  color: #43a1ac;
}
table.el-table-list {
  .table-img {
    font-size: 14px;
    color: #43a1ac;
    letter-spacing: 0.44px;
  }
  width: 100%;
  border: 1px solid #54575c;
  border-collapse: collapse;
  td:nth-child(odd) {
    background: #292b2f;
    height: 50px;
    line-height: 50px;
    color: #a0a3a8;
    text-indent: 20px;
    border-bottom: 1px solid #54575c;
  }
  td {
    color: #d3d3d4;
    height: 50px;
    line-height: 50px;
    text-indent: 20px;
    border-bottom: 1px solid #54575c;
  }
}
</style>


