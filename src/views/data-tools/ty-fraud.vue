<template>
    <div class="stat">
        <div class="table-wrap ">
            <div class="n-title">自然人反欺诈评估</div>
            <div class="tabs-title mb20 mt20">基本信息</div>
            <el-form ref="form" :model="formData" :rules="formRules" class="from-area">
                <el-form-item label="姓名：" class="info-item" prop="name">
                    <el-input placeholder="请输入姓名" v-model.trim="formData.name" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" class="info-item" prop="idNumber">
                    <el-input placeholder="请输入身份证号" v-model.trim="formData.idNumber" auto-complete="off" clearable></el-input>
                </el-form-item>
                <p class="tip">
                    以下4项信息必须选择1项填写
                </p>
                <el-form-item label="手机号：" class="info-item" prop="phoneNumber">
                    <el-input placeholder="请输入手机号" v-model.trim="formData.phoneNumber" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="银行卡号：" class="info-item" prop="bankCardNumber">
                    <el-input placeholder="请输入银行卡号" v-model.trim="formData.bankCardNumber" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户IP：" class="info-item" prop="userIp">
                    <el-input placeholder="请输入用户IP" v-model.trim="formData.userIp" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备IMEI：" class="info-item" prop="imei">
                    <el-input placeholder="请输入设备IMEI" v-model.trim="formData.imei" auto-complete="off" clearable></el-input>
                </el-form-item>
                <el-form-item class="ml100">
                    <el-button type="primary" @click.prevent="getInfo">开始分析</el-button>
                    <el-button type="info" @click.prevent="rest">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="tabs-title mt30 mb20">分析结果</div>
            <p class="score-msg">
                风险分数：
                <span>{{score}}分</span>
            </p>
            <el-table :data="list" border>
                <el-table-column type="riskCode" label="风险码" width="200"></el-table-column>
                <el-table-column prop="riskCodeValueDesc" label="风险等级" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
                <el-table-column prop="desc" label="风险码说明" show-overflow-tooltip :formatter="formatLabel"></el-table-column>

            </el-table>

        </div>
    </div>
</template>

<script>
import { mobile } from "@/config/validate";

var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
var validateidNumber = (rule, value, callback) => {
    if (!value) return callback(new Error('请输入身份证'))
    if (!reg.test(value)) {
        return callback(new Error('请输入正确身份证'));
    } else {
        return callback()
    }
};
var validatephoneNumber = (rule, value, callback) => {
    if (!value) return callback()
    if (!mobile(value)) {
        return callback(new Error('请输入正确手机号'));
    } else {
        return callback()
    }
}
var verifybankCardNumber = (rule, value, callback) => {
    if (!value) return callback()
    let regExp = /^([1-9]{1})(\d{14}|\d{18})$/;
    if (!regExp.test(value)) {
        return callback(new Error("请输入正确的银行卡号"));
    } else {
        return callback();
    }
};
var verifyname = (rule, value, callback) => {
    if (!value) return callback(new Error("请输入姓名"))
    let regExp = /^[\u4e00-\u9fa5]*$/;
    if (!regExp.test(value)) {
        return callback(new Error("请输入正确姓名"));
    } else {
        return callback();
    }
};
var verifyuserIp = (rule, value, callback) => {
    if (!value) return callback()
    let regExp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!regExp.test(value)) {
        return callback(new Error("请输入正确IP地址"));
    } else {
        return callback();
    }
};
// imei暂不知道规则
var verifyimei = (rule, value, callback) => {
    if (!value) return callback()
    let regExp = /^\d{1,10}$/;
    if (!regExp.test(value)) {
        return callback(new Error("请输入正确IMEI"));
    } else {
        return callback();
    }
};
export default {

    data () {

        return {
            formData: {
                name: '',
                idNumber: '',
                phoneNumber: '',
                bankCardNumber: '',
                userIp: '',
                imei: ''
            },
            formRules: {
                name: [
                    { required: true, trigger: "blur", validator: verifyname }
                ],
                phoneNumber: [
                    { required: false, trigger: "blur", validator: validatephoneNumber }
                ],
                idNumber: [
                    { required: true, trigger: "blur", validator: validateidNumber }
                ],
                bankCardNumber: [
                    { required: false, trigger: "blur", validator: verifybankCardNumber }
                ],
                userIp: [
                    { required: false, trigger: "blur", validator: verifyuserIp }
                ],
                imei: [
                    { required: false, trigger: "blur", validator: verifyimei }
                ]
            },
            list: [],
            score: 0
        }
    },
    methods: {
        getInfo () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.$http(
                        `/dcp/query/tencent/anti/fraud`,
                        {
                            ...this.formData
                        },
                        {}
                    ).then(res => {
                        if (res.code === '200') {
                            this.list = res.data.result
                            this.score = res.data.riskScore
                        }
                    })
                }
            });
        },
        rest () {
            this.$refs["form"].resetFields();
            this.list = [];
            this.score = 0;
        }
    }
}
</script>

<style lang="less" scoped>
.dark {
    .n-title {
        margin-top: -20px;
    }
    .score-msg {
        color: #fff;
        margin-bottom: 20px;
        font-size: 14px;
        span {
            color: #43a1ac;
        }
    }
}
.light {
    .n-title {
        margin-top: -20px;
        color: #333;
    }
    .score-msg {
        color: #333;
        margin-bottom: 20px;
        font-size: 14px;
        span {
            color: #4064d4;
        }
    }
}

.content {
    padding-bottom: 20px;
}
.info-title {
    color: #43a1ac;
    font-size: 20px;
}
.table-title {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 14px;
    margin-bottom: 20px;
    font-family: PingFangSC-Regular;
}

.title {
    font-size: 24px;
    color: #ffffff;
    margin: 20px 0 40px;
}

.tip {
    margin-top: -2px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #909399;
    letter-spacing: 0;
    line-height: 20px;
    position: relative;

    i {
        position: absolute;
        border-radius: 3px;
        text-align: center;
        font-size: 20px;
        background-color: #fff;
        color: #43a1ac;
        left: 0;
        top: 0;
    }
}

.from-area,
.table-area,
.score-msg {
    .empty {
        color: #909399;
        font-size: 14px;
        line-height: 60px;
        text-align: center;
        border: 1px solid #54575c;
        border-top: none;
    }
    /deep/ .el-table {
        .el-table__empty-block {
            border-bottom: 1px solid #54575c;
        }
        thead th {
            border-top: 1px solid #54575c;
        }
        td,
        th.is-leaf {
            border-bottom: 1px solid #54575c;
            border-right: 1px solid #54575c;
        }
    }
}

.info-item {
    width: 49%;
    display: inline-block;
    /deep/ .el-form-item__content {
        margin-left: 100px;
    }
    /deep/ .el-form-item__content {
        width: 380px;
    }
    /deep/ .el-form-item__label {
        line-height: 40px;
    }
}
</style>