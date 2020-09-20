<template>
    <div class="table-wrap p0">
        <qg-table subtitle="填表人信息">
            <qg-table-column label="填表人" column="qg-two">{{detail.preparerName}}</qg-table-column>
            <qg-table-column label="填表人编号" column="qg-two">{{detail.preparerName}}</qg-table-column>
            <qg-table-column label="登记期限（月）" column="qg-two">{{detail.certCycle}}</qg-table-column>
            <qg-table-column label="填表人归档号" column="qg-two">{{detail.archiveNum}}</qg-table-column>
        </qg-table>

        <div class="tabs-title mt20">出让人信息</div>
        <el-table border :data="tablist2">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form :model="scope.row" inline size="medium" label-position="left" label-width="230px" class="zd-form">
                        <el-form-item label="出让人类型：">
                            {{scope.row.partyType}}
                        </el-form-item>
                        <el-form-item label="出让人名称：">
                            {{scope.row.partyName}}
                        </el-form-item>
                        <el-form-item label="组织机构代码/统一社会信用代码：">
                            {{scope.row.partyCode}}
                        </el-form-item>
                        <el-form-item label="工商注册号/统一社会信用代码：">
                            {{scope.row.licenseCode}}
                        </el-form-item>
                        <el-form-item label="全球法人机构识别编码：">
                            {{scope.row.globalIdentityCode}}
                        </el-form-item>
                        <el-form-item label="法定代表人/负责人：">
                            {{scope.row.lawPerson}}
                        </el-form-item>
                        <el-form-item label="所属行业：">
                            {{scope.row.industryType}}
                        </el-form-item>
                        <el-form-item label="企业规模：">
                            {{scope.row.partyScale}}
                        </el-form-item>
                        <el-form-item label="住所：">
                            {{getAddress(scope.row)}}
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="partyName" label="出让人名称" width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.partyType!=='个体工商户'?scope.row.partyName:''}}
                </template>
            </el-table-column>
            <el-table-column prop="partyType" label="出让人类型" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="partyCode" label="组织机构代码/统一社会信用代码" width="226" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lawCertType" label="证件类型" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lawCertCode" label="证件号码" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="partyName" label="字号名称" width="170" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.partyType==='个体工商户'?scope.row.partyName:''}}
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="操作者" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="操作时间" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateBy" label="更新者" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="170" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="tabs-title mt20">受让人信息</div>
        <el-table :data="tablist3" border>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form :model="scope.row" inline size="medium" label-position="left" label-width="230px" class="zd-form">
                        <el-form-item label="出让人类型：">
                            {{scope.row.partyType}}
                        </el-form-item>
                        <el-form-item label="出让人名称：">
                            {{scope.row.partyName}}
                        </el-form-item>
                        <el-form-item label="组织机构代码/统一社会信用代码：">
                            {{scope.row.partyCode}}
                        </el-form-item>
                        <el-form-item label="工商注册号/统一社会信用代码：">
                            {{scope.row.licenseCode}}
                        </el-form-item>
                        <el-form-item label="全球法人机构识别编码：">
                            {{scope.row.globalIdentityCode}}
                        </el-form-item>
                        <el-form-item label="法定代表人/负责人：">
                            {{scope.row.lawPerson}}
                        </el-form-item>
                        <el-form-item label="所属行业：">
                            {{scope.row.industryType}}
                        </el-form-item>
                        <el-form-item label="企业规模：">
                            {{scope.row.partyScale}}
                        </el-form-item>
                        <el-form-item label="住所：">
                            {{getAddress(scope.row)}}
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="partyName" label="受让人名称" width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.partyType!=='个体工商户'?scope.row.partyName:''}}
                </template>
            </el-table-column>
            <el-table-column prop="partyType" label="受让人类型" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="partyCode" label="组织机构代码/统一社会信用代码" width="226" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lawCertType" label="证件类型" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lawCertCode" label="证件号码" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="partyName" label="字号名称" width="170" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.partyType==='个体工商户'?scope.row.partyName:''}}
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="操作者" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="操作时间" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateBy" label="更新者" width="170" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="170" show-overflow-tooltip></el-table-column>
        </el-table>

        <qg-table subtitle="转让财产信息" class="mt20">
            <qg-table-column label="融资合同号码" column="qg-two">{{detail.mainContractNumber}}</qg-table-column>
            <qg-table-column label="融资合同币种" column="qg-two">{{detail.mainContractCurrency}}</qg-table-column>
            <qg-table-column label="融资合同金额" column="qg-two">{{detail.mainContractAmount}}</qg-table-column>
            <qg-table-column label="转让财产币种" column="qg-two">{{detail.contractCurrency}}</qg-table-column>
            <qg-table-column label="转让财产价值">{{detail.assetValue}}</qg-table-column>
        </qg-table>

        <qg-table subtitle="转让财产描述" class="mt20">
            <qg-table-column label="描述">{{detail.assetDesc}}</qg-table-column>
        </qg-table>

        <qg-table subtitle="转让财产附件" class="mt20">
            <qg-table-column label="附件" :more="true">
                <div>
                    <a :href="gotoFile(v.fileId)" v-for="(u,i) in fileList" :key="i" target="_blank" class="to-links">{{v.fileName}}</a>
                </div>
            </qg-table-column>

        </qg-table>

    </div>
