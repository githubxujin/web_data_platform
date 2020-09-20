<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <!-- 评级记录 -->
        <div class="sub-title mb20 mt20" id="baseIcon">评级记录</div>
        <el-table :data='recordList' border>
            <el-table-column :formatter="formatLabel" prop='ratingDate' label='评级日期' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='ratingObject' label='对象' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='ratingWay' label='方式' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='rating' label='评级' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='ratingCompany' label='评级公司' show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='recordParams.size' @size-change='getRecord' :current-page.sync='recordParams.current' @current-change='getRecord'
            layout='total, sizes, prev, pager, next, jumper' :total='recordTotal' v-if='recordTotal > 10'>
        </el-pagination>
        <!-- 评级记录 -->

        <!--  债券发行 -->
        <div class="sub-title mb20 mt20" id="shareholder">债券发行</div>
        <el-table :data='issueList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issuerName' width="100" label='发行人名称' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueDate' width="95" label='债券发行日' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='bondName' label='债券名称' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='delistingDate' width="95" label='债券摘牌日' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='term' label='债券期限' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='shortName' label='债券简称' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='type' label='债券类型' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='interestDate' width="95" label='债券起息日' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeType' label='公告类型' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='dueDate' width="95" label='到期兑付日' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='publishDate' label='发布时间' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='actualCirculation' width="120" label='实际发行量(亿)' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='disclosureObject' label='披露对象' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='lastestRating' label='最新评级' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='title' label='标题' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='status' width="50" label='状态' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='exerciseDate' label='行权日期' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='planIssueCount' width="95" label='计划发行量' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='url' label='公告原文' show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='issueParams.size' @size-change='getIssue' :current-page.sync='issueParams.current' @current-change='getIssue'
            layout='total, sizes, prev, pager, next, jumper' :total='issueTotal' v-if='issueTotal > 10'>
        </el-pagination>
        <!--  债券发行 -->

        <!-- 信息披露 -->
        <div class="sub-title mb20 mt20" id="investment">信息披露</div>
        <el-table :data='discList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueDate' label='发布时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='eventTime' label='事件时间' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='title' label='标题' show-overflow-tooltip></el-table-column>
            <el-table-column prop='litigants' label='当事人' show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.litigants.join() || '-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop='contents' label='摘要' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='code' label='代码' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='stockShortName' label='证券简称' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeSource' label='公告来源' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeCategory' label='公告类别' show-overflow-tooltip> </el-table-column>
            <el-table-column prop='sourceUrl' label='公告原文' show-overflow-tooltip>
                <template slot-scope='scope'>
                    <a :href="scope.row.sourceUrl" target="_blank">{{ scope.row.sourceUrl}}</a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='discParams.size' @size-change='getDisc' :current-page.sync='discParams.current' @current-change='getDisc'
            layout='total, sizes, prev, pager, next, jumper' :total='discTotal' v-if='discTotal > 10'>
        </el-pagination>
        <!-- 信息披露 -->

        <!-- 债券公告 -->
        <div class="sub-title mb20 mt20" id="member">债券公告</div>
        <el-table :data='noticeList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issuerName' label='发行人名称' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeTitle' label='公告标题' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeType' label='公告类型' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueDate' label='发布时间' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='disclosureObject' label='披露对象' show-overflow-tooltip> </el-table-column>
            <el-table-column prop='url' label='公告原文' show-overflow-tooltip>
                <template slot-scope='scope'>
                    <a :href="scope.row.url" target="_blank">{{ scope.row.url || '-'}}</a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='noticeParams.size' @size-change='getNotice' :current-page.sync='noticeParams.current' @current-change='getNotice'
            layout='total, sizes, prev, pager, next, jumper' :total='noticeTotal' v-if='noticeTotal > 10'>
        </el-pagination>
        <!-- 债券公告 -->

    </div>
</template>

<script>
export default {
    data () {
        return {
            recordParams: {
                current: 1,
                size: 10,
            },
            recordTotal: 0,
            recordList: [],
            issueParams: {
                current: 1,
                size: 10,
            },
            issueTotal: 0,
            issueList: [],
            discParams: {
                current: 1,
                size: 10,
            },
            discTotal: 0,
            discList: [],
            noticeParams: {
                current: 1,
                size: 10,
            },
            noticeTotal: 0,
            noticeList: [],
        };
    },
    created () {
        this.getRecord()
        this.getIssue()
        this.getDisc()
        this.getNotice()
    },
    methods: {
        routeDate () {
            return [
                {
                    id: "baseIcon",
                    name: "评级记录 " + (this.recordTotal ? `(${this.recordTotal})` : '')
                },
                {
                    id: "shareholder",
                    name: "债券发行 " + (this.issueTotal ? `(${this.issueTotal})` : '')
                },
                {
                    id: "investment",
                    name: "信息披露 " + (this.discTotal ? `(${this.discTotal})` : '')
                },
                {
                    id: "member",
                    name: "债券公告 " + (this.noticeTotal ? `(${this.noticeTotal})` : '')
                }
            ]        },
        getRecord () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/bond/rating/record', { evaluateId, ...this.recordParams })
                .then(res => {
                    this.recordList = res.data.records;
                    this.recordTotal = res.data.total;
                });
        },
        getIssue () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/bond/issue', { evaluateId, ...this.issueParams })
                .then(res => {
                    this.issueList = res.data.records;
                    this.issueTotal = res.data.total;
                });
        },

        // 获取信息披露
        getDisc () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/bond/info/disc', { evaluateId, ...this.discParams })
                .then(res => {
                    this.discList = res.data.records;
                    this.discTotal = res.data.total;
                });
        },
        getNotice () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/bond/notice', { evaluateId, ...this.noticeParams })
                .then(res => {
                    this.noticeList = res.data.records;
                    this.noticeTotal = res.data.total;
                });
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView();
        }
    },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand.copyright .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

/deep/ .el-iconfont {
    padding-left: 0;
    .item {
        background: #1e292e;
    }
}
</style>
