<template>
    <div class="table-wrap mt20">
        <qg-table subtitle="招标详情">
            <qg-table-column column="qg-two" label="中标日期">{{this.info.bidDate || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="渠道">{{this.info.channel || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="项目名称">{{this.info.projectName || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="项目类型">{{this.info.type || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="项目地-省">-</qg-table-column>
            <qg-table-column column="qg-two" label="项目地-市">-</qg-table-column>
            <qg-table-column column="qg-two" label="项目城市">{{this.info.city}}</qg-table-column>
            <qg-table-column column="qg-two" label="项目详细地址">{{this.info.projectAddress || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="招标单位">{{this.info.tender || '-' }}</qg-table-column>
            <qg-table-column column="qg-two" label="招标单位联系人">{{this.info.tenderContact || '-' }}</qg-table-column>
            <qg-table-column column="qg-two" label="招标单位联系电话">{{ this.info.tenderPhone || '-' }}</qg-table-column>
            <qg-table-column column="qg-two" label="招标组织联系人">{{this.info.tenderOrgContact || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="招标组织联系电话">{{ this.info.tenderOrgPhone || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="建设单位">{{ this.info.businessOwner || '-' }}</qg-table-column>
            <qg-table-column column="qg-two" label="招标日期">{{ this.info.tenderDate || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="招标项目编号">{{this.info.projectNo|| '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="供货数量">{{this.info.supplyQuantityAmount|| '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="更新时间">{{this.info.updateTime || '-'}}</qg-table-column>
            <qg-table-column column="qg-two" label="更新人">{{this.info.updateBy || '-' }}</qg-table-column>
            <qg-table-column column="qg-two" label="项目概况">{{this.info.projectOverview || '-'}}</qg-table-column>
        </qg-table>
        <div class="tabs-title mt30 mb20">中标单位</div>
        <el-table :data="list">
            <el-table-column prop="packageNum" label="包件编号" align="center">
                <template slot-scope="item">
                    {{item.row.packageNum ? item.row.packageNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="materialName" label="招标材料" align="center">
                <template slot-scope="item">
                    {{item.row.materialName ? item.row.materialName : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="orderBy" label="顺位" align="center">
                <template slot-scope="item">
                    {{item.row.orderBy  ? item.row.orderBy : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidder" label="中标单位" align="left" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.bidder ? item.row.bidder : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidPrice" label="中标价格(元)" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.bidPrice ? numFormat(item.row.bidPrice)  : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidderAddress" label="中标单位地址" align="left" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.bidderAddress ? item.row.bidderAddress : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidderPhone" label="中标单位联系电话" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.bidderPhone ? item.row.bidderPhone : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidderEmail" label="中标方联系邮箱" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.bidderEmail ? item.row.bidderEmail : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { numFormat } from "@/filters/index"
export default {
    data () {
        return {
            id: this.$route.query.id,
            detailData: {},
            list: [],
            info: {},

        };
    },
    created () {
        if (this.$route.query.menu) {
            JSON.parse(this.$route.query.menu).map((i, index) => {
                if (i.url) {
                    this.$route.meta[index] = { name: i.name, path: '/' + i.url }
                } else {
                    this.$route.meta[index] = { name: i.name }

                }
            })
        } else {
            this.$route.meta[3] = { name: this.$route.query.title, path: '/' + this.$route.query.url }

        }
        this.showDetails()
    },
    methods: {
        numFormat,
        showDetails () {
            let { id } = this.$route.query
            id &&
                this.ajax
                    .post('/dcp/copy/bid/data/', { id })
                    .then(res => {
                        if (res.code === '200') {
                            const { data } = res
                            this.info = data
                            this.info.updateBy = this.$route.query.updateBy
                            this.info.updateTime = this.$route.query.updateTime
                            this.list = data.bidderList
                        }
                    })
        },
    }
};
</script>