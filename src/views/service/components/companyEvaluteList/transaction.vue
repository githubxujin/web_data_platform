<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <!-- 专利 -->
        <div class="sub-title mb20 mt20" id="patent">专利</div>
        <el-table :data="patentList" border style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">专利名称：</span>
                                <span class="content">{{props.row.inventName || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">专利类型：</span>
                                <span class="content">{{props.row.patentType || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">申请号：</span>
                                <span class="content">{{props.row.applyNo || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">国际分类：</span>
                                <span class="content">{{ props.row.internationalType || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">发明人：</span>
                                <span class="content">{{props.row.inventor || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">申请日期：</span>
                                <span class="content">{{props.row.applyDate || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">公告日期：</span>
                                <span class="content">{{ props.row.公告日期 || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">专利权人：</span>
                                <span class="content">{{props.row.patentHolder || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">专利代理机构：</span>
                                <span class="content">{{ props.row.proxyOrgName || '-'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">地址：</span>
                                <span class="content">
                                    {{props.row.address || '-'}}
                                </span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">摘要：</span>
                                <span class="content">
                                    {{props.row.remark || '-'}}
                                </span>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="申请日期" prop="applyDate" align="center"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="专利名称" prop="inventName" align="center"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="专利类型" prop="patentType" align="center"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='patentParams.size' @size-change='getPatent' :current-page.sync='patentParams.current' @current-change='getPatent'
            layout='total, sizes, prev, pager, next, jumper' :total='patentTotal' v-if='patentTotal > 10'>
        </el-pagination>
        <!-- 专利 -->

        <!-- 著作权 -->
        <div class="sub-title mb20 mt20" id="copyright">著作权</div>
        <el-table :data="copyrightList" border style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand copyright">
                        <el-form-item>
                            <span class="copyrightTitle">作品名称：</span>
                            <span class="copyrightContent">
                                {{
                                props.row.worksName || '-'
                            }}
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">登记号：</span>
                            <span class="copyrightContent">
                                {{
                                props.row.checkInNumber || '-'
                            }}
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">分类号：</span>
                            <span class="copyrightContent">
                                {{ props.row.categoryNumber || '-' }}
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">版本号：</span>
                            <span>{{ props.row.versionNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">软件全称：</span>
                            <span>{{ props.row.softwareAllName || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">软件简称：</span>
                            <span>{{ props.row.softwareShortName || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">著作权人：</span>
                            <span>{{ props.row.copyrightOwner || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">首次发表日期：</span>
                            <span>{{ props.row.firstTimePublicDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">登记日期：</span>
                            <span>{{ props.row.checkInDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">公告日期：</span>
                            <span>{{ props.row.noticeDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">公告类型：</span>
                            <span>{{ props.row.noticeType || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告日期" prop="noticeDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告类型" prop="noticeType"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="登记号" prop="checkInNumber"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="作品名称" prop="worksName"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='copyrightParams.size' @size-change='getCopyright' :current-page.sync='copyrightParams.current' @current-change='getCopyright'
            layout='total, sizes, prev, pager, next, jumper' :total='copyrightTotal' v-if='copyrightTotal > 10'>
        </el-pagination>
        <!-- 著作权 -->

        <!-- 招投标 -->
        <div class="sub-title mb20 mt20" id="bid">招投标</div>
        <el-table :data="bidList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">地区：</span>
                            <span class="throwContent">{{
                                props.row.area || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">项目详情：</span>
                            <span class="throwContent_table">
                                <el-table :data="props.row.winningBidderList" style="width: 100%" border>
                                    <el-table-column prop="packet" label="包/项目名称" width="250">
                                    </el-table-column>
                                    <el-table-column prop="name" label="中标人" width="300">
                                    </el-table-column>
                                </el-table>
                                <el-table :data="props.row.candidateList" style="width: 100%" class="table-border  mt20">
                                    <el-table-column prop="packet" label="包/项目名称" width="250">
                                    </el-table-column>
                                    <el-table-column prop="name" label="候选人" width="300">
                                    </el-table-column>
                                </el-table>
                            </span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="发布时间" prop="issueDate" width="200"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告类型" prop="noticeType" width="250"> </el-table-column>
            <el-table-column label="采购人" width="250">
                <template slot-scope="props">
                    <span>{{props.row.purchaseName[0] || '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='bidParams.size' @size-change='getBid' :current-page.sync='bidParams.current' @current-change='getBid'
            layout='total, sizes, prev, pager, next, jumper' :total='bidTotal' v-if='bidTotal > 10'>
        </el-pagination>
        <!-- 招投标 -->

        <!--  土地信息 -->
        <div class="sub-title mb20 mt20" id="land">土地信息</div>
        <el-table :data="landList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand copyright">
                        <el-form-item>
                            <span class="copyrightTitle">土地面积(公顷): </span>
                            <span class="copyrightContent">{{
                                props.row.landArea || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">成交价格(万元):</span>
                            <span class="copyrightContent">{{
                                props.row.sellPrice || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">电子监管号:</span>
                            <span class="copyrightContent">{{ props.row.elecRegulatoryNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">土地级别:</span>
                            <span class="copyrightContent">{{ props.row.landClassLevel || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">土地用途:</span>
                            <span class="copyrightContent">{{ props.row.landUse || '-'}}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">供地方式:</span>
                            <span>{{ props.row.supplyLandWay || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">批准单位:</span>
                            <span class="copyrightContent">{{ props.row.auditOrgName || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">土地使用权:</span>
                            <span class="copyrightContent">{{ props.row.landUser || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">合同签订日期: </span>
                            <span class="copyrightContent">{{ props.row.contractDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">约定成交时间: </span>
                            <span class="copyrightContent">{{ props.row.deliveryDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">约定开工时间:</span>
                            <span class="copyrightContent">{{ props.row.agreedStartDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">约定竣工时间:</span>
                            <span class="copyrightContent">{{ props.row.agreedFinishDate || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label='序号' width='50' align='center'> </el-table-column>
            <el-table-column :formatter="formatLabel" label="发布时间" prop="publicDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告类别" prop="noticeType"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="行政区" prop="area"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="地块位置" prop="location"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="土地用途" prop="landUse"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='landParams.size' @size-change='getLand' :current-page.sync='landParams.current' @current-change='getLand'
            layout='total, sizes, prev, pager, next, jumper' :total='landTotal' v-if='landTotal > 10'>
        </el-pagination>
        <!--  土地信息 -->

    </div>
</template>
<script>
export default {
    data () {
        return {
            patentParams: {
                current: 1,
                size: 10,
            },
            patentTotal: 0,
            patentList: [],
            copyrightParams: {
                current: 1,
                size: 10,
            },
            copyrightTotal: 0,
            copyrightList: [],
            bidParams: {
                current: 1,
                size: 10,
            },
            bidTotal: 0,
            bidList: [],
            landParams: {
                current: 1,
                size: 10,
            },
            landTotal: 0,
            landList: [],
        };
    },
    created () {
        this.getPatent()
        this.getCopyright()
        this.getBid()
        this.getLand()
    },

    methods: {
        routeDate () {
            return [
                {
                    id: 'patent',
                    name: '专利 ' + (this.patentTotal ? `(${this.patentTotal})` : '')
                },
                {
                    id: 'copyright',
                    name: '著作权 ' + (this.copyrightTotal ? `(${this.copyrightTotal})` : '')
                },
                {
                    id: 'bid',
                    name: '招投标 ' + (this.bidTotal ? `(${this.bidTotal})` : '')
                },
                {
                    id: 'land',
                    name: '土地信息 ' + (this.landTotal ? `(${this.landTotal})` : '')
                }
            ]        },
        getRows () {
            return [
                { key: "医院名称", value: '123' },
                { key: "医院是否入池", value: '123' },
                { key: "医院别名", value: '123' },
                { key: "医院别名1", value: '123' },

                { key: " 单独", value: '', alone: true },
                { key: " 单独", value: '', alone: true }

            ]
        },
        getPatent () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/enterprise/assets/patent', { evaluateId, ...this.patentParams })
                .then(res => {
                    this.patentList = res.data.records;
                    this.patentTotal = res.data.total;
                });
        },
        getCopyright () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/enterprise/assets/copyright', { evaluateId, ...this.copyrightParams })
                .then(res => {
                    this.copyrightList = res.data.records;
                    this.copyrightTotal = res.data.total;
                });
        },
        // 获取招投标
        getBid () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/enterprise/assets/bid', { evaluateId, ...this.bidParams })
                .then(res => {
                    this.bidList = res.data.records;
                    this.bidTotal = res.data.total;
                });
        },
        getLand () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/enterprise/assets/land/info', { evaluateId, ...this.landParams })
                .then(res => {
                    this.landList = res.data.records;
                    this.landTotal = res.data.total;
                });
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView()
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
.elFormItemTContent {
    .patent {
        display: flex;
        justify-content: left;
        align-items: top;
        .title {
            display: inline-block;
            width: 102px;
        }
        .content {
            display: inline-block;
            width: 1100px;
        }
    }
}
.copyrightTitle {
    display: inline-block;
    width: 102px;
}

.throw {
    display: flex;
    justify-content: left;
    align-items: center;
    .throwTitle {
        display: inline-block;
        width: 102px;
    }
    .throwContent {
        display: inline-block;
        vertical-align: top;
        width: 698px;
    }
    .throwContent_table {
        display: inline-block;
        vertical-align: top;
    }
}
/deep/ .el-iconfont {
    padding-left: 0;
    .item {
        background: #1e292e;
    }
}
</style>
