<template>
    <!-- (被执行人)详情弹窗 -->
    <div class="table-wrap mt20">
        <div class="table-title">
            <div>被执行人详情</div>
        </div>

        <el-tabs type="border-card" class="mt10 tootip-table">
            <el-tab-pane>
                <el-table-row :rows="getRows()"></el-table-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ElTableRow from "@/components/Table/el-table-row";
export default {
    components: {
        ElTableRow
    },
    data() {
        return {
            params: {
                id: '',
            },
            list: []
        };
    },
    created() {
        this.params.id = this.$route.query.id
        console.log(this.params.detailId);

        this.getEnforDetail()
    },
    methods: {
        // 被执行人详情信息
        getEnforDetail() {
            this.ajax
                .json('/dcp/query/zhixin/detail', this.params, { type: 'post' }).then(res => {
                    this.list = res.data
                    console.log(this.list + '1')
                });
        },
        // 被执行人详情信息页面
        getRows() {
            return [
                { key: "被执行人姓名/名称", value: this.list.name },
                { key: "性别", value: this.list.sex },
                { key: "身份证号码/组织机构代码", value: this.list.cardNum },
                { key: "执行法院", value: this.list.courtName },
                { key: "立案日期", value: this.list.caseCreateTime },
                { key: "案号", value: this.list.caseCode },
                { key: "执行标的", value: this.list.execMoney },
                { key: "评估时间", value: this.list.createTime }
            ];
        }
    }
};
</script>

<style lang="scss" scoped>
    // 控制台查看组件key的类型，强制修改宽度
    /deep/ .n-table .n-key {
        width: 220px;
    }
    /deep/ .is-top {
        display: none;
    }
</style>
