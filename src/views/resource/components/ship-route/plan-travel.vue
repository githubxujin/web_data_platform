<template>
    <div>
        <div class="table-wrap">
            <el-row class="el-iconfont">
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
                </el-tooltip>
            </el-row>
            <el-table :data="list">
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="shipName" label="船名" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="voyage" label="航次" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="origin" label="起始港" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="dest" label="目的港" show-overflow-tooltip></el-table-column>
                <el-table-column prop="leavePortTime" label="离港时间" show-overflow-tooltip width="170">
                    <template slot-scope="scope">
                        {{formatDate(scope.row.leavePortTime,'YYYY-MM-DD HH:mm:ss') || '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="arrivePortTime" label="到港时间" show-overflow-tooltip width="170">
                    <template slot-scope="scope">
                        {{formatDate(scope.row.arrivePortTime,'YYYY-MM-DD HH:mm:ss') || '-'}}
                    </template>
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="voyageTime" label="航时" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="carryCargo" label="载货情况" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="carrier" label="承运人" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="shipment" label="装货位置" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="disburden" label="卸货位置" show-overflow-tooltip></el-table-column>
                <el-table-column label='操作' width='200' show-overflow-tooltip fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="toEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" plain size="small" @click="toDelet(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList"
                layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
            </el-pagination>

            <!-- 新增/编辑 -->
            <PlanTravelAdd ref="customerAdd" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shipsName: String
    },
    components: {
        PlanTravelAdd: () => import("./plan-travel-add.vue")
    },
    data () {
        return {
            list: [],
            params: {
                current: 1,
                size: 10,
                mmsi: this.$route.query.mmsi
            },
            total: 0,
            dialogVisibleAdd: false
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            this.ajax
                .json('/dcp/ship/plan/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        // 新增
        toAdd () {
            this.dialogVisibleAdd = true
            this.isAdd = true
            this.$set(this.$refs.customerAdd.ruleForm, 'shipName', this.shipsName)
            this.$refs.customerAdd.$refs['ruleForm'] && this.$refs.customerAdd.$refs['ruleForm'].resetFields()
        },
        // 编辑
        toEdit (id) {
            this.dialogVisibleAdd = true
            this.isAdd = false
            this.detail(id)
            this.$refs.customerAdd.$refs['ruleForm'] && this.$refs.customerAdd.$refs['ruleForm'].resetFields()
        },
        detail (id) {
            this.ajax
                .json('/dcp/ship/plan/detail', { id }, { type: 'get' })
                .then(res => {
                    let { shipName, voyage, origin, leavePortTime, dest, arrivePortTime, carryCargo, carrier, num, unit, shipment, disburden } = res.data
                    this.$refs.customerAdd.ruleForm = {
                        shipName,
                        voyage,
                        origin,
                        leavePortTime: this.formatDate(leavePortTime, "YYYY-MM-DD HH:mm:ss"),
                        dest,
                        arrivePortTime: this.formatDate(arrivePortTime, "YYYY-MM-DD HH:mm:ss"),
                        carryCargo,
                        carrier,
                        num,
                        unit,
                        shipment,
                        disburden,
                        mmsi: this.$route.query.mmsi,
                        id: res.data.id
                    }
                });
        },
        // 删除
        toDelet (row) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.ajax.json("/dcp/ship/plan/delete", { id: row.id, optType: 2 }, { type: "POST" }).then(res => {
                    if (res.code === "200") {
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => { });
        },
    }
}
</script>

<style lang="scss" scoped>
.table-wrap {
    padding-top: 20px;
}
</style>
