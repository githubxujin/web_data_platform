<template>
    <div class="mt20 ">
        <div class="table-wrap ">
            <div class="el-title pb20">企业实控人穿透分析</div>
            <div class="container">
                <el-form :inline="true" ref="form" size="medium">
                    <el-form-item style="width: 300px" prop="corporateName">
                        <el-autocomplete placeholder="企业名称" v-model="form.corporateName" clearable style="width: 300px" :fetch-suggestions="querySearchAsync"></el-autocomplete>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button type="info" @click="rest">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="d3" class="d3-box">
            <d3-instance ref="d3" :formData="form" :url="url" :type="'holder'"></d3-instance>
        </div>
    </div>
</template>

<script>
import d3Instance from './components/d3-instance.vue';
export default {
    data () {
        return {
            form: {
                corporateName: '中建二局第三建筑工程有限公司'
            },
            url: '/dcp/query/suspected/actual/holding'
        }
    },
    components: {
        d3Instance
    },
    mounted () {
        this.$refs.d3.getData();
    },
    methods: {
        //远程模糊查询
        querySearchAsync (companyName, cb) {
            this.ajax
                .json('/dcp/search/company/name/vague', { companyName }, { type: 'get' })
                .then(res => {
                    let companyName = res.data.map(i => {
                        return {
                            value: i.companyName
                        }
                    })
                    cb(companyName)
                });
        },
        query () {
            if (!this.form.corporateName) {
                this.$message.error('公司名称不能为空')
                return
            }
            this.$refs.d3.getData();
        },
        rest () {
            this.form.corporateName = '中建二局第三建筑工程有限公司'
            this.$nextTick(() => {
                this.$refs.d3.getData();
            })

        }
    }
}
</script>

<style lang="less" scoped>
.d3-box {
    margin-top: 20px;
    background: #232528;
}
.form-item {
    /deep/ .el-form-item__content {
        margin-left: 100px;
    }
    /deep/ .el-form-item__label {
        line-height: 40px;
    }
}
.btns {
    padding-top: 4px;
}
.table-wrap {
    // min-height: 600px;
}
.table-title {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 14px;
    margin: 8px 0 20px;
    font-family: PingFangSC-Regular;
}
.table-wrap {
    padding-bottom: 0;
}
.container {
    // margin-left: 34px;
}
.name-item {
    width: 300px;
    /deep/ .el-form-item__content {
        width: 100%;
    }
}
</style>