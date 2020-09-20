π<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">疑似关联</div>
                    <el-form :inline="true" ref="form" size="medium">
                        <el-form-item class="el-item-form-width">
                            <el-input v-model="params.name" placeholder="输入名称查找" class="el-item-form-width"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="params.current = 1; getList()">查询</el-button>
                            <el-button type="info" size="medium" @click="reSet">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-table :data="list" @sort-change="sortChange">
                            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="name" label="名称" width="400" show-overflow-tooltip>
                                <template slot-scope='scope'>
                                    <div>
                                        {{scope.row.name}}
                                        <span class="email-label" v-if="scope.row.reason.contact.email && scope.row.reason.contact.email.length>0" @click="toEmail(scope.row)">[邮箱]</span>
                                        <span class="phone-label" v-if="scope.row.reason.contact.tel && scope.row.reason.contact.tel.length>0" @click="toPhone(scope.row)">[电话]</span>
                                        <span class="shareholder-label" v-if="Object.keys(scope.row.reason.people).length> 0" @click="toShareholder(scope.row)">[疑似股东]</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="crn" label="统一社会信用代码" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="state" label="经营状态" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="registeredCapitalText" label="注册资本" width="150" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="estDate" label="成立日期" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable :sort-method="(a,b)=>{return a.lawsuit - b.lawsuit}" prop="lawsuit" label="涉诉" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable :sort-method="(a,b)=>{return a.business - b.business}" prop="business" label="经营" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable :sort-method="(a,b)=>{return a.asset - b.asset}" prop="asset" label="资产/交易" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        </el-table>
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>
        <!-- 邮箱 -->
        <el-drawer class="el_drawer_content" :visible.sync="emailDialogVisible" :with-header="false" :modal="false" size="380px">
            <i class="el-icon-close xx" @click="emailDialogVisible=false"></i>
            <div class="drawer-title">邮箱</div>
            <div class="content_box">
                <div class="dialog-title mt20">{{ detail.name }}</div>
                <div class="drawer-company-list-wrap mr20">
                    <div class="dialog-box-wrap">
                        <div>注册资本</div>
                        <div>{{ detail.registeredCapitalText || '-' }}</div>
                        <div>成立日期</div>
                        <div>{{detail.estDate || '-'}}</div>
                    </div>
                    <div class="dialog-title mt20">疑似关联</div>
                    <div class="dialog-title mt20" style="color: #d3d3d4;font-size: 14px;">公用联系邮箱</div>
                    <div class="dialog-box-wrap" style="flex-direction: column;">
                        <div v-for="(item,index) in detail.reason.contact.email" :key="index">{{item}}</div>
                    </div>
                </div>
            </div>
        </el-drawer>

        <!-- 电话 -->
        <el-drawer class="el_drawer_content" :visible.sync="phoneDialogVisible" :with-header="false" :modal="false" size="380px">
            <i class="el-icon-close xx" @click="phoneDialogVisible=false"></i>
            <div class="drawer-title">电话</div>
            <div class="content_box">
                <div class="dialog-title mt20">{{ detail.name }}</div>
                <div class="drawer-company-list-wrap mr20">
                    <div class="dialog-box-wrap">
                        <div>注册资本</div>
                        <div>{{ detail.registeredCapitalText || '-' }}</div>
                        <div>成立日期</div>
                        <div>{{detail.estDate || '-'}}</div>
                    </div>
                    <div class="dialog-title mt20">疑似关联</div>
                    <div class="dialog-title mt20 phone_class">公用联系电话</div>
                    <div class="dialog-box-wrap" style="flex-direction: column;">
                        <div v-for="(item,index) in detail.reason.contact.tel" :key="index">{{item}}</div>
                    </div>
                </div>
            </div>
        </el-drawer>
        <!-- 疑似股东 -->
        <el-drawer class="el_drawer_content" :visible.sync="shareholderDialogVisible" :with-header="false" :modal="false" size="380px">
            <i class="el-icon-close xx" @click="shareholderDialogVisible=false"></i>
            <div class="drawer-title">疑似股东</div>
            <div class="content_box">
                <div class="dialog-title mt20">{{ detail.name }}</div>
                <div class="drawer-company-list-wrap mr20">
                    <div class="dialog-box-wrap">
                        <div>注册资本</div>
                        <div>{{ detail.registeredCapitalText || '-' }}</div>
                        <div>成立日期</div>
                        <div>{{detail.estDate || '-'}}</div>
                    </div>
                    <div class="dialog-title mt20">疑似关联</div>
                    <div class="dialog-title mt20" style="color: #d3d3d4;font-size: 14px;">人员重名疑似</div>
                    <div class="dialog-box-wrap_han">
                        <div class="member-content-wrap" v-for="(item,index) in Object.keys(detail.reason.people) " :key="index">
                            <div class="member-name">{{item}}</div>
                            <div v-for="(v,i) in Object.keys(detail.reason.people[item]) " :key="i">
                                <div class="member-company">{{ v }}</div>
                                <div class="member-position">{{detail.reason.people[item][v].join()}}</div>
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
            emailDialogVisible: false,
            phoneDialogVisible: false,
            shareholderDialogVisible: false,
            detail: {
                reason: {
                    contact: {
                        email: [],
                        tel: []
                    },
                    people: {}
                }
            },

        };
    },
    created () {
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
            if (val === "descending") {
                return "desc"
            } else if (val === "ascending") {
                return "asc"
            }
        },
        getList (data = {}) {
            let { evaluateId } = this.$route.query;
            if (!this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/guess', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/guess', { evaluateId, ...this.params, ...data })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            }

        },
        toEmail (row) {
            this.detail = row
            this.emailDialogVisible = true
        },
        toPhone (row) {
            this.detail = row
            this.phoneDialogVisible = true
        },
        toShareholder (row) {
            this.detail = row
            this.shareholderDialogVisible = true
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
    },


};
</script>

