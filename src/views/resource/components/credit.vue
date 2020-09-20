<template>
    <div>
        <div class="tabs-title mb20 pt30">企业信用</div>
        <table class="el-table-list">
            <tr>
                <td>评级类别</td>
                <td>评级机构</td>
                <td>评级时间</td>
            </tr>
            <tr>
                <td class="td-one">境内信用评级</td>
                <td>{{params.domesticCreditRating ? params.domesticCreditRating : '-'}}</td>
                <td>-</td>
            </tr>
            <tr class="bg-tran">
                <td class="td-one">税务评级</td>
                <td>{{params.domesticTax ? params.domesticTax : '-'}}</td>
                <td>-</td>
            </tr>
            <tr>
                <td class="td-one">境外信用评级</td>
                <td>{{params.overseasCreditRating ? params.overseasCreditRating : '-'}}</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mb20 pt30">法人个人信息</div>
        <el-table :data="linkmanList" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="name" label="类别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="性别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="婚姻状况" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="从业年限" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mb20 pt30">法人风险资讯</div>
        <el-table :data="linkmanList" border>
            <el-table-column type="name" label="个人正信记录" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="逾期" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="涉诉" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="失信被执行人" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mb20 pt30">实际控制人个人信息</div>
        <el-table :data="linkmanList" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="name" label="类别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="性别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="婚姻状况" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="从业年限" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mb20 pt30">实际控制人风险资讯</div>
        <el-table :data="linkmanList" border>
            <el-table-column type="name" label="个人正信记录" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="逾期" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="涉诉" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="失信被执行人" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mb20 pt30">其他人员个人信息</div>
        <el-table :data="linkmanList" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="name" label="类别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="性别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="婚姻状况" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="从业年限" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mb20 pt30">其他人员风险资讯</div>
        <el-table :data="linkmanList" border>
            <el-table-column prop="name" label="个人正信记录" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="逾期" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="涉诉" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="失信被执行人" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        id: String
    },
    data () {
        return {
            params: {},
            linkmanList: []
        };
    },
    created () {
        this.getList(this.id)
    },
    methods: {
        getList (id) {
            this.$http('/dcp/energy/credit/info', { id }, { type: 'get' }).then(res => {
                this.params = res.data
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.report {
    color: #43a1ac;
    text-decoration: underline;
}
</style>