</template>
<script>
export default {
    props: {
        id: {
            type: [String, Number],
            default: ''
        },
        info: {
            type: Object,
            default () {
                return {}
            }
        },
        isInfo: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            activeNames: [0, 1, 2, 3, 4, 5, 6],
            detail: {

            },

            fileList: [],

            dialogList: ['填表人信息', '出让人信息', '受让人信息', '转让财产信息', '转让财产描述', '转让财产附件'],

            types1: ['企业', '金融机构', '机关事业单位', '其他'],
            types2: ['个人'],
            types3: ['个体工商户'],

            form: {
                'mainContractNumber': '',
                'mainContractCurrency': '',
                'mainContractAmount': '',
                'contractCurrency': '',
                'assetValue': '',
                'assetDesc': '',
                'dataType': '2' // 数据类型（1填表人信息，2财产信息）
            },
        }
    },
    computed: {
        fileAPI () {
            return this.env + '/zdw/getFile/'
        },
        tablist1 () {
            let v = this.detail
            return [{
                preparerName: v.preparerName, preparerAddress: v.preparerAddress
            }]
        },
        tablist2 () {
            return (this.detail || {}).sellerList
        },
        tablist3 () {
            return (this.detail || {}).buyerList
        },
        tablist4 () {
            let v = this.form

            return [{
                mainContractNumber: v.mainContractNumber && v.mainContractNumber.join(),
                mainContractCurrency: v.mainContractCurrency,
                mainContractAmount: v.mainContractAmount,
                contractCurrency: v.contractCurrency,
                assetValue: v.assetValue
            }]
        },
    },
    watch: {
        info (v) {
            this.detail = v
        }
    },
    mounted () {
        // if(!this.isInfo){
        //     this.getInfo()
        // }
        this.detail = this.$route.query.row || '';
        // let id = this.$route.query.id || ''
        // if (id) {
        //     this.getInfo(id)
        // }
    },
    methods: {
        getAddress (v) {
            if (v.addressType) {
                return v.addressType === '中华人民共和国' ? v.addressType + v.addressProvince + v.addressCity + v.addressDetail : v.addressType + v.addressDetail
            } else {
                return v.addressDetail
            }
        },
        // 获取详情信息
        async getInfo (id) {
            let res = await this.ajax.get('/dcp/asset/register/detail/' + id)
            if (res.code === '200') {
                this.detail = res.data
                this.initInfo(res.data)
            }
        },
        // 格式化信息
        initInfo (data) {
            const { mainContractNumber, mainContractCurrency, mainContractAmount, contractCurrency, assetValue, assetDesc, attachmentFileId, fileList } = data
            let info = { mainContractNumber, mainContractCurrency, mainContractAmount, contractCurrency, assetValue, assetDesc, attachmentFileId }
            if (mainContractNumber) {
                const mainContractNumberArr = mainContractNumber.split(',')
                info.mainContractNumber = mainContractNumberArr
            } else {
                info.mainContractNumber = []
            }
            Object.assign(this.form, info, { assetValue: this.numFormat(assetValue), mainContractAmount: this.numFormat(mainContractAmount) })
            this.fileList = fileList || []
        }
    }
}
</script>
<style lang='scss' scoped>
.c_W {
    color: #d3d3d4;
}

::v-deep {
    .el-dialog__body {
        color: inherit;
    }
    .el-collapse {
        border: 0;
        color: #a0a3a8;
    }
    .el-collapse-item + .el-collapse-item {
        margin-top: 10px;
    }
    .el-collapse-item__header {
        color: rgba(255, 255, 255, 0.8);
        background: #292b2f;
        border: 0;
        &.is-active {
            background: #2a3033;
            border: 1px solid #366f71;
        }

        .iconfont {
            font-size: 17px;
            color: #43a1ac;
            margin: 4px 20px 0;
        }
    }

    .el-collapse-item__wrap {
        background-color: transparent;
        border-bottom: 0;
        padding: 10px 20px;
    }

    .el-collapse-item__content {
        padding-bottom: 0;
    }

    .txt-box {
        padding: 10px 20px;
        color: #d3d3d4;
        background: #292b2f;
    }

    .tab-info {
        border: 1px solid #54575c;
        th {
            color: #a0a3a8;
            border-right: 1px solid #54575c;
            font-weight: normal;
        }
        th.is-leaf {
            border-bottom: 1px solid #54575c;
        }
        td {
            color: #d3d3d4;
            font-weight: normal;
            border-bottom: 1px solid #54575c;
            border-right: 1px solid #54575c;
        }
    }
    .zd-form {
        width: 1400px;
        .el-form-item {
            width: 100%;
            margin-right: 0;
            margin-bottom: 0;
            float: left;
            .el-form-item__label {
                color: #a0a3a8;
            }
        }
    }
}
.table-two {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: rgb(35, 37, 40);
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
        td {
            width: calc(50% - 150px);
            color: #d3d3d4;
            padding: 17px 20px;
            min-height: 48px;
            line-height: 16px;
            box-sizing: border-box;
            // text-align: center;
            border-right: 1px solid #54575c;
            border-bottom: 1px solid #54575c;
            &:nth-child(odd) {
                color: #a0a3a8;
                width: 150px;
                border-right: 0;
                background: #292b2f;
            }
            &:nth-of-type(2) {
                border-right: 0;
            }
            &:last-child {
                border-right: 0;
            }
        }
        .one {
            width: calc(100% - 150px);
        }
        .cospan {
            width: calc(100% - 150px);
            display: flex;
            div {
                width: 459px;
                a {
                    margin-left: 0;
                }
            }
            a {
                width: 120px;
                margin-left: 30px;
                text-decoration: underline;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0.44px;
            }
        }
    }
}
</style>

