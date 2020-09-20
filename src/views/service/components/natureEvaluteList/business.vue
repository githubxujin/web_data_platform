<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <!-- 对外投资 -->
        <div class="sub-title mb20 mt20" id="investment">对外投资</div>
        <el-table :data="investmentList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">名称：</span>
                                <span class="content">{{
                                    props.row.name || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">成立日期：</span>
                                <span class="content">{{
                                    props.row.createDate || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">法定代表人：</span>
                                <span class="content">{{
                                    props.row.faRen || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册号：</span>
                                <span class="content">{{
                                    props.row.regNumber || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册资本：</span>
                                <span class="content">{{
                                    props.row.regMoney || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册资本币种：</span>
                                <span class="content">{{
                                    props.row.regMoneyCurrency || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">登记状态：</span>
                                <span class="content">{{
                                    props.row.checkInStatus || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">统一社会信用代码：</span>
                                <span class="content">{{
                                    props.row.creditCode || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="公司名称" prop="namee"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="成立日期" prop="createDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="法定代表人" prop="faRen"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="统一社会信用代码" prop="creditCode"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='investmentParams.size' @size-change='getInvestment' :current-page.sync='investmentParams.current' @current-change='getInvestment'
            layout='total, sizes, prev, pager, next, jumper' :total='investmentTotal' v-if='investmentTotal > 10'>
        </el-pagination>
        <!-- 对外投资 -->

        <!-- 担任法人 -->
        <div class="sub-title mb20 mt20" id="legal">担任法人</div>
        <el-table :data="legalList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">名称：</span>
                                <span class="content">{{
                                    props.row.name || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">成立日期：</span>
                                <span class="content">{{
                                    props.row.createDate || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">法定代表人：</span>
                                <span class="content">{{
                                    props.row.faRen || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册号：</span>
                                <span class="content">{{
                                    props.row.regNumber || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册资本：</span>
                                <span class="content">{{
                                    props.row.regMoney || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册资本币种：</span>
                                <span class="content">{{
                                    props.row.regMoneyCurrency || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">登记状态：</span>
                                <span class="content">{{
                                    props.row.checkInStatus || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">统一社会信用代码：</span>
                                <span class="content">{{
                                    props.row.creditCode || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="公司名称" prop="name"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="成立日期" prop="createDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="法定代表人" prop="faRen"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="统一社会信用代码" prop="creditCode"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='legalParams.size' @size-change='getLegal' :current-page.sync='legalParams.current' @current-change='getLegal'
            layout='total, sizes, prev, pager, next, jumper' :total='legalTotal' v-if='legalTotal > 10'>
        </el-pagination>
        <!-- 担任法人 -->

        <!-- 在外任职 -->
        <div class="sub-title mb20 mt20" id="member"> 在外任职 </div>
        <el-table :data="memberList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">名称：</span>
                                <span class="content">{{
                                    props.row.name || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">成立日期：</span>
                                <span class="content">{{
                                    props.row.createDate || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">法定代表人：</span>
                                <span class="content">{{
                                    props.row.faRen || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册号：</span>
                                <span class="content">{{
                                    props.row.regNumber || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册资本：</span>
                                <span class="content">{{
                                    props.row.regMoney || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">注册资本币种：</span>
                                <span class="content">{{
                                    props.row.regMoneyCurrency || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">登记状态：</span>
                                <span class="content">{{
                                    props.row.checkInStatus || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">职务：</span>
                                <span class="content">{{
                                    props.row.creditCode || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="elFormItemTContent">
                            <div class="patent">
                                <span class="title">统一社会信用代码：</span>
                                <span class="content">{{
                                    props.row.position || '-'
                                }}</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="公司名称" prop="namee"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="成立日期" prop="createDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="法定代表人" prop="faRen"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="职务" prop="position"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="统一社会信用代码" prop="creditCode"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='memberParams.size' @size-change='getMember' :current-page.sync='memberParams.current' @current-change='getMember'
            layout='total, sizes, prev, pager, next, jumper' :total='memberTotal' v-if='memberTotal > 10'>
        </el-pagination>
        <!--  在外任职  -->

    </div>
</template>
<script>
export default {
    data () {
        return {
            investmentParams: {
                current: 1,
                size: 10,
            },
            investmentTotal: 0,
            investmentList: [],
            memberParams: {
                current: 1,
                size: 10,
            },
            memberTotal: 0,
            memberList: [],
            legalParams: {
                current: 1,
                size: 10,
            },
            legalTotal: 0,
            legalList: [],

        };
    },
    created () {
        this.getInvestment()
        this.getLegal()
    },

    methods: {
        routeDate () {
            return [
                {
                    id: 'investment',
                    name: '对外投资 ' + (this.investmentTotal ? `(${this.investmentTotal})` : '')
                },
                {
                    id: 'legal',
                    name: '担任法人 ' + (this.legalTotal ? `(${this.legalTotal})` : '')
                },
                {
                    id: 'member',
                    name: '在外任职 ' + (this.memberTotal ? `(${this.memberTotal})` : '')
                }
            ]        },
        getInvestment () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/management/investment', { evaluateId, ...this.investmentParams })
                .then(res => {
                    this.investmentList = res.data.records;
                    this.investmentTotal = res.data.total;
                });
        },
        getLegal () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/management/legal', { evaluateId, ...this.legalParams })
                .then(res => {
                    this.legalList = res.data.records;
                    this.legalTotal = res.data.total;
                });
        },
        getMember () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/management/member', { evaluateId, ...this.memberParams })
                .then(res => {
                    this.memberList = res.data.records;
                    this.memberTotal = res.data.total;
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
.btnGray_content {
    margin-bottom: 30px;
}
.btnGray {
    &.el-button.el-button--default {
        margin-right: 10px;
        margin-top: 20px;
    }
    &.el-button + .el-button {
        margin-left: 0;
    }
}
.elFormItemTContent {
    .patent {
        display: flex;
        justify-content: left;
        align-items: top;
        .title {
            display: inline-block;
            width: 140px;
        }
        .content {
            display: inline-block;
            width: 1000px;
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
}
/deep/ .el-iconfont {
    padding-left: 0;
    .item {
        background: #1e292e;
    }
}
/deep/ .el-form-item.elFormItemTContent {
    width: 100%;
}
/deep/ .el-form-item__content {
    line-height: 32px !important;
}
</style>
