<template>
    <div class="stat">
        <el-row class="table-wrap mt20 mb30">
            <div class="table-title">企业黑白灰库</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.keyword" clearable placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.businessCategory" placeholder="企业类别" clearable>
                        <el-option label="承建单位" value="1"></el-option>
                        <el-option label="建设单位" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.listType" placeholder="名单类型" clearable>
                        <el-option label="待定名单" value="0"></el-option>
                        <el-option label="白名单" value="1"></el-option>
                        <el-option label="黑名单" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.status" placeholder="审核状态" clearable>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                        <el-option label="否决" value="2"></el-option>
                        <el-option label="退回" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.pageNum=1;getList()">查询</el-button>
                    <el-button type="info" @click="resSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="list" style="width: 100%">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="customerName" label="企业名称" width="220" show-overflow-tooltip align="left"></el-table-column>
                <el-table-column prop="businessCategory" label="企业类别" width="120" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ businessCategoryList[item.row.businessCategory] }}
                    </template>
                </el-table-column>
                <el-table-column prop="listType" label="名单类型" width="120" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ listTypeList[item.row.listType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="审核状态" width="100" align="center">
                    <template slot-scope="item">
                        <span class="check-status" :class="checkClass(item.row.status)">{{ codeList[item.row.status] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="申请原因" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedBy" label="操作人" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedAt" label="操作时间" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" width="90" align="center" fixed="right">
                    <template slot-scope="item">
                        <el-button type="text" plain size="mini" @click="$router.push('/enterpriseDetail/' + item.row.id)">详情</el-button>
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
            totalSize: 0,
            params: {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: '1', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）,
                businessCategory: '', // 企业类别（0:核心&融资 1:核心企业 2:融资企业）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: '' //  状态（0:待审核 1:通过 2:否决 3:退回）
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
            this.$http(
                '/risk/server/antiFraud/customer/page/list',
                this.params,
                { type: 'get' }
            ).then(res => {
                // console.log(res);
                this.list = res.data || []
                this.totalSize = res.meta.totalSize
            })
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
        },
        resSet () {
            this.params = {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: '1', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）,
                businessCategory: '', // 企业类别（0:核心&融资 1:核心企业 2:融资企业）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: '' //  状态（0:待审核 1:通过 2:否决 3:退回）
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.pageSize = v
            this.getList()
        }
    },
    filters: {}
}
</script>
<style lang="less" scoped>
.check-status {
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
}
.p0 {
    background: #242d30;
    color: #43a1ac;
}
.p1 {
    background: #2b3536;
    color: #358e62;
}
.p2 {
    background: #2f2828;
    color: #bb4d31;
}
.p3 {
    background: #2f2828;
    color: #bb4d31;
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
