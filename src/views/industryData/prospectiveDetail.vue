<template>
    <div class="stat">
        <div class="table-wrap mt20">

            <div class="table-title">{{detailData.companyName}}</div>
            <table class="el-table-list">
                <tr>
                    <td>企业电话</td>
                    <td>{{detailData.phone}}</td>
                </tr>
                <tr>
                    <td>企业邮箱</td>
                    <td>{{detailData.email}}</td>
                </tr>
                <tr>
                    <td>企业地址</td>
                    <td>{{detailData.address}}</td>
                </tr>
            </table>
            <el-table :data="list" class="mt20">
                <el-table-column type="index" label="序号" width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bidDate" label="日期" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectName" label="项目名称" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectType" label="项目类型" width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ projectType[item.row.projectType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="projectProvince" label="项目地-省" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectCity" label="项目地-市/区" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tenderMaterial" label="招标材料" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tenderUnit" label="招标单位" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tenderUnitFormat" label="招标单位-规范" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" flexd="right">
                    <template slot-scope="item">
                        <el-button type="text" plain @click="toDetail(item.row.bidId)">招标详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.szie" layout="total, sizes, prev, pager, next, jumper"
                :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeName: 'first',
            total: 0,
            params: {
                current: 1,
                size: 10,
                companyName: ''
            },
            detailData: {
                companyName: '', // 企业名称
                phone: '', // 企业电话
                email: '', // 企业邮箱
                address: '' // 企业地址
            },
            companyName: '',
            list: [],
            projectType: {
                1: '基建',
                2: '房建',
                3: '市政',
                4: '工业厂房',
                5: '商业综合体',
                6: '其他'
            }
        }
    },
    created () {
        this.params.companyName = this.$route.query.companyName
        this.getDetail(this.params.companyName)
        this.getList(this.params.companyName)
    },
    methods: {
        getDetail (companyName) {
            this.$http(
                '/dcp/pre/credit/company/info',
                { companyName },
                { type: 'get' }
            ).then(res => {
                this.detailData = res.data
            })
        },
        getList (companyName) {
            this.$http('/dcp/yzw/bid/detail/page/list', this.params, {
                type: 'formData'
            }).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },

        toDetail (id) {
            window.open('https://jc.yzw.cn/SL/Index?tenderSysno=' + id + '&target=td')
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    td:nth-child(odd) {
        width: 150px;
        background: #292b2f;
        color: rgb(141, 143, 148);
        border-bottom: 1px solid #54575c;
    }
    td {
        color: rgb(193, 193, 195);
        padding: 17px 5px 17px 20px;
        line-height: 16px;
        border-bottom: 1px solid #54575c;
    }
}
</style>
