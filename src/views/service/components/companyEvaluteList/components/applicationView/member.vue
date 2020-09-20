<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">成员</div>
                    <el-form :inline="true" ref="form" size="medium">
                        <el-form-item class="el-item-form-width">
                            <el-input v-model="params.name" placeholder="输入名称查找" class="el-item-form-width"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="params.current = 1; getList()">查询</el-button>
                            <el-button type="info" size="medium" @click="reSet">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-table :data="list" stripe>
                            <el-table-column type="index" label="序号" width="150" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="name" label="名称" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span :class="`lastName color_${Math.floor(Math.random()*5)}`">{{scope.row.name.slice(0,1)}}</span>
                                    {{scope.row.name}}
                                </template>
                            </el-table-column>
                            <el-table-column :formatter="formatLabel" prop="position" label="职务" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
export default {
    data () {
        return {
            total: 0,
            params: {
                current: 1,
                size: 10,
                name: ""
            },
            list: [],

        };
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/relation/member', { evaluateId, ...this.params })
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                name: ""
            };
            this.getList();
        }
    },


};
</script>

<style lang="scss" scope>
.dark {
    .lastName {
        display: inline-block;
        width: 36px;
        height: 36px;
        background: rgba(161, 93, 65, 0.29);
        border: 1px solid #a15d41;
        border-radius: 2px;
        font-family: PingFang-Light;
        font-size: 19px;
        color: #e4e4e4;
        letter-spacing: 0.74px;
        text-align: center;
        line-height: 36px;
        margin-right: 20px;
        &.color_2 {
            background: #273537;
            border: 1px solid #366f71;
        }
        &.color_3 {
            background: #3a4235;
            border: 1px solid #70874f;
        }
        &.color_4 {
            background: rgba(53, 92, 156, 0.21);
            border: 1px solid #355c9c;
        }
        &.color_5 {
            background: #333440;
            border: 1px solid #636389;
        }
    }
}
.light {
    .lastName {
        display: inline-block;
        width: 36px;
        height: 36px;
        background: #fbb148;
        border-radius: 2px;
        font-family: PingFang-Light;
        font-size: 19px;
        color: #fff;
        letter-spacing: 0.74px;
        text-align: center;
        line-height: 36px;
        margin-right: 20px;
        &.color_2 {
            background: #ff794d;
        }
        &.color_3 {
            background: #12b29e;
        }
        &.color_4 {
            background: #1ea57d;
        }
        &.color_5 {
            background: #4064d4;
        }
    }
}

.has-gutter {
    /deep/ tr {
        height: 60px;
    }
}
</style>