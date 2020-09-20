<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">客户/供应商</div>
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
                            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
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
                            <el-table-column prop="estDate" label="成立日期" width="150" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column :formatter="formatLabel" label="累计销售/采购金额(元)" width="200" show-overflow-tooltip>
                                <template slot-scope='scope'>
                                    <span>{{amount(scope.row)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="lawsuit" label="涉诉" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="business" label="经营" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="asset" label="资产/交易" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        </el-table>
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>

        <!-- 供应商客户详情 -->
        <el-drawer class="el_drawer_content" title="详情" :visible.sync="dialogVisible" :with-header="false" :modal="false" size="380px">
            <i class="el-icon-close xx" @click="dialogVisible=false"></i>
            <div class="drawer-title">详情</div>
            <div class="content_box">
                <div class="dialog-title mt20">{{ detail.name }}</div>
                <div class="drawer-company-list-wrap mr20">
                    <div class="dialog-box-wrap">
                        <div>注册资本</div>
                        <div>{{ detail.registeredCapitalText }}</div>
                        <div>成立日期</div>
                        <div>{{detail.estDate}}</div>
                    </div>
                    <div v-if="length>0">
                        <div class="dialog-title mt20" v-if="key==='supplier'">供应商（{{length}}）</div>
                        <div class="dialog-title mt20" v-else>客户（{{length}}）</div>
                        <div v-for="(item,index) in detail[key]" :key="index">
                            <div class="dialog-box-wrap">
                                <div>{{ key === 'supplier' ?'供应商名称': '客户名称' }}</div>
                                <div>{{ key === 'supplier' ? item.supplierName : item.customerName }}</div>
                                <div>公告日期</div>
                                <div>{{  item.noticeDate | dataFilter }}</div>
                                <div>{{ key === 'supplier' ?'采购金额': '销售金额' }}</div>
                                <div>{{ key === 'supplier' ? item.purchaseAmount : item.saleAmount }}</div>
                            </div>
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
                name: ""
            },
            list: [],
            tagList: [],
            dialogVisible: false,
            detail: {},
            key: "supplier",
            length: null
        };
    },
    created () {
        this.getTag()
        this.getList();
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
            if (val === 'descending') {
                return 'desc'
            } else if (val === 'ascending') {
                return 'asc'
            }
        },
        amount (row) {
            let zongNum = 0
            if (row.tag[0] === '供应商') {
                row.supplier.forEach((item, index) => {
                    zongNum += item.purchaseAmount
                })
            } else if (row.tag[0] === '客户') {
                row.client.forEach((item, index) => {
                    zongNum += item.saleAmount
                })
            }
            return zongNum
        },
        getTag () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(`/dcp/query/enterprise/relation/tag/${evaluateId}/12`, {}, { type: 'get' })
                .then(res => {
                    this.tagList = res.data
                });
        },
        getList (data = {}) {
            let { evaluateId } = this.$route.query;
            if (this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/client/supplier', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/client/supplier', { evaluateId, ...this.params, ...data })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            }

        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                name: "",
                tag: ""
            };
            this.getList();
        },
        toDialog (row, item) {
            this.key = item === '供应商' ? "supplier" : "client"
            this.detail = row
            this.dialogVisible = true
            this.length = this.detail[this.key].length
        },
    },
    filters: {
        dataFilter: function (value) {
            var aaa = value.replace('/', '-').replace('/', '-')
            let data = aaa.trim().split(/\s+/)
            return data[0]
        }
    }
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