<template>
    <div class="account-box table-wrap mt20">
        <div class="table-title ">
            {{ ruleForm.customerName }}
            <span class="check-status" :class="checkClass(ruleForm.status)">{{ codeList[ruleForm.status] }}</span>
        </div>

        <qg-table subtitle="企业基本信息" class="mt20">
            <qg-table-column v-for="(item,index) in conda()" :key="index" :label="item.key" :column="item.column">
                {{item.value}}
                <template v-if="item.urlList" :more="true">
                    <div>
                        <a :href="u.url" v-for="(u,i) in item.urlList" :key="i" target="_blank" class="to-links">{{u.name}}</a>
                    </div>
                </template>
            </qg-table-column>
        </qg-table>

        <div class="tabs-title mt20">动态</div>
        <el-table :data='logList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='createTime' label='操作时间' show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop='logDesc' label='操作内容' show-overflow-tooltip></el-table-column>
        </el-table>
        <div v-if="$route.query.way === 'audit'">
            <div class="tabs-title mb20 mt20">审核</div>
            <div class="shenhe">
                <el-input type="textarea" :rows="4" resize="none" maxlength="5000" show-word-limit v-model="reason" placeholder="必填项，请填写审批意见"></el-input>
            </div>
        </div>
        <div class="submit" v-if="$route.query.way === 'audit'">
            <el-button type="info" @click="goAudit(2)">否 决</el-button>
            <el-button type="danger" @click="goAudit(3)">退 回</el-button>
            <el-button type="primary" @click="goAudit(1)">通 过</el-button>
        </div>
    </div>
