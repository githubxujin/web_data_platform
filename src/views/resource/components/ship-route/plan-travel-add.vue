<template>
    <div>
        <el-dialog :title="$parent.isAdd?'新增':'编辑'" :visible.sync="$parent.dialogVisibleAdd" width="800px" @close='clearData'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" label-position="left" style="width:698px;margin: 0 auto;">
                <div class="sub-title">航次信息</div>
                <el-form-item label="船名" prop="shipName" class="odd el_form_item_width">
                    <el-input v-model.trim="ruleForm.shipName"></el-input>
                </el-form-item>
                <el-form-item label="航次信息" prop="voyage" class="el_form_item_width">
                    <el-input v-model.trim="ruleForm.voyage"></el-input>
                </el-form-item>
                <el-form-item label="起始港" prop="origin" class="odd el_form_item_width">
                    <el-input v-model.trim="ruleForm.origin"></el-input>
                </el-form-item>
                <el-form-item label="离港时间" prop="leavePortTime" class="el_form_item_width">
                    <el-date-picker @change="leave" v-model.trim="ruleForm.leavePortTime" type="datetime" placeholder="离港时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="目的港" prop="dest" class="odd el_form_item_width">
                    <el-input v-model.trim="ruleForm.dest"></el-input>
                </el-form-item>
                <el-form-item label="到港时间" prop="arrivePortTime" class="el_form_item_width">
                    <el-date-picker @change="arrive" v-model.trim="ruleForm.arrivePortTime" type="datetime" placeholder="到港时间"></el-date-picker>
                </el-form-item>
                <div class="sub-title">载货信息</div>
                <el-form-item label="承载货物" prop="carryCargo" class="odd el_form_item_width">
                    <el-input v-model.trim="ruleForm.carryCargo"></el-input>
                </el-form-item>
                <el-form-item label="承运人" prop="carrier" class="el_form_item_width">
                    <el-input v-model.trim="ruleForm.carrier"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num" class="odd el_form_item_width">
                    <el-input v-model.number="ruleForm.num"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit" class="el_form_item_width">
                    <el-select v-model="ruleForm.unit" clearable placeholder="数量单位">
                        <el-option label="吨" value="吨"></el-option>
                        <el-option label="件" value="件"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="装货位置" prop="shipment" class="odd el_form_item_width">
                    <el-input v-model.trim="ruleForm.shipment"></el-input>
                </el-form-item>
                <el-form-item label="卸货位置" prop="disburden" class="el_form_item_width">
                    <el-input v-model.trim="ruleForm.disburden"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="info" @click="$parent.dialogVisibleAdd = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        var numType = (rule, value, callback) => {
            if (typeof (value) !== "number" && value) {
                callback(new Error('请输入数字值'))
            } else {
                callback()
            }
        }
        var unitIsMust = (rule, value, callback) => {
            if (this.ruleForm.num && typeof (this.ruleForm.num) === "number" && !value) {
                callback(new Error('请选择单位'))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                shipName: "",
                voyage: "",
                origin: "",
                leavePortTime: "",
                dest: "",
                arrivePortTime: "",
                carryCargo: "",
                carrier: "",
                num: "",
                unit: "",
                shipment: "",
                disburden: "",
                mmsi: this.$route.query.mmsi
            },
            rules: {
                shipName: [{ required: true, message: "请输入", trigger: "blur" }],
                voyage: [{ required: true, message: "请输入", trigger: "blur" }],
                origin: [{ required: true, message: "请输入", trigger: "blur" }],
                leavePortTime: [{ required: true, message: "请输入", trigger: "blur" }],
                dest: [{ required: true, message: "请输入", trigger: "blur" }],
                arrivePortTime: [{ required: true, message: "请输入", trigger: "blur" }],
                num: [{ validator: numType, trigger: 'blur' }],
                unit: [{ validator: unitIsMust, trigger: 'blur' }],
            }
        }
    },
    methods: {
        leave (v) {
            this.ruleForm.leavePortTime = v ? this.formatDate(v, "YYYY-MM-DD HH:mm:ss") : ''
        },
        arrive (v) {
            this.ruleForm.arrivePortTime = v ? this.formatDate(v, "YYYY-MM-DD HH:mm:ss") : ''
        },
        addData () {
            this.ajax
                .json('/dcp/ship/plan/add', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisibleAdd = false
                    this.$parent.getList()
                });
        },
        editData () {
            this.ajax
                .json('/dcp/ship/plan/update', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisibleAdd = false
                    this.$parent.getList()
                });
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$parent.isAdd ? this.addData() : this.editData()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        clearData () {
            this.ruleForm = {
                shipName: "",
                voyage: "",
                origin: "",
                leavePortTime: "",
                dest: "",
                arrivePortTime: "",
                carryCargo: "",
                carrier: "",
                num: "",
                unit: "",
                shipment: "",
                disburden: "",
                mmsi: this.$route.query.mmsi,
                id: ''
            }
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
    width: 800px;
}
/deep/ .el-form-item {
    display: inline-block;
    &.odd {
        margin-right: 100px;
    }
}
.sub-title {
    margin-left: -33px;
    margin-bottom: 16px;
}
.number {
    /deep/ .el-form-item__content {
        display: flex;
    }
    &.dun {
        margin-right: 90px;
    }
    &.jian {
        width: 298px;
    }
}
.el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--datetime,
.el-select {
    width: 210px;
}
.el_form_item_width {
    width: 290px;
}
</style>
