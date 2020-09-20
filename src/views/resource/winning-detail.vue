<template>
    <div class="table-wrap mt20 pb40">
        <qg-table subtitle="招标详情">
            <qg-table-column label="项目名称" width="157" :more="true">
                <a v-if="$route.name === 'sy-winning-detail'" href="https://www.cnpcbidding.com/html/1/index.html" target="_blank" class="link">{{params.projectName}}</a>
                <a v-else :href="params.tenderUrl" target="_blank" class="link">{{params.projectName}}</a>
            </qg-table-column>
            <qg-table-column label="中标日期" width="157">{{ params.bidDate}}</qg-table-column>
            <qg-table-column label="项目类型" width="157"> {{ params.projectType==='0' ? '其它' : '-' }}</qg-table-column>
            <qg-table-column label="项目地" width="157">{{params.projectProvince}}- {{ params.projectCity }}</qg-table-column>
            <qg-table-column label="招标单位" width="157">{{params.tenderCompany}}</qg-table-column>
            <qg-table-column label="招标单位联系人" width="157">{{params.tenderContacts }}</qg-table-column>
            <qg-table-column label="招标单位联系电话" width="157">{{ params.tenderTelephone }}</qg-table-column>
        </qg-table>

        <div class="tabs-title mt20 mb20">中标单位</div>
        <el-table :data="params.details" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="packageNumber" label="包件编码" width="150" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.packageNumber ? item.row.packageNumber : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="tenderMaterial" label="招标材料" width="200" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.tenderMaterial ? item.row.tenderMaterial : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="ranking" label="顺位" width="80" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.ranking ? item.row.ranking : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidderCompany" label="中标单位" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.bidderCompany ? item.row.bidderCompany : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidderPrice" label="中标价格" width="150" show-overflow-tooltip>
                <template slot-scope="item">
                    <span v-if="item.row.bidderPrice">{{item.row.bidderPrice | numFormat}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="enterpriseAddress" label="中标单位地址" min-width="140" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.enterpriseAddress ? item.row.enterpriseAddress : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="enterprisePhone" label="中标单位联系电话" width="140" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.enterprisePhone ? item.row.enterprisePhone : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: '',
            params: {
                bidDate: "", // 中标日期
                projectName: "", // 项目名称
                tenderCompany: "", // 招标单位
                tenderTelephone: "", // 招标单位联系电话
                tenderContacts: "", // 招标单位联系人
                tenderUrl: "",
                details: [
                    {
                        tenderMaterial: "", // 招标材料
                        bidderPrice: '', // 中标价格
                        bidderCompany: "", // 中标单位
                        enterprisePhone: '', // 中标单位联系电话
                        enterpriseAddress: '' // 中标单位地址
                    }
                ]
            }
        };
    },
    created () {
        this.id = this.$route.params.id
        this.getDetail(this.id)
    },
    methods: {
        getDetail (id) {
            if (this.$route.name === 'sy-winning-detail') {   // 中石油
                this.$http('/dcp/cnpc/bid/record/detail/' + id, {}, { type: 'get' }).then(res => {
                    this.params = res.data
                })
            } else if (this.$route.name === 'sh-winning-detail') {   // 中石化
                this.$http('/dcp/sinopec/bid/record/detail/' + id, {}, { type: 'get' }).then(res => {
                    this.params = res.data
                })
            } else {  //  中海油
                this.$http('/dcp/cnooc/bid/record/detail/' + id, {}, { type: 'get' }).then(res => {
                    this.params = res.data
                })
            }
        }
    },
    watch: {
        '$route' (to, from) {
            this.getDetail(this.$route.params.id)
        }
    }
};
</script>
<style lang="scss" scoped>
.dark {
    .link {
        text-decoration: underline;
        color: #43a1ac;
    }
}
.light {
    .link {
        text-decoration: underline;
        color: #4064d4;
    }
}
</style>
