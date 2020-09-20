<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <!--天御反欺诈  -->
        <div class="sub-title mb20 mt20" id="fraud">天御反欺诈</div>
        <el-table :data='list' border>
            <el-table-column prop='riskCode' label='风险码' show-overflow-tooltip></el-table-column>
            <el-table-column prop='riskCodeValueDesc' label='风险等级' show-overflow-tooltip></el-table-column>
            <el-table-column prop='riskCodeDesc' label='风险码说明' show-overflow-tooltip></el-table-column>
            <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
            </el-pagination>
        </el-table>
        <!-- 天御反欺诈 -->

    </div>
</template>
<script>
export default {
    data () {
        return {
            params: {
                current: 1,
                size: 10,
            },
            total: 0,
            list: [],
        };
    },
    created () { },

    methods: {
        routeDate () {
            return [
                {
                    id: 'fraud',
                    name: '天御反欺诈 ' + (this.totalSize ? `(${this.totalSize})` : '')
                }
            ]        },
        getList () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json(`/dcp/query/person/anti/fraud/tencent/${evaluateId}`, {})
                .then(res => {
                    this.list = res.data.records;
                    this.totalSize = res.data.total;
                });
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView()
        }
    },

};
</script>
