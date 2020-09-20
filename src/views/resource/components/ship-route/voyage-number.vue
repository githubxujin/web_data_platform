<template>
    <div class="content pt20">
        <el-table :data="list" ref="refTable" @row-click="clickTable">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div class="expand_left">
                        <div class="same end">终</div>
                        <img class="line" src="../../../../assets/images/ship-route/reach_port_arrow.png" alt="">
                        <div class="same start">始</div>
                    </div>
                    <div class="expand_right">
                        <div class="end">{{props.row.portNameCh || '-'}}（到达港）</div>
                        <div class="detatl">
                            <div class="box">
                                <span class="text">港口停留(h)</span>
                                <span class="number">{{props.row.stayPortTime || '-'}}</span>
                            </div>
                            <div class="box">
                                <span class="text">码头作业(h)</span>
                                <span class="number">{{props.row.stayTerminalTime || '-'}}</span>
                            </div>
                            <div class="box">
                                <span class="text">等泊时间(h)</span>
                                <span class="number">{{props.row.waitBerthTime || '-'}}</span>
                            </div>
                            <div class="box">
                                <span class="text">航时(h)</span>
                                <span class="number">{{props.row.sailingTime || '-'}}</span>
                            </div>
                            <div class="box">
                                <span class="text">航程(nm)</span>
                                <span class="number">{{props.row.distance || '-'}}</span>
                            </div>
                            <div class="box">
                                <span class="text">航速(kn)</span>
                                <span class="number">{{props.row.speed || '-'}}</span>
                            </div>
                        </div>
                        <div class="start">{{props.row.departurePort || '-'}}（始发港）</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="portNameCh" label="港口中文" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="portNameEn" label="港口英文" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="country" label="国家或地区" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="arrivePortTime" label="到港时间" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{formatDate(scope.row.arrivePortTime,'YYYY-MM-DD HH:mm:ss') || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="arriveBerthTime" label="靠泊时间" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{formatDate(scope.row.arriveBerthTime,'YYYY-MM-DD HH:mm:ss') || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="leavePortTime" label="离港时间" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{formatDate(scope.row.leavePortTime,'YYYY-MM-DD HH:mm:ss') || '-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="stayPortTime" label="港口停留(h)" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="stayTerminalTime" label="码头作业(h)" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="waitBerthTime" label="等泊时间(h)" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="sailingTime" label="航时(h)" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="distance" label="航程(nm)" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="speed" label="航速(kn)" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            list: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        clickTable(row, index, e) {
            this.$refs.refTable.toggleRowExpansion(row)
        },
        getList() {
            this.ajax
                .json('/dcp/ship/voyage/page/list', { mmsi: this.$route.query.mmsi })
                .then(res => {
                    this.list = res.data.records
                });
        }
    },
}
</script>

<style lang="scss" scoped>
    .content {
        position: relative;
    }
    .reach_port_button {
        position: absolute;
        top: 187px;
        width: 35px;
        cursor: pointer;
    }
    /deep/ .el-drawer__wrapper {
        top: 10px;
    }
    .content_detail {
        margin: 0 10px;
    }
    .el_drawer_content /deep/ .el-drawer {
        height: 681px;
    }
    // .el-table /deep/ th {
    //     background-color: #2d3034;
    // }
    // .el-table /deep/ tr {
    //     background: #2d3034;
    // }
    // /deep/ .el-table {
    //     background-color: #2d3034;
    // }
    // /deep/ .el-table__row.expanded,
    // /deep/ .el-table__expanded-cell {
    //     background: #313438;
    // }
    // /deep/ .el-table__body-wrapper.is-scrolling-none {
    //     // 根据UI提的问题，此处去掉了航次暂无数据的高度
    //     // height: 570px;
    //     overflow-y: auto;
    // }
    // 展开
    .expand_left {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 20px;
        position: relative;
        display: inline-block;
        .same {
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 2px;
            text-align: center;
        }
        .line {
            margin-left: 5px;
            width: 9px;
        }
    }
    .expand_right {
        vertical-align: top;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        position: relative;
        display: inline-block;
        margin-top: 3px;
        margin-left: 10px;
        width: 470px;
        .end {
            margin-bottom: 102px;
        }
        .detatl {
            position: absolute;
            top: 34px;
            left: 0;
            display: flex;
            flex-wrap: wrap;
            line-height: 31px;
            .box {
                width: 100px;
                margin-right: 45px;
                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
            .text {
                float: left;
            }
            .number {
                float: right;
            }
        }
    }
    .dark{
        .expand_left {
            color: #ffffff;
            .end {
                background: #bb4d31;
            }
            .start {
                background: #358e62;
            }
        }
        .expand_right {
            color: #ffffff;
        .detatl {
            font-family: PingFangSC-Light;
            color: #909399;
        }
    }
    }
    .light{
        .expand_left {
            color: #ffffff;
            .end {
                background: #ec6249;
            }
            .start {
                background: #3dbd7d;
            }
        }
        .expand_right {
            color: #666;
        .detatl {
            font-family: PingFangSC-Regular;
            color: #999;
        }
    }
    }
    /deep/ .el-table__expanded-cell{
        padding: 20px 30px !important;
    }
</style>