<style lang="scss" scoped>
.phone-label {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #43a1ac;
    &:hover {
        cursor: pointer;
    }
}
.email-label {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #6f864d;
    &:hover {
        cursor: pointer;
    }
}

.shareholder-label {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #6188e1;
    &:hover {
        cursor: pointer;
    }
}

/* dialog */
.dialog-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #43a1ac;
    margin-bottom: 10px;
}
.dialog-box-wrap_han {
    padding: 20px 20px 5px 20px;
    background: #313438;
    border-top: 1px solid #3d3f43;
    border-bottom: 1px solid #3d3f43;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #d3d3d4;
    display: flex;
    flex-wrap: wrap;
    div {
        margin-bottom: 15px;
        &:last-child(2) {
            margin-bottom: 0;
        }
    }
}
.dialog-email-wrap {
    padding: 20px 20px 5px 20px;
    background: #313438;
    border-top: 1px solid #3d3f43;
    border-bottom: 1px solid #3d3f43;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #d3d3d4;
    display: flex;
    flex-wrap: wrap;
    div {
        flex-basis: 100%;
        margin-bottom: 15px;
        &:last-child(2) {
            margin-bottom: 0;
        }
    }
}
.dialog-member-wrap {
    background: #313438;
    border-bottom: 1px solid #3d3f43;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #d3d3d4;
}
.member-title {
    text-indent: 20px;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #d3d3d4;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #3d3f43;
    border-bottom: 1px solid #3d3f43;
}

.member-content-wrap {
    width: 100%;
    &:last-child {
        margin-bottom: 20px;
    }
    .member-name {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #43a1ac;
    }
    .member-company {
        margin-top: 10px;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #d3d3d4;
    }
    .member-position {
        margin-top: 6px;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #8e8e8e;
    }
}
.dark {
    .phone_class {
        color: #d3d3d4;
        font-size: 14px;
    }
}
.light {
    .phone_class {
        color: #999;
        font-size: 14px;
    }
}
</style>