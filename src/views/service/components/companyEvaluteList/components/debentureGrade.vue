<template>
    <div id="elTableExpand">
        <div class="sub-title mb20 mt30">{{ this.title }}</div>
        <el-table
            :data="pledgeContent"
            style="width: 100%;border: 1px solid #666;"
            border
        >
            <!-- <el-table-column
                v-for="(item, index) in pledgeHead"
                :key="index"
                :label="item.title"
                :prop="item.name"
            >
            </el-table-column> -->
            <el-table-column label="序号" width="60">
                1
            </el-table-column>
            <el-table-column label="评级日期">
                2019-03-23
            </el-table-column>
            <el-table-column label="对象">
                发行人主体
            </el-table-column>
            <el-table-column label="方式">
                跟踪评级
            </el-table-column>
            <el-table-column label="变更前">
                AAA
                <el-tag size="medium" class="h_tag">维持</el-tag>
                <el-tag size="medium">稳定</el-tag>
            </el-table-column>
            <el-table-column label="评级公司">
                中诚信国际信用评级有限责任公司
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    data() {
        return {
            pledgeHead: [
                {
                    title: "序号",
                    name: "index"
                },
                {
                    title: "变更日期",
                    name: "updataData"
                },
                {
                    title: "变更事项",
                    name: "updataItems"
                },
                {
                    title: "变更前",
                    name: "updataBefore"
                },
                {
                    title: "变更后",
                    name: "updataAfter"
                }
            ],
            pledgeContent: [
                {
                    index: "1",
                    updataData: "2018-06-08",
                    updataItems: "-",
                    updataBefore: "-",
                    updataAfter: "中诚信国际信用评级有限责任公司",
                    number: "无",
                    code: "无",
                    annotation: "无",
                    type: "无"
                }
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>

<style lang="less" scoped>
.demo-table-expand.copyright {
    .el-form-item {
        display: block !important;
        width: 35%;
    }
}
.el-form-item {
    margin-bottom: 0 !important;
}
form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
        margin-bottom: 0 !important;
    }
}
.el-tag {
    background: #2b3536;
    border: none;
    border-radius: unset;
    color: #358e62;
    margin-left: 10px;
}
</style>
