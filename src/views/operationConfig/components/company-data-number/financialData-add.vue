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
                <el-form-item label="一般预算收入（亿元）" prop="generalBudgetRevenue">
                    <el-input v-model.number="ruleForm.generalBudgetRevenue"></el-input>
                </el-form-item>
                <el-form-item label="基金预算收入（亿元）" prop="fundBudgetIncome">
                    <el-input v-model.number="ruleForm.fundBudgetIncome"></el-input>
                </el-form-item>
                <el-form-item label="人口数量（万人）" prop="peopleCount">
                    <el-input v-model.number="ruleForm.peopleCount"></el-input>
                </el-form-item>
                <el-form-item label="人均财政收入（元）" prop="perCapitaRevenue">
                    <el-input v-model.number="ruleForm.perCapitaRevenue"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="info" @click="$parent.dialogVisible = false" size="mini">取 消</el-button>
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
                generalBudgetRevenue: "",
                fundBudgetIncome: "",
                peopleCount: "",
                perCapitaRevenue: "",
            },
            rules: {
                year: [{ required: true, message: "请选择", trigger: "blur" }],
                province: [{ required: true, message: "请选择", trigger: "blur" }],
                generalBudgetRevenue: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                fundBudgetIncome: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                peopleCount: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                perCapitaRevenue: [{ validator: numberRule, trigger: ['blur', 'change'] }],
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
                        .json('/dcp/modify/provincefiscaldata/detail', this.ruleForm)
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
