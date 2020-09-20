<template>
    <div class="stat">
        <el-row class="pt20">
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item>
                    <el-input v-model="params.keyword" clearable placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="params.industryCategory" clearable placeholder="行业类别">
                        <el-option label="基建工程" :value="1"></el-option>
                        <el-option label="医药医疗" :value="2"></el-option>
                        <el-option label="能源化工" :value="3"></el-option>
                        <el-option label="其他" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="params.listType" clearable placeholder="名单类型">
                        <el-option label="白名单" :value="1"></el-option>
                        <el-option label="黑名单" :value="2"></el-option>
                        <el-option label="灰名单" :value="3"></el-option>
                        <el-option label="待定名单" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="params.pageNum;getList()">查询</el-button>
                    <el-button type="info" @click="resSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="list" border style="width: 100%">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="industryCategory" label="行业类别" min-width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ industryCategoryList[item.row.industryCategory] }}
                    </template>
                </el-table-column>
                <el-table-column prop="c" label="名单类型" min-width="120" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ listTypeList[item.row.listType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="drawerName" label="出票人全称" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerAccount" label="出票人银行账号" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerBank" label="出票人开户行" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorName" label="承兑/回款人全称" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorBank" label="承兑/回款人开户行" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorAccount" label="承兑/回款人银行账号" min-width="160" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeName" label="收款人全称" min-width="140" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeBank" label="收款人开户行" min-width="140" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeAccount" label="收款人银行账号" min-width="140" show-overflow-tooltip></el-table-column>
                <el-table-column prop="customerName" label="融资企业名称" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="labelContent" label="标签" min-width="160" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span v-for="(v,i) in item.row.labelContent" :key="i">
                            {{v}}<span v-if="i !== item.row.labelContent.length-1">/</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="申请原因" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedBy" label="操作人" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedAt" label="操作时间" min-width="120" show-overflow-tooltip></el-table-column>

                <el-table-column prop="" label="操作" fixed="right" width="100" align="center">
                    <template slot-scope="item">
                        <el-button type="primary" plain size="mini" @click="$router.push('/fraudPanel/accountCheckList/accountCheckDetail/' + item.row.id)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="page-nav" v-show="totalSize>params.pageSize">
                <el-pagination background layout="jumper, prev, pager, next, total" :total.sync='totalSize' :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="getList()">
                </el-pagination>
            </div> -->
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalSize"></el-pagination>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            totalSize: 11,
            isDialog: false,
            params: {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: '', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: 0 //  状态（0:待审核 1:通过 2:否决 3:退回）
            },
            list: [],
            industryCategoryList: {
                0: '其他',
                1: '基建工程',
                2: '医药医疗',
                3: '能源化工'
            },
            listTypeList: {
                0: '待定名单',
                1: '白名单',
                2: '黑名单',
                3: '灰名单'
            },
            codeList: {
                3: '退回',
                1: '通过',
                0: '待审核',
                2: '否决'
            },
            filesList: []
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList (v) {
            if (v) {
                this.params.pageNum = v
            }
            this.$http('/risk/server/antiFraud/account/page/list', this.params, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    this.list = res.data || []
                    this.totalSize = res.meta.totalSize
                })
        },
        handleSizeChange (v) {
            this.params.pageSize = v
            this.getList()
        },
        // 重置
        resSet () {
            this.params = {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: '', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: 0 //  状态（0:待审核 1:通过 2:否决 3:退回）
            }
            this.getList()
        },
        // 设置 状态颜色
        checkClass (key) {
            // console.log('v',v);
            switch (key) {
                case 1:
                    return 'p1'
                case 2:
                    return 'p2'
                case 3:
                    return 'p3'
                case 0:
                    return 'p0'
                default:
                    break
            }
        }
    },
    filters: {}
}
</script>
<style lang="less" scoped>
.stat {
    .p1 {
        color: #3dbd7d;
    }
    .p2 {
        color: #0486fe;
    }
    .p3 {
        color: #ff8e36;
    }
    .p0 {
        color: #f56540;
    }
    .tishi {
        color: #909399;
        .icon-tongyong-wenxintishitubiao {
            color: #ffbc31;
            margin-right: 2px;
        }
        .a-corlor {
            color: #0486fe;
        }
    }
    .up-data {
        margin-top: 20px;
        .star {
            color: red;
        }
        span {
            margin-left: 10px;
            font-size: 12px;
            color: #909399;
        }
        .files-list {
            margin-top: 10px;
            li {
                padding-right: 20px;
                position: relative;
                line-height: 28px;
                i {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #fa5555;
                }
            }
        }
    }
}
</style>
<style lang="less">
.daoru {
    /deep/ .el-dialog__body {
        text-align: center;
    }
    /deep/ .el-form-item__label {
        color: #00002a;
    }
}
</style>
