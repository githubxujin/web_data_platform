<template>
    <div class="stat">
        <!-- <div class="tip-notice">
            <p class="title-notice">
                <i class="iconfont icon-shujuzhongxin-tongzhi"></i>
                <span class="tongg">通知公告：</span>
                <span>2019年11月16日之后以中建五局及其下属各级法人公司在中建财务有限公司以外金融机构开具的商业承兑汇票，均为冒名或伪造票据。</span>
                <span class="times">2019-12-11</span>
            </p>
        </div> -->
        <el-row class="table-wrap mt20 mb30">
            <div class="table-title">账号黑白灰库</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.keyword" clearable placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.listType" placeholder="名单类型" clearable>
                        <el-option label="白名单" :value="1"></el-option>
                        <el-option label="黑名单" :value="2"></el-option>
                        <el-option label="灰名单" :value="3"></el-option>
                        <el-option label="待定名单" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.status" placeholder="审核状态" clearable>
                        <el-option label="待审核" :value="0"></el-option>
                        <el-option label="通过" :value="1"></el-option>
                        <el-option label="否决" :value="2"></el-option>
                        <el-option label="退回" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="params.pageNum;getList()">查询</el-button>
                    <el-button type="info" @click="resSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="list" border style="width: 100%">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="customerName" label="企业名称" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="labelContent" label="标签" min-width="120" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span v-for="(v,i) in item.row.labelContent" :key="i">
                            {{v}}<span v-if="i !== item.row.labelContent.length-1">/</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="listType" label="名单类型" min-width="120" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ listTypeList[item.row.listType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="drawerName" label="出票人" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerAccount" label="出票人银行账号" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerBank" label="出票人开户行" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorName" label="承兑/回款人" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorAccount" label="承兑/回款人银行账号" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorBank" label="承兑/回款人开户行" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeName" label="收款人" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeBank" label="收款人开户行" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeAccount" label="收款人银行账号" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" label="申请原因" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="审核状态" width="100" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span class="check-status" :class="checkClass(item.row.status)">{{ codeList[item.row.status] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedBy" label="操作人" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedAt" label="操作时间" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" width="100" fixed="right" align="center">
                    <template slot-scope="item">
                        <el-button type="primary" plain size="mini" @click="$router.push('/identificationDetail/' + item.row.id)">详情</el-button>
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
            params: {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: 1, // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
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
            this.$http('/risk/server/antiFraud/account/page/list', this.params, { type: 'get' }).then(res => {
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
                industryCategory: 1, // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                status: '' //  状态（0:待审核 1:通过 2:否决 3:退回）
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
.tip-notice {
    width: 100%;
    box-sizing: border-box;
    .title-notice {
        height: 30px;
        background: #2f2828;
        border: 1px solid #bb4d31;
        padding: 0 30px 0 10px;
        overflow: hidden;
        border-radius: 4px;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #d3d3d4;
        margin: 20px 0;
        .icon-shujuzhongxin-tongzhi {
            font-size: 14px;
            color: #f56a00;
        }
        span {
            display: inline-block;
            line-height: 30px;
            font-size: 12px;
        }
        .tongg {
            color: #f56a00;
            margin-left: 8px;
        }
        .times {
            width: 75px;
            float: right;
        }
    }
}
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
