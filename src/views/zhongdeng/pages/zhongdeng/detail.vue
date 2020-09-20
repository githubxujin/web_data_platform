<template>
    <div>
        <el-table-row :rows="zhongDengList()" subtitle="登记详情" class="mt20"></el-table-row>
        <el-table-row :rows="transferorList()" subtitle="出让人" class="mt20"></el-table-row>
        <el-table-row :rows="assigneeList()" subtitle="受让人" class="mt20"></el-table-row>

    </div>
</template>
<script>

export default {
    components: {
        "el-table-row": () => import("@/components/Table/el-table-row"),
    },
    data() {
        return {};
    },
    methods: {

        zhongDengList() {
            return [
                { key: "登记明细编号", value: '', three: true },
                { key: "关联的初始登记编号", value: '', three: true },
                { key: "登记时间", value: '', three: true },
                { key: "登记到期日", value: '', three: true },
                { key: "登记类型", value: '', three: true },
                { key: "填表人", value: '', three: true },
                { key: "填表人证件类型", value: '', three: true },
                { key: "填表人住所", value: '', three: true },
                { key: "填表人归档号", value: '', three: true },
                { key: "登记期限", value: '', three: true },
                { key: "转让财产币种", value: '', three: true },
                { key: "转让财产价值", value: '', three: true },
                { key: "融资合同号码", value: '', three: true },
                { key: "融资合同币种", value: '', three: true },
                { key: "融资金额", value: '', three: true },
                { key: "转让财产描述/异议登记陈述/注销说明", value: '', alone: true },

            ]
        },
        transferorList() {
            return [
                { key: "出让人类型", value: '', three: true },
                { key: "出让人名称", value: '', three: true },
                { key: "出让人组织机构代码", value: '', three: true },
                { key: "出让人工商注册", value: '', three: true },
                { key: "出让人住所", value: '', three: true },
                { key: "出让人法定代表人/负责人", value: '', three: true },

            ]
        },
        assigneeList() {
            return [
                { key: "受让人类型", value: '', three: true },
                { key: "受让人名称", value: '', three: true },
                { key: "受让人组织机构代码", value: '', three: true },
                { key: "受让人工商注册号", value: '', three: true },
                { key: "受让人住所", value: '', three: true },
                { key: "受让人法定代表人/负责人", value: '', three: true },
                { key: "受让人二级单位", value: '', three: true, edit: true },
                { key: "受让人一级单位", value: '', three: true, edit: true },
                { key: "", value: '', three: true },
            ]
        },
    }
};
</script>