</template>
<script>
import env from '@/config/env';
import { setCookie } from '@/utils/auth'
import env1 from '@/config/remote';
import { mapState } from "vuex";
export default {
    data () {
        return {
            file: [],
            evaluateId: '',
            isShow: false,
            env,
            env1,
            codeList: {
                3: '退回',
                1: '通过',
                0: '待审核',
                2: '否决'
            },
            ruleForm: {
                id: "",
                creditCode: "",
                industryCategory: "",  //行业类别
                unifiedCreditCode: "",  //统一社会信用代码
                customerName: "",  //供应商名称
                drawerName: "",  //出票人全称
                drawerBank: "",  //出票人开户行
                drawerAccount: "", //出票人银行账号
                leadingCadre: "",  //申请原因
                listType: "",  //名单类型
                acceptorName: "",  //承兑人名称
                acceptorType: "",  //承兑/回款人类别
                acceptorBank: "", //承兑人开户行
                handleCustomerName: "", //经手企业名称
                acceptorAccount: "",  //承兑/回款人银行账号
                payeeName: "",  //收款人全称s
                payeeType: "",  //收款人账号类型
                payeeBank: "",  //收款人开户行
                projectName: "",  //项目名称
                labelContent: "",  //标签
                remark: "", //申请原因
                fileIds: [],  //上传的凭证id集合
            },
            reason: '', //审批意见
            logList: [],
        };
    },
    created () {
        this.isEdit = this.$parent.isEdit;
        this.access_token = document.cookie.split('=')[1].split(';')[0];
        setCookie('SY_TOKEN', this.access_token, 15);
        this.parentId = this.$route.query.id;
        this.getDetailList()
        this.getRecord()
        this.getFileList()
    },
    computed: mapState({
        token: state => state.user.token
    }),
    methods: {
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
        conda () {
            return [
                {
                    key: "行业类别",
                    value: this.ruleForm.industryCategory == 1 ? '基建工程' : this.ruleForm.industryCategory == 2 ? '医药医疗' : this.ruleForm.industryCategory == 3 ? '能源化工' : '其它' || '-',
                    column: 'qg-two'
                },
                {
                    key: "名单类型",
                    value: this.ruleForm.listType == 0 ? '待定名单' : this.ruleForm.listType == 1 ? '白名单' : this.ruleForm.listType == 2 ? '黑名单' : '灰名单' || '-',
                    column: 'qg-two'
                },
                {
                    key: "供应商名称",
                    value: this.ruleForm.customerName || '-',
                    column: 'qg-two'
                },
                {
                    key: "统一社会信用代码",
                    value: this.ruleForm.unifiedCreditCode || '-',
                    column: 'qg-two'
                },
                {
                    key: "项目名称",
                    value: this.ruleForm.projectName || '-',
                    column: 'qg-two'
                },
                {
                    key: "经手企业名称",
                    value: this.ruleForm.handleCustomerName || '-',
                    column: 'qg-two'
                },
                {
                    key: "出票人全称",
                    value: this.ruleForm.drawerName || '-',
                    column: 'qg-two'
                },
                {
                    key: "所属类别",
                    value: this.ruleForm.drawerType == 1 ? '承建单位' : this.ruleForm.drawerType == 2 ? '建设单位' : this.ruleForm.drawerType == 3 ? '供应商' : '其他企业' || '-',
                    column: 'qg-two'
                },

                {
                    key: "出票人开户行",
                    value: this.ruleForm.drawerBank || '-',
                    column: 'qg-two'
                },


                {
                    key: "出票人银行账号",
                    value: this.ruleForm.drawerAccount || '-',
                    column: 'qg-two'
                },

                {
                    key: "承兑人全称",
                    value: this.ruleForm.acceptorName || '-',
                    column: 'qg-two'
                },
                {
                    key: "所属类别",
                    value: this.ruleForm.acceptorType == 1 ? '承建单位' : this.ruleForm.acceptorType == 2 ? '建设单位' : this.ruleForm.acceptorType == 3 ? '供应商' : '其他企业' || '-',
                    column: 'qg-two'
                },

                {
                    key: "承兑人开户行",
                    value: this.ruleForm.acceptorBank || '-',
                    column: 'qg-two'
                },
                {
                    key: "承兑人银行账号",
                    value: this.ruleForm.acceptorAccount || '-',
                    column: 'qg-two'
                },
                {
                    key: "收款人全称",
                    value: this.ruleForm.payeeName || '-',
                    column: 'qg-two'
                },
                {
                    key: "所属类别",
                    value: this.ruleForm.payeeType == 1 ? '承建单位' : this.ruleForm.payeeType == 2 ? '建设单位' : this.ruleForm.payeeType == 3 ? '供应商' : '其他企业' || '-',
                    column: 'qg-two'
                },
                {
                    key: "收款人开户行",
                    value: this.ruleForm.payeeBank || '-',
                    column: 'qg-two'
                },
                {
                    key: "收款人银行账号",
                    value: this.ruleForm.payeeAccount || '-',
                    column: 'qg-two'
                },
                {
                    key: "申请原因",
                    value: this.ruleForm.remark || '-',
                    column: 'qg-two'
                },
                {
                    key: "标签",
                    value: this.ruleForm.labelContent || '-',
                    column: 'qg-two'
                },
                {
                    key: "来源",
                    value: this.ruleForm.source == 0 ? '系统录入' : this.ruleForm.source == 1 ? '手工导入' : this.ruleForm.source == 2 ? '盛易通' : this.ruleForm.source == 0 ? '盛达通' : '中登网' || '-',
                    column: 'qg-two'
                },
                {
                    key: "凭证附件",
                    urlList: this.file,
                    column: 'qg-two',
                    more: true
                }
            ];
        },
        //获取详情信息
        getDetailList () {
            this.ajax.json(
                "/dcp/antiFraud/account/detail", { id: this.parentId }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.ruleForm = data;
                this.ruleForm.labelContent = data.labelContent[0];
            })
        },
        //获取附件列表
        getFileList () {
            let paramsData = {
                businessId: this.parentId,
                businessType: 2
            }
            this.ajax.json(
                "/dcp/antiFraud/file/list", paramsData, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.file = data.map(i => {
                    return {
                        url: env + '/dcp/antiFraud/file' + i.id + '?access_token=' + this.token,
                        name: i.fileName
                    }
                })
            })
        },
        // 获取操作记录
        getRecord () {
            this.$http(
                '/dcp/antiFraud/operation/record/list',
                { businessType: 2, businessId: this.parentId },
                { type: 'get' }
            ).then(res => {
                this.logList = res.data || []
            })
        },
        //审核
        goAudit (status) {
            //审核
            if (this.reason == "") {
                this.$message.warning("审批意见不能为空！");
                return;
            } else {
                let paramsData = {
                    id: this.parentId,
                    reason: this.reason,
                    status: status
                }
                this.$http(
                    '/dcp/antiFraud/account/audit', paramsData
                ).then(res => {
                    if (res.code === '200') {
                        this.$message.success("处理成功");
                        this.$router.go(-1);
                    }
                })
            }
        },
    }
};
</script>

<style lang="scss" scoped>
.account-box {
    margin-bottom: 20px;
}

.check-status {
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    margin-left: 10px;
}

.light {
    .p0 {
        background: rgba(64, 100, 212, 0.2);
        color: #4064d4;
    }

    .p1 {
        background: #cee9d7;
        color: #3dbd7d;
    }

    .p2 {
        background: #ffd3c3;
        color: #ec6249;
    }

    .p3 {
        background: #ffd3c3;
        color: #ec6249;
    }
}
.submit {
    margin-top: 30px;
    background-color: transparent;
    text-align: center;
}
/deep/ .el-textarea__inner {
    font-family: Pingfang-Light;
}
</style>