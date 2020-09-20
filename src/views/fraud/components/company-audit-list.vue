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
                    <el-select v-model="params.businessCategory" clearable placeholder="企业类别">
                        <!-- <el-option label="核心企业" :value="1"></el-option> -->
                        <el-option label="承建单位" value="1"></el-option>
                        <el-option label="建设单位" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="params.listType" clearable placeholder="名单类型">
                        <el-option label="白名单" :value="1"></el-option>
                        <el-option label="黑名单" :value="2"></el-option>
                        <el-option label="待定名单" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="params.pageNum=1;getList()">查询</el-button>
                    <el-button type="info" @click="resSet">重置
                    </el-button>
                </el-form-item>
            </el-form>
            <el-table :data="list" border style="width: 100%">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="customerName" label="企业名称" width="200" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="businessCategory" label="企业类别" min-width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ businessCategoryList[item.row.businessCategory] }}
                    </template>
                </el-table-column>
                <el-table-column prop="listType" label="名单类型" min-width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ listTypeList[item.row.listType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="申请原因" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedBy" label="操作人" width="110" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="updatedAt" label="操作时间" width="180" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="100" align="center">
                    <template slot-scope="item">
                        <el-button type="primary" plain size="mini" @click="$router.push('/fraudPanel/checkList/checkDetail/' + item.row.id)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                industryCategory: '', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）,
                businessCategory: '', // 企业类别（0:核心&融资 1:核心企业 2:融资企业）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: '0' //  状态（0:待审核 1:通过 2:否决 3:退回）
            },
            list: [],
            industryCategoryList: {
                0: '其他',
                1: '基建工程',
                2: '医药医疗',
                3: '能源化工'
            },
            businessCategoryList: {
                0: '承建单位',
                1: '承建单位',
                2: '建设单位'
            },
            listTypeList: {
                0: '待定名单',
                1: '白名单',
                2: '黑名单'
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
            this.$http('/risk/server/antiFraud/customer/page/list', this.params, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    this.list = res.data || []
                    this.totalSize = res.meta.totalSize
                })
        },
        // 重置
        resSet () {
            this.params = {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: '', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）,
                businessCategory: '', // 企业类别（0:核心&融资 1:核心企业 2:融资企业）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: '0' //  状态（0:待审核 1:通过 2:否决 3:退回）
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.pageSize = v
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
    .p0 {
        color: #0486fe;
    }
    .p2 {
        color: #ff8e36;
    }
    .p3 {
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
