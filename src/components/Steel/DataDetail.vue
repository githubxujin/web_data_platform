<template>
    <div class="table-wrap pb0 mb0">
        <div class="table-title">钢材-价格数据-网价</div>
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class="el-item-form-width ">
                <el-select placeholder="来源" v-model="params.source" clearable filterable @change="sourceChangeCity">
                    <el-option :value="1" label="我的钢铁网"></el-option>
                    <el-option :value="2" label="兰格网"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="城市" v-model="params.city" clearable filterable style="width:180px;" @change="onChangeCity">
                    <el-option v-for="(item, index) in cityList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select placeholder="产品类型" v-model="params.productType" clearable filterable @change="onChangeProductType">
                    <el-option v-for="(item, index) in productTypeList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="品名" v-model="params.productName" clearable style="width:180px;" filterable @change="onChangeProductName">
                    <el-option v-for="(item, index) in productNameList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="材质" v-model="params.material" clearable style="width:180px;" filterable @change="onChangeMaterial">
                    <el-option v-for="(item, index) in materialList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="规格" v-model="params.standard" clearable style="width:180px;" filterable @change="onChangeStandard">
                    <el-option v-for="(item, index) in standardList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="el-item-form-width ">
                <el-select placeholder="产地" v-model="params.producingArea" clearable filterable>
                    <el-option v-for="(item, index) in productAreaList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select placeholder="发布时间" v-model="params.dateType" clearable filterable>
                    <el-option v-for="(item, index) in timeList" :key="index" :value="item.value" :label="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-date-width ">
                <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current= 1, getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="收藏筛选条件" placement="top">
                <i class="iconfont icon-shujuzhongxin-shoucang1" @click="collectOK"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看收藏" placement="top">
                <i class="iconfont  icon-shujuzhongxin-shoucangjia" @click="collectDig=true,condition='',myCollects()"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="qg-steel-price">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="publishDate" label="日期" width="110" align="left"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间" width="180" align="left" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  formatDate(scope.row.publishTime, 'HH:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column prop="city" label="城市" align="left"></el-table-column>
            <el-table-column prop="productType" label="产品类型" align="left" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productName" label="品名" align="left"></el-table-column>
            <el-table-column prop="material" label="材质" align="left"></el-table-column>
            <el-table-column prop="standard" label="规格" align="left" show-overflow-tooltip></el-table-column>
            <el-table-column prop="source" label="来源" align="left" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.source === 1 ? '我的钢铁网' : '兰格网'}}
                </template>
            </el-table-column>
            <el-table-column prop="producingArea" label="产地" align="left" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="价格" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="relativetoYesterday" label="比昨日" align="left">
                <template slot-scope="scope">
                    <div v-html="scope.row.relativetoYesterday"></div>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注1" align="left" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="remark2" label="备注2" align="left" show-overflow-tooltip>
                <template slot-scope='scope'>
                    <i class="icon-shujuzhongxinv41-kaipiaobeizhu iconfont" v-if="scope.row.remark2" @click="OpendialogVisible(scope.row.remark2)"></i>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination :page-sizes="[10,20,50,100]" :page-size="params.size" :current-page.sync="params.current" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total>0">
        </el-pagination>
        <el-dialog title="已收藏条件" :visible.sync="collectDig" width="550" center>
            <el-row>
                <el-col :span="7">
                    <el-input v-model="condition" @keyup.13.native='handleCurrentChange(1)' clearable></el-input>
                </el-col>
                <el-col :span="2" style="margin-left:20px">
                    <el-button @click="CollectSearch(1)" type="primary">查询</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" border style="width: 100%;margin-top:20px" size="medium">
                <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column align="left" label="已收藏条件" min-width="200">
                    <template slot-scope="scope">{{scope.row.city}}+{{scope.row.productName}}+{{scope.row.standard}}+{{scope.row.material}}+{{scope.row.producingArea}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="收藏时间" width="180"></el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small" plain>
                            查询</el-button>
                        <el-button @click="cancelClick(scope.row)" type="danger" size="mini" plain>取消收藏</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-dialog>
        <!-- 备注2弹窗 -->
        <el-dialog title="备注2" :visible.sync="dialogVisible" top="35vh" width="600px">
            <div>
                <p class="remark-text">{{ this.remark2 }}</p>
            </div>
            <div slot="footer">
                <el-button type="info" size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<style lang="scss" scoped>
/* /deep/ .el-table thead tr {
    &:first-child th {
        &:nth-child(9),
        &:nth-child(10),
        &:nth-child(11),
        &:nth-child(12) {
            color: #d6d8dc;
            background-color: #2b363b;
        }

        &:nth-child(13),
        &:nth-child(14),
        &:nth-child(15),
        &:nth-child(16) {
            color: #d6d8dc;
            background-color: #323b4e;
        }
    }
} */
.dark {
    .remark-text {
        line-height: 30px;
        color: rgba(255, 255, 255, 0.8);
    }
    .icon-shujuzhongxinv41-kaipiaobeizhu {
        font-size: 16px;
        color: #43a1ac;
    }
}
.light {
    .remark-text {
        line-height: 30px;
        color: #666;
    }
    .icon-shujuzhongxinv41-kaipiaobeizhu {
        font-size: 16px;
        color: #4064d4;
    }
}

/deep/ .el-button--danger.is-plain {
    &:hover {
        color: #dd5e3e;
        background: #413636;
    }
}
.el-icon-tickets:before {
    content: '\E78B';
    color: #366f71;
}

/deep/ .el-form {
    position: relative;
}
</style>
<script>
import {
    citysJson,
    productNameJson,
    specJson,
    materialJson,
    placeJson
} from "@/utils/json";
export default {
    data () {
        return {
            remark2: "",
            dialogVisible: false,
            timeList: [
                {
                    label: '首次发布时间',
                    value: 'ASC'
                },
                {
                    label: '末次发布时间',
                    value: 'DESC'
                },
            ],
            citysJson,
            productNameJson,
            specJson,
            materialJson,
            placeJson,
            params: {
                current: 1,
                size: 10,
                city: "上海",
                productName: "螺纹钢",
                standard: "",
                material: "",
                productType: "",
                producingArea: "",
                collected: "",
                startDate: "",
                endDate: "",
                source: 1
            },
            collectDig: false,
            list: [],
            condition: "",
            tableData: [],
            total: 0,
            value1: [],
            productTypeList: [],
            cityList: [],
            productNameList: [],
            materialList: [],
            standardList: [],
            productAreaList: []
        };
    },
    created () {
        this.getCity()
        this.getProductType()
        this.getProdcutName()
        this.getMaterial()
        this.getStandard()
        this.getList();
        this.getProductArea()

    },
    methods: {
        //规格联动产地
        onChangeStandard () {
            this.params.producingArea = ""
            this.getProductArea()

        },
        getProductArea () {
            let { source, city, productType, productName, material, standard } = this.params
            this.ajax
                .json('/dcp/price/product/area/list', { source, city, productType, productName, material, standard }, { type: 'get' })
                .then(res => {
                    this.productAreaList = res.data
                });
        },
        onChangeCity (city) {
            this.params.productType = ""
            this.params.standard = ""
            this.params.productName = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.getProductType()
            this.getProdcutName()
            this.getMaterial()
            this.getStandard()
            this.getProductArea()
        },
        //改变材料
        onChangeMaterial () {
            this.params.standard = ""
            this.params.producingArea = ""
            this.getStandard()
            this.getProductArea()
        },
        //改变品名
        onChangeProductName () {
            this.params.standard = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.getMaterial()
            this.getStandard()
            this.getProductArea()
        },
        //改变类型
        onChangeProductType () {
            this.params.standard = ""
            this.params.material = ""
            this.params.productName = ""
            this.params.producingArea = ""
            this.getProdcutName()
            this.getMaterial()
            this.getStandard()
            this.getProductArea()
        },
        //
        getStandard () {
            let { city, productType, source, productName, material } = this.params
            this.ajax
                .json('/dcp/price/standard/list', { city, productType, source, productName, material }, { type: 'get' })
                .then(res => {
                    this.standardList = res.data
                });
        },
        //材料
        getMaterial () {
            let { city, productType, source, productName } = this.params
            this.ajax
                .json('/dcp/price/material/list', { city, productType, source, productName }, { type: 'get' })
                .then(res => {
                    this.materialList = res.data
                });
        },
        //品名
        getProdcutName () {
            let { city, productType, source } = this.params
            this.ajax
                .json('/dcp/price/product/list', { city, productType, source }, { type: 'get' })
                .then(res => {
                    this.productNameList = res.data
                });
        },
        //产品类型
        getProductType () {
            this.params.standard = ""
            this.params.productName = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.ajax
                .json('/dcp/price/product/type/list', { source: this.params.source, city: this.params.city }, { type: 'get' })
                .then(res => {
                    this.productTypeList = res.data
                });
        },
        // 来源联动城市
        sourceChangeCity () {
            this.params.city = ""
            this.params.productType = ""
            this.params.standard = ""
            this.params.productName = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.getProdcutName()
            this.getCity()
            this.getProductType()
            this.getStandard()
            this.getProductArea()
            this.getMaterial()
        },
        //获取城市
        getCity () {
            this.ajax
                .json('/dcp/price/city/list', { source: this.params.source }, { type: 'get' })
                .then(res => {
                    this.cityList = res.data
                });
        },
        OpendialogVisible (remark) {
            this.remark2 = remark
            this.dialogVisible = true
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = "";
                this.params.startDate = "";
            }
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                city: "上海",
                productName: "螺纹钢",
                standard: "",
                material: "",
                producingArea: "",
                collected: "",
                startDate: "",
                endDate: ""
            };
            this.value1 = [];
            this.getList();
        },
        getList () {
            this.$http("/dcp/price/steel/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        CollectSearch (val) {
            this.params.current = val;
            this.myCollects();
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        },
        collectOK () {
            let params = {
                city: this.params.city,
                productName: this.params.productName,
                material: this.params.material,
                standard: this.params.standard,
                producingArea: this.params.producingArea
            };
            this.$http("/datacenter/collect", params).then(res => {
                if (res.code === 200) {
                    this.$message.success("收藏成功");
                } else {
                    this.$message.warning(res.message);
                }
            });
        },
        cancelClick (row) {
            this.$http("/datacenter/cancelCollect", {
                collectId: row.collectId
            }).then(res => {
                this.$message.success("已取消收藏");
                this.myCollects();
            });
        },
        myCollects () {
            let params = {
                page: 1,
                size: 10,
                condition: this.condition
            };
            this.$http("/datacenter/myCollects", params).then(res => {
                this.tableData = res.data.list;
                this.total = res.data.sizeCount;
            });
        },
        // handleCurrentChange(val) {
        //     // this.page.pageNumber = val;
        //     this.myCollects();
        // },
        handleClick (row) {
            this.$http("/dcp/price/steel/page/list", row).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        async exportData () {
            let arr = [];
            let data = {
                ...this.params
            };
            Object.keys(data).forEach(key => {
                arr.push(data[key]);
            });
            let allEmpty = arr.some(i => i);
            if (!allEmpty) {
                this.$message.warning("请至少选择一个条件后再操作");
                return false;
            }
            await this.$http("/dcp/price/steel/info/export", data, { type: "export" });
        }
    }
};
</script>


