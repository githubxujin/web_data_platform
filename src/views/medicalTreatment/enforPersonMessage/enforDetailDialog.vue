<template>
    <!-- (失信被执行人)详情弹窗 -->
    <div class="table-wrap mt20">
        <div class="table-title">
            <div>失信被执行人库详情</div>
        </div>
        <el-tabs type="border-card" class="mt10 tootip-table">
            <el-tab-pane>
                <el-table-row :rows="getRowsPerson()"></el-table-row>
                <table class="last">
                    <tr>
                        <td class="last_key">生效法律文书确定的义务</td>
                        <td :class="['last_value',{'kong':!list.duty || list.duty.length>74}]">{{list.duty || '-'}}</td>
                    </tr>
                </table>
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
        // 向后端发请求后，把数据更换成后端数据
        getEnforDetail() {
            this.ajax
                .json('/dcp/query/brokenpromises/detail', this.params, { type: 'post' }).then(res => {
                    this.list = res.data
                    console.log(this.list + '1')
                });
        },
        getRowsPerson() {
            return [
                { key: "被执行人姓名/名称", value: this.list.name },
                { key: "性别", value: this.list.sexy },
                { key: "身份证号码/组织机构代码", value: this.list.cardNum },
                { key: "省份", value: this.list.provinceName },
                { key: "执行法院", value: this.list.courtName },
                { key: "案号", value: this.list.caseCode },
                { key: "执行依据文号", value: this.list.gistId },
                { key: "做出执行依据单位", value: this.list.gistUnit },
                { key: "立案日期", value: this.list.regDate },
                { key: "发布日期", value: this.list.publishDate },
                { key: "被执行人的履行情况", value: this.list.performance },
                { key: "评估时间", value: this.list.createTime },
                { key: "失信被执行人行为具体情形", value: this.list.disruptType, alone: true },
                // { key: "生效法律文书确定的义务", value: this.list.duty, alone: true  },
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
    .last {
        border-bottom: 1px solid #54575c;
        border-left: 1px solid #54575c;
        border-right: 1px solid #54575c;
        box-sizing: border-box;
        .last_key {
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #a0a3a8;
            letter-spacing: 0.44px;
            width: 219px;
            background: #292b2f;
            padding-left: 20px;
        }
        .last_value {
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #d3d3d4;
            letter-spacing: 0.44px;
            padding: 10px 20px;
            line-height: 24px;
        }
        .kong {
            width: 1094px;
        }
    }
</style>
