<template>
    <div>
        <el-dialog title="请确认评估信息" :visible.sync="dialogVisible" width="600px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left" style="width: 380px; margin: 0 auto">
                <el-form-item label="所属板块">
                    <el-select v-model="ruleForm.industryType" placeholder="请选择板块" style="width: 260px" disabled>
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in plateList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="ruleForm.customerName" disabled></el-input>
                </el-form-item>
                <div class="confirm-text" v-if="confirmText"> <i class="iconfont icon-tongyong-wenxintishitubiao"></i> {{ confirmText }}</div>
            </el-form>
            <div slot="footer">
                <el-button type="info" @click="dialogVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="toEvaluate" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { plateList } from "@/utils/common";
export default {
    props: {
        confirmText: String,
    },
    data () {
        return {
            plateList,
            ruleForm: {
                id: "",
                customerName: "",
                industryType: "",
            },
            dialogVisible: false,
            status: 1
        };
    },
    methods: {
        toEvaluate () {
            if (this.status === 0) {
                this.$confirm("确定要重新评估?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    center: true
                }).then(() => {
                    this.toAssessment()
                }).catch(() => {

                })
            } else {
                this.toAssessment()
            }


        },
        toAssessment () {
            this.ajax
                .json(`/dcp/enterprise/evaluate/${this.ruleForm.id}`, {})
                .then(res => {
                    this.$parent.getList();
                    this.$message({ message: '评估成功', type: 'success' })
                    this.dialogVisible = false;
                });
        }

    }
};
</script>
<style lang="scss" scope>
.confirm-text {
    text-indent: 24px;
    font-size: 12px;
    color: #dd5e3e;
    letter-spacing: 2px;
    margin-top: -8px;
    margin-bottom: 10px;

    i {
        vertical-align: -5%;
        background-color: #fff;
        color: #43a1ac;
    }
}
</style>