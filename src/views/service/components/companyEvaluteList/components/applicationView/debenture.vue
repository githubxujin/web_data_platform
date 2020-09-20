<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">债权/债务</div>
                    <el-form :inline="true" ref="form" size="medium">
                        <el-form-item class="el-item-form-width">
                            <el-input v-model="params.name" placeholder="输入名称查找" class="el-item-form-width"></el-input>
                        </el-form-item>
                        <el-form-item class="el-item-form-width">
                            <el-select v-model="params.tag" placeholder="请选择标签">
                                <el-option v-for="item in tagList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="params.current = 1; getList()">查询</el-button>
                            <el-button type="info" size="medium" @click="reSet">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-table :data="list" @sort-change="sortChange">
                            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="name" label="名称" width="350" show-overflow-tooltip>
                                <template slot-scope='scope'>
                                    <div>
                                        {{scope.row.name}}
                                        <span class="blue-label" v-for="(item,index) in scope.row.tag" @click="toDialog(scope.row,item)" :key="index">[{{ item }}]</span>

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="crn" label="统一社会信用代码" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="state" label="经营状态" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="registeredCapitalText" label="注册资本" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="estDate" label="成立日期" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="length" label="数量" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="lawsuit" label="涉诉" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="business" label="经营" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="asset" label="资产/交易" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        </el-table>
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>

        <!-- 详情 -->
        <el-drawer class="el_drawer_content" :visible.sync="DialogVisible" :with-header="false" :modal="false" size="380px">
            <i class="el-icon-close xx" @click="DialogVisible=false"></i>
            <div class="drawer-title">{{title}}</div>
            <div class="content_box">
                <div class="dialog-title mt20">{{ listDetail.name }}</div>
                <div class="drawer-company-list-wrap mr20">
                    <div class="dialog-box-wrap">
                        <div>注册资本</div>
                        <div>{{ listDetail.registeredCapitalText }}</div>
                        <div>成立日期</div>
                        <div>{{listDetail.estDate}}</div>
                    </div>
                    <!-- 债务 -->
                    <div v-if="title==='债务'">
                        <div class="dialog-title mt20" v-if="!(listDetail.assurance.length === 0)">担保</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.assurance" :key="'assurance'+index">
                            <div>公告方</div>
                            <div>{{ item.advertiser  }}</div>
                            <div>公告日期</div>
                            <div>{{item.noticeDate }}</div>
                            <div>担保方实体</div>
                            <div>{{item.guarantorEntity }}</div>
                            <div>担保金额候选</div>
                            <div>{{item.guaranteeAmountCandidate }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                            <div>被担保方实体</div>
                            <div>{{item.securedPartyEntity }}</div>
                        </div>
                        <div class="dialog-title mt20" v-if="!(listDetail.mortgage.length === 0)">动产融资列表</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.mortgage" :key="'mortgage'+index">
                            <div>当事人</div>
                            <div>
                                {{item.party.crn}} &nbsp;
                                {{item.party.name}} &nbsp;
                                {{item.party.role}}
                            </div>
                            <div>担保范围</div>
                            <div>{{item.scopeGuarantee }}</div>
                            <div>登记日期</div>
                            <div>{{item.dateRegistration }}</div>
                            <div>登记种类</div>
                            <div>{{item.typeRegistration }}</div>
                            <div>登记编号</div>
                            <div>{{item.registrationNo }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                        </div>
                        <div class="dialog-title mt20" v-if="!(listDetail.pledge.length === 0)">股权出质列表</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.pledge" :key="'pledge'+index">
                            <div>出质人</div>
                            <div>{{item.pledgor }}</div>
                            <div>出质标的</div>
                            <div>{{item.qualityStandard }}</div>
                            <div>出质股权数额</div>
                            <div>{{item.amountPledgedEquity }}</div>
                            <div>发布时间</div>
                            <div>{{item.releaseTime }}</div>
                            <div>状态</div>
                            <div>{{item.state }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                            <div>质权人</div>
                            <div>{{item.pledgee }}</div>
                        </div>
                        <div class="dialog-title mt20" v-if="!(listDetail.accountsReceivable.length === 0)">应付账款列表</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.accountsReceivable" :key="'accountsReceivable'+index">
                            <div>债务单位</div>
                            <div>{{item.debtUnit }}</div>
                            <div>债权单位</div>
                            <div>{{item.creditorUnit }}</div>
                            <div>公告日期</div>
                            <div>{{item.noticeDate }}</div>
                            <div>应付账款</div>
                            <div>{{item.accountsPayable }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                        </div>
                        <div class="dialog-title mt20" v-if="!(listDetail.advanceReceipts.length === 0)">预收账款列表</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.advanceReceipts" :key="'advanceReceipts'+index">
                            <div>债务单位</div>
                            <div>{{item.debtUnit }}</div>
                            <div>债权单位</div>
                            <div>{{item.creditorUnit }}</div>
                            <div>公告日期</div>
                            <div>{{item.noticeDate }}</div>
                            <div>应付账款</div>
                            <div>{{item.accountsPayable }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                        </div>
                    </div>

                    <!-- 债权 -->
                    <div v-if="title==='债权'">
                        <div class="dialog-title mt20" v-if="!(listDetail.accountsPayable.length === 0)">应付账款列表</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.accountsPayable" :key="'accountsPayable'+index">
                            <div>债务单位</div>
                            <div>{{item.debtUnit }}</div>
                            <div>债权单位</div>
                            <div>{{item.creditorUnit }}</div>
                            <div>公告日期</div>
                            <div>{{item.noticeDate }}</div>
                            <div>应付账款</div>
                            <div>{{item.accountPayable }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                        </div>
                        <div class="dialog-title mt20" v-if="!(listDetail.prepayment.length === 0)">预收账款列表</div>
                        <div class="dialog-box-wrap" v-for="(item,index) in listDetail.prepayment" :key="'prepayment'+index">
                            <div>债务单位</div>
                            <div>{{item.debtUnit }}</div>
                            <div>债权单位</div>
                            <div>{{item.creditorUnit }}</div>
                            <div>公告日期</div>
                            <div>{{item.noticeDate }}</div>
                            <div>应付账款</div>
                            <div>{{item.accountPayable }}</div>
                            <div>类型</div>
                            <div>{{item.type }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            total: 0,
            params: {
                current: 1,
                size: 10,
                name: "",
                tag: ""
            },
            list: [],
            tagList: [],
            DialogVisible: false,
            listDetail: {},
            title: '',

        };
    },
    created () {
        this.getTag()
        this.getList()
    },
    methods: {
        sortChange (column) {
            let data = {
                sortField: column.prop,
                sortDescOrAsc: this.sortString(column.order)
            }
            this.params = {
                ...this.params,
                ...data
            }
            this.getList(data)
        },
        sortString (val) {
            if (val === "descending") {
                return "desc"
            } else if (val === "ascending") {
                return "asc"
            }
        },
        getList (data) {
            let { evaluateId } = this.$route.query;

            if (this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/debt', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/debt', { evaluateId, ...this.params, ...data })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            }

        },
        getTag () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(`/dcp/query/enterprise/relation/tag/${evaluateId}/11`, {}, { type: 'get' })
                .then(res => {
                    this.tagList = res.data
                });
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                name: ""
            };
            this.getList();
        },
        // 债券/债务
        toDialog (item, type) {
            this.DialogVisible = true
            this.listDetail = item
            console.log('this.listDetail:', this.listDetail)
            if (type === '债权') {
                this.title = '债权'
            } else if (type === '债务') {
                this.title = '债务'
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.dark {
    .blue-label {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #36c2cf;
        margin-left: 10px;
        cursor: pointer;
    }
}
.light {
    .blue-label {
        font-size: 14px;
        color: #4064d4;
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>