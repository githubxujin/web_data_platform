<template>
    <div class="table-wrap mt20">
        <div class="el-title ">
            {{ ruleForm.customerName }}
            <span class="check-status" :class="checkClass(ruleForm.status)">{{ codeList[ruleForm.status] }}</span>
            <router-link v-if="!isObjectEmpty(jumpInfo)" class="to-links"
                :to="{ name: 'service-company-evalute-list', query: { evaluateId: jumpInfo.id, companyName: jumpInfo.customerName, createTime: formatDate(jumpInfo.lastEvaluateTime)}}">企业评估
            </router-link>
        </div>

        <qg-table class="mt20">
            <qg-table-column v-for="(item,index) in conda()" :key="index" :label="item.key" :column="item.column" :more="true">
                <div v-if="!item.more"> {{item.value}}</div>
                <div v-else style="width: 1000px">
                    <a :href="u.url" v-for="(u,i) in item.urlList" :key="i" target="_blank" class="to-links">{{u.name}}</a>
                </div>
            </qg-table-column>
        </qg-table>

        <qg-table subtitle="企业基本信息" class="mt30">
            <qg-table-column v-for="(item,index) in getRows()" :key="index" :label="item.key" :column="item.column" width="160">{{item.value}}</qg-table-column>
        </qg-table>

        <div class="tabs-title mt30">动态</div>
        <el-table :data='logList' border :class="$route.query.way === 'audit'?'':'mb30'">
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='createTime' label='操作时间' show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop='logDesc' label='操作内容' show-overflow-tooltip></el-table-column>
        </el-table>
        <div v-if="$route.query.way === 'audit'">
            <div class="tabs-title mb20 mt30">审核</div>
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
import env1 from '@/config/remote';
import { mapState } from "vuex";
export default {
    data () {
        return {
            jumpInfo: {},
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
                customerName: "",  //融资企业名称
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
            reason: '',
            logList: [],
            companyInfo: {
                industry: {
                    // industry: '',
                },
                area: {
                    Province: '',
                    City: '',
                    County: ''
                },
                contactInfo: {
                    phoneNumber: '',
                    email: ''
                },
                originalName: []
            },
        };
    },
    created () {
        this.getDetailList()
        this.getRecord()
        this.getFileList()
        this.isCompanyEvaluate()
        console.log(this.$route.query, 'this.$route.query')
        this.getCompany(this.$route.query.companyName)
    },
    computed: mapState({
        token: state => state.user.token
    }),
    methods: {
        // 获取公司信息
        getCompany (companyName) {

            this.ajax
                .json('/dcp/query/qcc/enterprise/business', { companyName }, { type: 'get' })
                .then(res => {
                    this.companyInfo = res.data
                });
        },
        getRows () {
            return [
                { key: "企业名称", value: this.companyInfo.name, column: 'qg-two' },
                { key: "经营状态", value: this.companyInfo.status, column: 'qg-two' },
                { key: "统一社会信用代码", value: this.companyInfo.creditCode, column: 'qg-two' },
                { key: "纳税人识别号", value: this.companyInfo.creditCode, column: 'qg-two' },
                { key: "注册号", value: this.companyInfo.no, column: 'qg-two' },
                { key: "组织机构代码", value: this.companyInfo.orgNo, column: 'qg-two' },
                { key: "法定代表人", value: this.companyInfo.operName, column: 'qg-two' },
                { key: "注册资本", value: this.companyInfo.registCapi, column: 'qg-two' },
                { key: "企业类型", value: this.companyInfo.econKind, column: 'qg-two' },
                { key: "所属行业", value: this.companyInfo.industry && this.companyInfo.industry.industry, column: 'qg-two' },
                { key: "成立日期", value: this.companyInfo.startDate, column: 'qg-two' },
                { key: "所属省份", value: this.companyInfo.area && this.companyInfo.area.Province, column: 'qg-two' },
                { key: "所属城市", value: this.companyInfo.area && this.companyInfo.area.City, column: 'qg-two' },
                { key: "所属区县", value: this.companyInfo.area && this.companyInfo.area.County, column: 'qg-two' },
                { key: "曾用名", value: this.companyInfo.originalName && this.companyInfo.originalName.map(i => i.name).join(','), column: 'qg-two' },
                { key: "参保人数", value: this.companyInfo.insuredCount, column: 'qg-two' },
                { key: "电话", value: this.companyInfo.contactInfo && this.companyInfo.contactInfo.phoneNumber, column: 'qg-two' },
                { key: "更多电话", value: '', column: 'qg-two' },
                { key: "邮箱", value: this.companyInfo.contactInfo && this.companyInfo.contactInfo.email, column: 'qg-two' },
                { key: "更多邮箱", value: '', column: 'qg-two' },
                { key: "官网", value: '', column: 'qg-one' },
                { key: "企业地址", value: this.companyInfo.address, column: 'qg-one' },
                { key: "经营范围", value: this.companyInfo.scope, column: 'qg-one' },
            ]
        },
        isCompanyEvaluate () {
            this.ajax
                .json('/dcp/server/antiFraud/evaluate/query', { customerName: this.$route.query.companyName }, { type: 'get' })
                .then(res => {
                    // debugger
                    this.jumpInfo = { ...res.data[0] }
                });
        },
        // 设置 状态颜色返回
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
        gradeLabel (key) {
            switch (key) {
                case '1':
                    return "一级单位"
                case '2':
                    return "二级单位"
                case '3':
                    return "三级单位"
                default:
                    "-"
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
                    key: "企业类别",
                    value: this.ruleForm.customerType,
                    column: 'qg-two'
                },
                {
                    key: "名单类型",
                    value: this.ruleForm.listType == 0 ? '待定名单' : this.ruleForm.listType == 1 ? '白名单' : this.ruleForm.listType == 2 ? '黑名单' : '灰名单' || '-',
                    column: 'qg-two'
                },

                {
                    key: "企业名称",
                    value: this.companyInfo.name || '-',
                    column: 'qg-two'
                },

                {
                    key: "上级单位",
                    value: this.ruleForm.parentUnit || '-',
                    column: 'qg-two'
                },
                {
                    key: "所在层级",
                    value: this.gradeLabel(this.ruleForm.grade),
                    column: 'qg-two'
                },
                {
                    key: "正面标签",
                    value: this.ruleForm.positiveLabelContent && this.ruleForm.positiveLabelContent.join(",") || '-',
                    column: 'qg-two'
                },

                {
                    key: "负面标签",
                    value: this.ruleForm.negativeLabelContent && this.ruleForm.negativeLabelContent.join(",") || '-',
                    column: 'qg-two'
                },
                {
                    key: "跟进人",
                    value: this.ruleForm.followPeople || '-',
                    column: 'qg-two'
                },
                {
                    key: "时效性",
                    value: (this.ruleForm.startDate !== null ? (this.ruleForm.startDate + '' + '-' + this.ruleForm.endDate) : ''),
                    column: 'qg-two'
                },
                {
                    key: "凭证附件",
                    urlList: this.file,
                    column: 'qg-one',
                    more: true
                },
                {
                    key: "申请原因",
                    value: this.ruleForm.remark || '-',
                    column: 'qg-one'
                },
            ];
        },
        //获取附件列表
        getFileList () {
            let { id } = this.$route.query
            let paramsData = {
                businessId: id,
                businessType: 1
            }
            this.ajax.json(
                "/dcp/antiFraud/file/list", paramsData, { type: 'get' }
            ).then(res => {
                let { data = [] } = res;
                this.file = data.map(i => {
                    return {
                        url: env + '/dcp/antiFraud/file' + i.id + '?access_token=' + this.token,
                        name: i.fileName
                    }
                })
                console.log(this.file)
            })
        },
        // 获取评估信息
        getEvaluateId () {
            this.$http(
                '/risk/server/antiFraud/evaluate/query',
                { customerName: this.ruleForm.customerName },
                { type: 'get' }
            ).then(res => {

                this.evaluateId = res.data.length > 0 && res.data[0].id || ''
                this.isShow = res.data.length > 0 && res.data[0].status || false
            })
        },
        getDetailList () {
            let { id } = this.$route.query
            this.ajax.json(
                "/dcp/antiFraud/customer/detail", { id }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.ruleForm = data;
                if (this.ruleForm.customerName) {
                    this.getEvaluateId()
                }

            })
        },
        // 获取 操作记录
        getRecord () {
            let { id } = this.$route.query
            this.$http(
                '/dcp/antiFraud/operation/record/list',
                { businessType: 1, businessId: id },
                { type: 'get' }
            ).then(res => {
                this.logList = res.data.length > 0 ? res.data : [{ "type": "1", "logDesc": "【系统推荐】新增了【灰名单】申请，申请原因：疑似失联保理公司", "logResult": "", "createBy": "1161", "createTime": "2020-07-17 16:42:16" }]
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
                    id: this.$route.query.id,
                    reason: this.reason,
                    status: status
                }
                this.ajax
                    .json('/dcp/antiFraud/customer/audit', paramsData)
                    .then(res => {
                        this.$message.success("处理成功");
                        this.$router.go(-1);
                    });

            }
        },
    }
};
</script>

<style lang="scss" scoped>
.hos-detail {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    font-weight: normal;
    margin: 0 0 20px;
    display: flex;
    align-items: center;
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

.dark {
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
