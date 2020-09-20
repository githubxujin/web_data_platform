<template>
    <div class="stat">
        <el-row class="table-wrap mt20 mb30">
            <div class="table-title">账号名单列表</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item>
                    <el-input v-model="params.keyword" clearable placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="params.industryCategory" placeholder="行业类别" clearable>
                        <el-option label="基建工程" :value="1"></el-option>
                        <el-option label="医药医疗" :value="2"></el-option>
                        <el-option label="能源化工" :value="3"></el-option>
                        <el-option label="其他" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="params.listType" placeholder="名单类型" clearable>
                        <el-option label="白名单" :value="1"></el-option>
                        <el-option label="黑名单" :value="2"></el-option>
                        <el-option label="灰名单" :value="3"></el-option>
                        <el-option label="待定名单" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
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
            <div class="add-export">
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <span class="el-icon-plus" @click="$router.push('/fraudPanel/accountList/addaccount')"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导入" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daoru" @click="isDialog=true"></span>
                </el-tooltip>
            </div>
            <el-table :data="list" border style="width: 100%">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="customerName" label="企业名称" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="listType" label="名单类型" min-width="120" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ listTypeList[item.row.listType] }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="审核状态" width="100" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span class="check-status" :class="checkClass(item.row.status)">{{ codeList[item.row.status] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="申请原因" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerName" label="出票人" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerAccount" label="出票人银行账号" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="drawerBank" label="出票人开户行" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorName" label="承兑/回款人" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorAccount" label="承兑/回款人银行账号" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="acceptorBank" label="承兑/回款人开户行" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeName" label="收款人" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeBank" label="收款人开户行" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payeeAccount" label="收款人银行账号" min-width="120" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="labelContent" label="标签" min-width="200" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span v-for="(v,i) in item.row.labelContent" :key="i">
                            {{v}}<span v-if="i !== item.row.labelContent.length-1">/</span>
                        </span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="updatedAt" label="操作时间" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedBy" label="操作人" min-width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" width="200" fixed="right" align="center">
                    <template slot-scope="item">
                        <el-button type="blue" plain :disabled="item.row.status === 2" size="mini" @click="$router.push('/fraudPanel/accountList/amendAccount/' + item.row.id)">修改</el-button>
                        <el-button type="primary" plain size="mini" @click="$router.push('/fraudPanel/accountList/accountDetail/' + item.row.id)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalSize"></el-pagination>
        </el-row>
        <el-dialog title="导入账号名单" :center="true" v-if="isDialog" :visible.sync="isDialog" custom-class="daoru" :close-on-click-modal="false" width="470px">
            <p class="tishi">
                <i class="iconfont icon-ERPqiyeduan-tishi"></i>
                导入数据上传的附件有格式要求，点击下载
                <a class="a-corlor" href="/导入账号名单模板.xlsx" target="_blank">导入模版</a>
            </p>
            <div class="shangc">
                <span class="wen">
                    上传附件
                </span>
                <c-upload accept=".xls,.xlsx" class="upload-file" type="primary" size="mini" multiple="multiple" v-on:changehand="v => {uploadHand(v)}" plain>
                    <i class="iconfont icon-tongyong-daochutubiao"></i>
                    <span style="margin-top:-2px;">上传文件</span>
                </c-upload>
                <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持 .xls和.xlsx 格式</span>
                <ul class="files-list">
                    <li style="text-align:left;" v-for="(v,i) in filesList" :key="i">
                        <em class="iconfont icon-Excel1"></em>
                        <span>{{v.name}}</span>
                        <i class="el-icon-close" @click="delFile(i)"></i>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isDialog = false;filesList=[]" size="mini">取 消</el-button>
                <el-button type="primary" @click="onSubmit" size="mini">确 定</el-button>
            </div>
        </el-dialog>
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
        onSubmit () {
            this.ajax.upload('/risk/server/antiFraud/account/import', {                file: {
                    files: this.filesList
                }            }).then(res => {
                this.$message.success('导入成功')
                this.isDialog = false
                this.getList()
            })
        },
        // 上传
        async uploadHand (files) {
            // console.log(files);
            // 批量上传数量判断
            if (files.length === 0) {
                return
            } else if (files.length > 9) {
                this.$message.error('一次最多可以上传9个文件！')
                return
            }
            let size = 0
            // 判断文件格式
            for (let i = 0; i < files.length; i++) {
                if (
                    files[i].name.indexOf('.xlsx') === -1 &&
                    files[i].name.indexOf('.xls') === -1
                ) {
                    this.$message.error('请上传xlsx和xls类型的文件')
                    return
                } else {
                    this.filesList.push(files[i])
                    size += files[i].size
                }
            }
            if (size > 1048576 * 100)
                return this.$message.error('上传文件总容量不超能过100M！')
        },
        // 删除
        delFile (i) {
            this.filesList.splice(i, 1)
            // console.log(this.filesList);
        },
        // 重置
        resSet () {
            this.params = {
                pageNum: 1,
                pageSize: 10,
                keyword: '', // 关键字（客户名称/统一社会信用代码）
                industryCategory: '', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
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
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 27px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
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
.tishi {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    line-height: 20px;
    .icon-ERPqiyeduan-tishi {
        color: #51b5bf;
        margin-right: 2px;
    }
    .a-corlor {
        color: #43a1ac;
        margin-left: 5px;
        text-decoration: underline;
    }
}
.upload-file {
    /deep/ .el-button {
        position: relative;
        padding-left: 30px;
        .icon-tongyong-daochutubiao {
            position: absolute;
            top: 4px;
            left: 10px;
        }
    }
}
.shangc {
    font-family: PingFangSC-Light;
    .wen {
        color: rgba(255, 255, 255, 0.8);
        padding-left: 10px;
        margin-right: 10px;
        position: relative;
        &::before {
            content: '*';
            color: #449fa8;
            position: absolute;
            left: 0;
            top: 1px;
        }
    }
    /deep/ .el-button {
        background: #1e292e;
        color: #43a1ac;
        border: 1px solid #366f71;
        &:hover {
            background: #1e292e;
            color: #43a1ac;
            border: 1px solid #366f71;
        }
    }
}
.files-list {
    margin-top: 10px;
    list-style: none;
    li {
        padding: 0 20px;
        position: relative;
        line-height: 28px;
        color: rgba(255, 255, 255, 0.8);
        em {
            position: absolute;
            left: 0;
            font-size: 16px;
            // top: 6px;
            color: rgba(255, 255, 255, 0.8);
        }
        i {
            position: absolute;
            top: 7px;
            right: 0;
            color: rgba(255, 255, 255, 0.8);
            cursor: pointer;
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
