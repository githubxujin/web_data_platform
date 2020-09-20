<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">药品名称规范明细</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model.trim="params.oldName" clearable placeholder="药品名称-调整前"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model.trim="params.newName" clearable placeholder="药品名称-调整后"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.companyName' clearable placeholder="所属客户">
                        <el-option v-for="(v,i) in salerNameList" :key="i" :label='v' :value='v'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.source' clearable placeholder="数据源">
                        <el-option label="流向数据" :value="1"></el-option>
                        <el-option label="发票数据" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <span class="iconfont icon-shujuzhongxin-xinzeng" @click="isCompile=false,dialogVisible=true,restForm()"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></span>
                </el-tooltip>
            </el-row>
            <div>
                <el-table :data="list">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column prop="oldName" label="药品名称-调整前" min-width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="newName" label="药品名称-调整后" min-width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="companyName" label="所属客户" min-width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="customerName" label="下游名称" min-width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="source" label="数据源" show-overflow-tooltip>
                        <template slot-scope="item">
                            {{ item.row.source === 1 ? '流向数据' : '发票数据' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" align="center" fixed="right" width="160">
                        <template slot-scope="item">
                            <el-button type="info" plain @click.stop="dialogVisible=true,isCompile=true,toRedact(item.row)">编辑</el-button>
                            <el-button type="danger" plain class="del-col" @click.stop="toDel(item.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <el-dialog v-if="dialogVisible" :title="(isCompile ? '编辑' : '添加')" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px">
                <div class="form-in">
                    <el-form ref="formData" :rules="rules" :model="formData" label-width="130px">
                        <el-form-item label="数据源" prop="source">
                            <el-select v-model="formData.source" clearable placeholder="请选择" style="width:100%;">
                                <el-option label="流向数据" :value="1"></el-option>
                                <el-option label="发票数据" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="药品名称-调整前" prop="oldName">
                            <el-input v-model="formData.oldName" maxlength="50" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="药品名称-调整后" prop="newName">
                            <el-input v-model="formData.newName" maxlength="50" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="所属客户" prop="companyName">
                            <el-select v-model="formData.companyName" clearable @change="changeVal" placeholder="请选择" style="width:100%;">
                                <el-option v-for="(v,i) in salerNameList1" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下游名称" prop="customerName">
                            <el-autocomplete v-if="isCompile" popper-class="select-name" class="box-name" v-model="formData.customerName" clearable :debounce="1000" :fetch-suggestions="querySearch"
                                :trigger-on-focus="false" @select="handleSelect" style="width:100%;">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item }}</div>
                                </template>
                            </el-autocomplete>
                            <el-autocomplete v-else popper-class="select-name" class="box-name" v-model="formData.customerName" :debounce="1000" clearable :fetch-suggestions="querySearch" :trigger-on-focus="false"
                                @select="handleSelect" style="width:100%;">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="info" @click="dialogVisible = false,restForm()">取 消</el-button>
                    <el-button size="mini" type="primary" @click="toSubmit('formData')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialogVisible: false,
            dialogVisible1: false,
            isCompile: false,
            total: 0,
            params: {
                current: 1,
                size: 10,
                id: "",
                type: "1", // 类型(1:药品名称2:下游名称)
                source: "", // 所属表(1：流向表)
                companyName: "", // 客户名称
                oldName: "", // 原名称
                newName: "", // 新名称
                customerName: ""
            },
            formData: {
                id: "",
                type: "1",
                source: 1,
                companyName: "",
                oldName: "",
                newName: "",
                customerName: ""
            },
            delId: "",
            salerNameList: [],
            salerNameList1: [],
            activeName: "first",
            list: [],
            rules: {
                oldName: [
                    {
                        required: true,
                        message: "请输入药品名称-调整前",
                        trigger: "blur"
                    }
                ],
                newName: [
                    {
                        required: true,
                        message: "请输入药品名称-调整后",
                        trigger: "blur"
                    }
                ],
                companyName: [
                    {
                        required: true,
                        message: "请选择所属客户",
                        trigger: "change"
                    }
                ],
                source: [
                    {
                        required: true,
                        message: "请选择数据源",
                        trigger: "change"
                    }
                ],
                customerName: [
                    {
                        required: true,
                        message: "请输入下游名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created () {
        this.getList();
        this.getSalerName();
    },
    methods: {
        getList (v) {
            if (v) {
                this.params.current = v;
            }
            this.$http("/dcp/query/sale/specification/page", this.params, {
                type: "formData"
            }).then(res => {
                this.list = res.data.records || [];
                this.total = res.data.total;
            });
        },
        // 获取所属客户
        getSalerName () {
            this.$http("/dcp/query/seller/list", {}, { type: "get" }).then(
                res => {
                    this.salerNameList = res.data || [];
                    this.salerNameList1 = res.data || [];
                }
            );
        },
        // 提交
        toSubmit (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isCompile) {
                        this.formData.type = "1";
                        // this.formData.customerName = [this.formData.customerName]
                        // console.log('this.formData.customerName',this.formData.customerName)
                        this.$http(
                            "/dcp/sale/specification/update",
                            this.formData,
                            { type: "formData" }
                        ).then(res => {
                            this.$message.success("编辑成功");
                            this.restForm();
                            this.getList();
                            this.dialogVisible = false;
                        });
                    } else {
                        this.$http(
                            "/dcp/sale/specification/add",
                            this.formData,
                            { type: "formData" }
                        ).then(res => {
                            this.$message.success("添加成功");
                            this.restForm();
                            this.getList();
                            this.dialogVisible = false;
                        });
                    }
                } else {
                    // alert('error submit!!');
                    return false;
                }
            });
        },
        // 编辑
        toRedact (v) {
            // console.log(v);
            this.isCompile = true;
            this.formData = {
                id: v.id,
                source: v.source,
                companyName: v.companyName,
                oldName: v.oldName,
                customerName: v.customerName,
                newName: v.newName
            };
        },
        // 删除
        toDel (id) {
            // 如果当前页 删除后没有数据，回到第一页
            let isOneData = this.list.length === 1;
            this.$confirm("确定要删除吗？", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                center: true
            })
                .then(() => {
                    this.$http(
                        "/dcp/sale/specification/delete",
                        { id },
                        { type: "formData" }
                    ).then(res => {
                        this.$message.success("删除成功");
                        if (isOneData) {
                            this.$set(this.params, "current", 1);
                        }
                        this.getList();
                    });
                })
                .catch(() => { });
        },
        // 导出
        async exportData () {
            await this.$http(
                "/dcp/query/sale/specification/export",
                this.params,
                { type: "export" }
            );
        },
        changeVal (v) {
            // console.log('v',v);
            this.formData.customerName = "";
        },
        handleSelect (item) {
            // console.log('item',item);
            this.formData.customerName = item;
        },
        querySearch (queryString, cb) {
            // console.log('queryString',queryString);
            var vm = this;
            if (queryString && queryString.length < 2) {
                vm.$message({
                    message: "您输入的字数太少，查询过于宽泛",
                    type: "error"
                });
                cb([]);
            } else {
                this.$http(
                    "/dcp/query/buyer/list",
                    {
                        sellerName: this.formData.companyName,
                        name: queryString
                    },
                    { type: "get" },
                    { isLoading: false, isReturnMsg: true }
                )
                    .then(res => {
                        vm.customerNameList = res.data;
                        // console.log('vm.customerNameList',vm.customerNameList);
                        if (
                            !vm.customerNameList ||
                            vm.customerNameList.length === 0
                        ) {
                            this.formData.customerName = "";
                            vm.$message({
                                message: "未查询到结果",
                                type: "error"
                            });
                            cb([]);
                        } else {
                            var results = vm.customerNameList || [];
                            cb(results);
                        }
                    })
                    .catch(res => {
                        vm.$message({
                            message: res.message,
                            type: "error"
                        });
                        this.formData.customerName = "";
                        cb([]);
                    });
            }
        },
        // 重置
        reSet () {
            this.params = {
                current: 1, //页码
                size: 10, //每页条数
                id: "",
                type: "1", // 类型(1:药品名称2:下游名称)
                // source: "",  // 所属表(1：流向表)
                companyName: "", // 客户名称
                oldName: "", // 原名称
                newName: "" // 新名称
            };
            this.getList();
        },
        // 重置表单
        restForm () {
            this.formData = {
                id: "",
                type: "1",
                source: 1,
                companyName: "",
                oldName: "",
                newName: "",
                customerName: ""
            };
        },
        handleSizeChange (v) {
            this.params.size = v;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
/deep/ .el-button--danger.is-plain {
    color: #bb4d31;
    &:hover {
        color: #bb4d31;
        border-color: #bb4d31;
    }
}
// .form-in {
//     /deep/ .el-input__inner {
//         line-height: 40px;
//     }
// }
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
.form-in {
    padding: 0 87px 0 67px;
}
/deep/ .el-dialog__body {
    padding-bottom: 8px;
}
/deep/ .el-dialog__footer {
    padding: 12px 20px;
}
/deep/ .to-del {
    .el-dialog__body {
        p {
            margin: 0;
        }
        padding-bottom: 30px;
    }
}
</style>