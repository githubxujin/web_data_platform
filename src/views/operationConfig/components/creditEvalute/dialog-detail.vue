<template>
    <div>
        <el-dialog title="评估信息" :visible.sync="dialogVisible" width="600px">
            <el-table :data='list'>
                <el-table-column prop='createTime' label='评估日期' show-overflow-tooltip align='center'>
                    <template slot-scope='scope'>
                        {{ formatDate(scope.row.createTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop='channels' label='评估渠道' show-overflow-tooltip>
                    <template slot-scope='scope'>
                        {{scope.row.channels && scope.row.channels.split('/').map(i=> channelLabel(i) ).join('/') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" @click="toDetail(scope.row.id,scope.row.createTime)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='$parent.toDetail(evaluateId)' :current-page.sync='params.current' @current-change='$parent.toDetail(evaluateId)'
                layout='total, sizes, prev, pager, next, jumper' :total='params.total' v-if="params.total> 10">
            </el-pagination>
            <div slot="footer">
                <el-button type="info" @click="dialogVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { channelLabel } from "@/utils/common";
export default {
    props: {
        list: Array,
        params: Object,
        evaluateId: Number,
        companyName: String,
        type: String,
        identityCode: String,
    },
    data () {
        return {

            dialogVisible: false,
        }
    },
    methods: {
        channelLabel,
        toDetail (evaluateId, createTime) {
            let menu = [...this.$route.meta]
            menu[3].url = this.$route.path
            let name = this.type === 'company' ? '企业评估详情' : '自然人评估详情'
            menu.push({ name })
            menu = JSON.stringify(menu)
            if (this.type === 'company') {
                console.log(this.$route.meta)

                this.$router.push({ name: 'service-company-evalute-list', query: { evaluateId, companyName: this.companyName, createTime: this.formatDate(createTime), type: 'company', menu } })

            } else if (this.type === 'nature') {
                this.$router.push({ name: 'service-nature-evalute-list', query: { evaluateId, companyName: this.companyName, createTime: this.formatDate(createTime), identityCode: this.identityCode, type: 'nature', menu } })

            }
        },


    },
}
</script>

<style lang="scss" scoped>
/deep/ table {
    width: 100% !important;
}
/deep/ .cell.el-tooltip {
    width: 100% !important;
}
</style>