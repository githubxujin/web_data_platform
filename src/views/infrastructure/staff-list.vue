<template>
    <div class="table-wrap mt20">
        <div class="table-title">{{this.$route.params.customerName}}</div>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="企业资质资格" name="first">
                <company v-if="activeName === 'first'" />
            </el-tab-pane>
            <el-tab-pane label="注册人员" name="second">
                <staff v-if="activeName === 'second'" />
            </el-tab-pane>
            <el-tab-pane label="工程项目" name="three">
                <project v-if="activeName === 'three'" />
            </el-tab-pane>
            <el-tab-pane label="不良行为" name="fourth">
                <bad v-if="activeName === 'fourth'" />
            </el-tab-pane>
            <el-tab-pane label="良好行为" name="five">
                <good v-if="activeName === 'five'" />
            </el-tab-pane>
            <el-tab-pane label="黑名单记录" name="six">
                <black v-if="activeName === 'six'" />
            </el-tab-pane>
            <el-tab-pane label="变更记录" name="seven">
                <change-record v-if="activeName === 'seven'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Company from "@/components/DataDetail/company.vue";
import Staff from "@/components/DataDetail/staff.vue";
import ChangeRecord from "@/components/DataDetail/change-record.vue";
import Project from "@/components/DataDetail/project.vue";
import Good from "@/components/DataDetail/good.vue";
import Bad from "@/components/DataDetail/bad.vue";
import Black from "@/components/DataDetail/black.vue";
export default {
    components: {
        Company,
        Staff,
        ChangeRecord,
        Project,
        Good,
        Bad,
        Black
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (from.name === "person-detail") {
                vm.activeName = "second";
            }
        });
    },
    methods: {},
    data () {
        return {
            activeName: "first"
        };
    }
};
</script>
