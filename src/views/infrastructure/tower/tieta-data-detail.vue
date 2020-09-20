<template>
    <div>
        <div class="table-wrap mt20">
            <qg-table subtitle="招标详情">
                <qg-table-column label="中标日期">{{formatDate(zhaobiaoList.pubDate) || '-'}}</qg-table-column>
                <qg-table-column label="项目名称">{{zhaobiaoList.biddTitle || '-'}}</qg-table-column>
                <qg-table-column label="项目类型">-</qg-table-column>
                <qg-table-column label="项目城市">{{zhaobiaoList.province || '-'}}</qg-table-column>
                <qg-table-column label="项目详细地址">{{zhaobiaoList.inviteBiddAddress || '-'}}</qg-table-column>
                <qg-table-column label="招标单位">{{zhaobiaoList.inviteBiddName || '-'}}</qg-table-column>
                <qg-table-column label="招标单位联系人">{{zhaobiaoList.inviteBiddContactMan || '-'}}</qg-table-column>
                <qg-table-column label="招标单位联系方式">{{zhaobiaoList.inviteBiddContactPhone || '-'}}</qg-table-column>
                <qg-table-column label="招标日期">-</qg-table-column>
                <qg-table-column label="供货数量">-</qg-table-column>
                <qg-table-column label="项目概况">-</qg-table-column>
            </qg-table>
        </div>
        <div class="table-wrap">
            <div class="tabs-title">
                中标单位
            </div>
            <el-table :data="list" class="el-table">
                <el-table-column type='index' label='序号' width='70' align="center"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='packNumber' label='包件编号' width='120' show-overflow-tooltip align="left"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='goodsName' label='招标材料' show-overflow-tooltip align="left"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='sort' label='顺位' show-overflow-tooltip align="left"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='winBiddCompany' label='中标单位' show-overflow-tooltip align="left"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='biddCost' label='中标价格' show-overflow-tooltip align="left"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='' label='中标单位地址' show-overflow-tooltip align="left"></el-table-column>
                <el-table-column :formatter="formatLabel" prop='' label='中标单位联系电话' show-overflow-tooltip align="left"></el-table-column>
            </el-table>
            <el-pagination @size-change="getList($route.query.biddId)" @current-change="getList($route.query.biddId)" :current-page.sync="params.current" :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size"
                layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            zhaobiaoList: {},
            list: [],
            params: {
                current: 1,
                size: 10
            },
            total: 0
        }
    },
    created () {
        let id = this.$route.query.id
        let biddId = this.$route.query.biddId
        this.getList_detail(id)
        this.getList(biddId)
    },
    methods: {
        getList_detail (id) {
            this.ajax
                .json('/dcp/communicate/bid/detail', { id }, { type: 'get' })
                .then(res => {
                    this.zhaobiaoList = res.data;
                })
        },
        getList (biddId) {
            this.ajax
                .json('/dcp/communicate/bid/detail/page/list', { biddId, ...this.params })
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
            console.log(biddId, 'biddId')
        }
    },
}
</script>
