<template>
    <div>
        <el-dialog :title="$parent.isEdit?'编辑':'新增'" :visible.sync="$parent.dialogVisible" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="年份" prop="year">
                    <el-select v-model="ruleForm.year" placeholder="年份" style="width: 220px">
                        <el-option :label="item" :value="item" v-for="(item, index) in yearSelect()" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-select v-model="ruleForm.province" placeholder="省份" style="width: 220px">
                        <el-option :label="item" :value="item" v-for="(item, index) in provinceSelect()" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售总额（万元）" prop="totalAmount">
                    <el-input v-model.number="ruleForm.totalAmount"></el-input>
                </el-form-item>
                <el-form-item label="西药类销售占比" prop="westernMedicine">
                    <el-input v-model="ruleForm.westernMedicine"></el-input>
                </el-form-item>
                <el-form-item label="中成药类销售占比" prop="middleMedicine">
                    <el-input v-model="ruleForm.middleMedicine"></el-input>
                </el-form-item>
                <el-form-item label="中药材销售占比" prop="traditionalMedicine">
                    <el-input v-model="ruleForm.traditionalMedicine"></el-input>
                </el-form-item>
                <el-form-item label="企业总数" prop="enterpriseCount">
                    <el-input v-model.number="ruleForm.enterpriseCount"></el-input>
                </el-form-item>
                <el-form-item label="其中：批发企业数" prop="wholesaleEnterpriseNum">
                    <el-input v-model.number="ruleForm.wholesaleEnterpriseNum"></el-input>
                </el-form-item>
                <el-form-item label="其中：零售企业数" prop="retailEnterpriseNum">
                    <el-input v-model.number="ruleForm.retailEnterpriseNum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="$parent.dialogVisible = false" size="mini" type="info">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import citys from "@/utils/citys.json";
export default {
    data () {
        var numberRule = (rule, value, callback) => {
            if (typeof (value) !== "number" && value) {
                callback(new Error('请输入数字值'))
            } else {
                callback()
            }
        }
        return {
            citys,
            ruleForm: {
                year: "",
                province: "",
                totalAmount: "",
                westernMedicine: "",
                middleMedicine: "",
                traditionalMedicine: "",
                enterpriseCount: "",
                wholesaleEnterpriseNum: "",
                retailEnterpriseNum: "",
            },
            rules: {
                year: [{ required: true, message: "请选择", trigger: "blur" }],
                province: [{ required: true, message: "请选择", trigger: "blur" }],
                totalAmount: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                enterpriseCount: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                wholesaleEnterpriseNum: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                retailEnterpriseNum: [{ validator: numberRule, trigger: ['blur', 'change'] }],
            }
        };
    },
    methods: {
        // 年份下拉内容
        yearSelect () {
            let year = []
            for (let i = 2000; i <= 2020; i++) {
                year.push(i)
            }
            return year
        },
        // 省份下拉内容
        provinceSelect () {
            let province = []
            this.citys.forEach((item, index) => {
                province.push(item.name)
            })
            return province
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajax
                        .json('/dcp/modify/provincialcirculationmarket/info', this.ruleForm)
                        .then(res => {
                            this.$parent.dialogVisible = false
                            this.$parent.getList();
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog () {
            this.$refs['ruleForm'].resetFields()
            this.ruleForm.id = ""
        }
    }
};
</script>
