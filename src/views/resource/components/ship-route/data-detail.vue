<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">航线跟踪</div>
            <el-form :model="params" :inline="true" ref="form" :rules="rules" size="medium" class="el-serach-form">
                <el-form-item style="width: 150px">
                    <el-select v-model="params.businessNumber" filterable remote :remote-method="numberRemoteMethod" clearable placeholder="业务编号">
                        <el-option v-for="(s, index) in businessNumberList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-select v-model="params.businessName" filterable remote :remote-method="nameRemoteMethod" clearable placeholder="业务合同名称">
                        <el-option v-for="(s, index) in nameNumberList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-select v-model="params.shipName" filterable remote :remote-method="shipNameRemoteMethod" clearable placeholder="船舶名称">
                        <el-option v-for="(s, index) in shipNameList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-input v-model="params.callsign" clearable placeholder="呼号"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-input v-model="params.mmsi" clearable placeholder="MMSI"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-input v-model="params.imo" clearable placeholder="IMO"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-select v-model="params.shipType" filterable remote :remote-method="shipTypeRemoteMethod" clearable placeholder="类型">
                        <el-option v-for="(s, index) in shipTypeList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-select v-model="params.flagCountry" filterable remote :remote-method="flagCountryRemoteMethod" clearable placeholder="船籍">
                        <el-option v-for="(s, index) in flagCountryList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <div class="istonnageBox" @click="LoadWeight" v-if="isLoadWeight">最大载重</div>
                <div class="tonnageBox" v-else>
                    <el-form-item style="width: 62px" prop="minLoadWeight">
                        <el-input v-model.number="params.minLoadWeight"></el-input>
                    </el-form-item>
                    <div class="fanwei">至</div>
                    <el-form-item style="width: 62px" prop="maxLoadWeight">
                        <el-input v-model.number="params.maxLoadWeight"></el-input>
                    </el-form-item>
                </div>

                <div class="istonnageBox" @click="Draught" v-if="isDraught">最大吃水</div>
                <div class="tonnageBox" v-else>
                    <el-form-item style="width: 62px" prop="minDraught">
                        <el-input v-model.number="params.minDraught"></el-input>
                    </el-form-item>
                    <div class="fanwei">至</div>
                    <el-form-item style="width: 62px" prop="maxDraught">
                        <el-input v-model.number="params.maxDraught"></el-input>
                    </el-form-item>
                </div>

                <el-form-item>
                    <el-button type="primary" size="medium" @click="submitForm('form')">查询</el-button>
                    <el-button type="info" size="medium" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class="el-iconfont">
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
                </el-tooltip>
            </el-row>

            <el-table :data="list">
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="businessNumber" label="业务编号" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="businessName" label="业务（合同）名称" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="shipName" label="船舶名称" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="naviStatus" width="150" label="当前状态" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="depportnameEn" label="当前航次-始发港" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="dest" label="当前航次-到达港" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="callsign" label="呼号" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="mmsi" label="MMSI" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="imo" label="IMO" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="shipType" label="类型" width="80" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="flagCountry" label="船藉" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="loadWeight" label="载重吨" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="draught" label="最大吃水" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="createTime" label="添加日期" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatDate(scope.row.createTime) || '-'}}
                    </template>
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="updateTime" label="更新日期" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{formatDate(scope.row.updateTime) || '-'}}
                    </template>
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="createBy" label="添加人" show-overflow-tooltip></el-table-column>
                <el-table-column label='操作' width='200' show-overflow-tooltip fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" plain v-if="scope.row.mmsi" @click="$router.push({ name: 'resource-ship-route-detail', query: {mmsi: scope.row.mmsi,id:scope.row.id}})">详情</el-button>
                        <el-button type="primary" plain v-else @click="detailNo">详情</el-button>
                        <el-button type="info" plain size="small" @click="toEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" plain size="small" @click="toDelect(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList"
                layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
            </el-pagination>

            <!-- 新增 -->
            <data-detail-add :dialogVisible="dialogVisible" ref="customer" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        dataDetailAdd: () => import('./data-detail-add.vue')
    },
    data () {
        var numberRule = (rule, value, callback) => {
            if (value) {
                if (typeof (value) !== "number") {
                    callback(new Error('请输入数字值'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
            value1: [],
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            list: [],
            businessNumberList: [],
            nameNumberList: [],
            flagCountryList: [],
            shipNameList: [],
            shipTypeList: [],
            dialogVisible: false,
            rules: {
                maxLoadWeight: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                minLoadWeight: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                maxDraught: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                minDraught: [{ validator: numberRule, trigger: ['blur', 'change'] }],
            },
            isLoadWeight: true,
            isDraught: true,
        }
    },
    created () {
        this.searchRecord()
        this.shipTypeRemoteMethod()
    },
    methods: {
        LoadWeight () {
            this.isLoadWeight = false
        },
        Draught () {
            this.isDraught = false
        },
        // 业务名称模糊查询
        numberRemoteMethod (businessNumber) {
            if (businessNumber !== '') {
                this.ajax
                    .json('/dcp/ship/info/business/number/vague/query', { businessNumber }, { type: 'get' })
                    .then(res => {
                        this.businessNumberList = res.data
                    });
            } else {
                this.businessNumberList = [];
            }
        },
        // 业务编码模糊查询
        nameRemoteMethod (businessName) {
            if (businessName !== '') {
                this.ajax
                    .json('/dcp/ship/info/business/name/vague/query', { businessName }, { type: 'get' })
                    .then(res => {
                        this.nameNumberList = res.data
                    });
            } else {
                this.nameNumberList = [];
            }
        },
        // 船籍模糊查询
        flagCountryRemoteMethod (flagCountry) {
            if (flagCountry !== '') {
                this.ajax
                    .json('/dcp/ship/info/flag/country/vague/query', { flagCountry }, { type: 'get' })
                    .then(res => {
                        this.flagCountryList = res.data
                    });
            } else {
                this.flagCountryList = [];
            }
        },
        // 船舶名称模糊查询
        shipNameRemoteMethod (shipName) {
            if (shipName !== '') {
                this.ajax
                    .json('/dcp/ship/info/ship/name/vague/query', { shipName }, { type: 'get' })
                    .then(res => {
                        this.shipNameList = res.data
                    });
            } else {
                this.shipNameList = [];
            }
        },
        // 船舶类型模糊查询
        shipTypeRemoteMethod (shipType) {
            if (shipType !== '') {
                this.ajax
                    .json('/dcp/ship/info/ship/type/vague/query', { shipType }, { type: 'get' })
                    .then(res => {
                        this.shipTypeList = res.data
                    });
            } else {
                this.shipTypeList = [];
            }
        },
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList () {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/dcp/ship/info/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        // 查询
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getList()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        reSet () {
            this.value1 = []
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
            this.isLoadWeight = true
            this.isDraught = true
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/ship/info/export", this.params, { type: "export" })
                .then(res => { });
        },
        // 详情
        detailNo () {
            this.$message.error('没有mmsi,没有详情');
        },
        // 新增
        toAdd () {
            this.dialogVisible = true
            this.isEdit = false
        },
        // 编辑
        toEdit (row) {
            this.dialogVisible = true
            this.isEdit = true
            this.$refs.customer.ruleForm = {
                businessNumber: row.businessNumber,
                businessName: row.businessName,
                mmsi: row.mmsi,
                id: row.id
            }
        },
        // 删除
        toDelect (row) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.ajax.json("/dcp/ship/info/delete", { id: row.id }, { type: "POST" }).then(res => {
                    if (res.code === "200") {
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => { });
        }
    }
}
</script>

<style lang="scss" scoped>
.fanwei {
    display: inline-block;
    color: rgba(255, 255, 255, 0.8);
    line-height: 34px;
    margin-right: 10px;
    font-size: 14px;
}
.istonnageBox {
    display: inline-block;
    background: #1d1e23;
    width: 182px;
    height: 34px;
    border: 1px solid #2d3034;
    border-radius: 4px;
    font-family: PingFangSC-Light;
    font-size: 14px;
    line-height: 34px;
    color: rgba(255, 255, 255, 0.8);

    text-indent: 13px;
    margin-right: 10px;
    &:hover {
        border-color: #366f71;
    }
}
.tonnageBox {
    display: inline-block;
    background: #1d1e23;
    width: 182px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #2d3034;
    border-radius: 4px;
    margin-right: 10px;
    /deep/ .el-input__inner {
        border: 1px solid transparent;
    }
    /deep/ .el-form-item.is-error .el-input__inner,
    /deep/ .el-form-item.is-error .el-input__inner:focus,
    /deep/ .el-form-item.is-error .el-textarea__inner,
    /deep/ .el-form-item.is-error .el-textarea__inner:focus,
    /deep/ .el-message-box__input input.invalid,
    /deep/ .el-message-box__input input.invalid:focus {
        border-color: transparent;
    }
}
.dark{
    .tonnageBox{
        /deep/ .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
    }
}
.light{
    .tonnageBox{
        /deep/ .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
        background: #fff;
        border: 1px solid #DCDFE6;
        &:hover{
            border: 1px solid #4064D4;
        }
    }
    .istonnageBox{
        background: #fff;
        color: #666;
        font-family: sans-serif;
        border: 1px solid #DCDFE6;
        &:hover{
            border: 1px solid #4064D4;
        }
    }
    .fanwei{
        color: #666;
    }
}
</style>
