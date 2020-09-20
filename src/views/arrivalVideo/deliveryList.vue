<template>
    <div class="stat">
        <el-row class="table-wrap mt20">
            <div class="table-title" v-if="$route.name !== 'dataAdministration-delivery-query'">到货视频审核</div>
            <div class="table-title" v-else>到货视频</div>
            <el-form :inline="true" ref="form" size="medium" :model="params" class="serch-one">
                <el-form-item prop="customerName">
                    <el-input v-model="params.customerName" clearable placeholder="供应商名称"></el-input>
                </el-form-item>
                <el-form-item prop="projectName">
                    <el-input v-model="params.projectName" clearable placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="params.page=1;getList();saveFun()">查询</el-button>
                    <el-button type="info" @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="list">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="customerName" label="供应商名称" min-width="300"></el-table-column>
                <el-table-column prop="projectName" label="项目名称" min-width="300" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" align="center" fixed="right" width="140">
                    <template slot-scope="item">
                        <el-button v-if="$route.name !== 'dataAdministration-delivery-query'" type="primary" plain size="mini"
                            @click="$router.push('/dataAdministration/delivery/deliveryDetail/'+ item.row.id +'/'+ encodeURIComponent(item.row.projectName) + '/' + encodeURIComponent(item.row.customerName))">详情
                        </el-button>
                        <el-button v-else type="primary" plain size="mini"
                            @click="$router.push('/dataAdministration/delivery-query/deliveryDetail/'+ item.row.id +'/'+ encodeURIComponent(item.row.projectName) + '/' + encodeURIComponent(item.row.customerName))">详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList($event);saveFun()" :current-page="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                layout="total, sizes, prev, pager, next, jumper" :total="sizeCount"></el-pagination>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            sizeCount: 0,
            params: {
                size: 10,
                page: 1,
                projectName: '',
                customerName: ''
            },
            list: []
        }
    },
    created () {
    },
    mounted () {
        this.getParams()
    },
    methods: {
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        },
        // 获取 保存的参数
        getParams () {
            let data = this.$bus.getParams(this.$route.meta.paramsType)
            for (let key in this.params) {
                this.params[key] = data[key] || this.params[key]
            }
            this.getList()
        },
        // 改变 查询参数时 更新保存的参数
        saveFun () {
            this.$bus.saveParams(this.$route.meta.paramsType, this.params)
        },
        getList (v) {
            if (v) {
                this.params.page = v
            }
            this.$http('/riskreport/project/queryProjectInfoList', this.params, { type: 'json' }).then(res => {
                this.list = res.data.list || []
                this.sizeCount = res.data.sizeCount
            })
        },
        // 重置表单
        resetForm (formName) {
            this.params = {
                size: 10,
                page: 1,
                projectName: '',
                customerName: ''
            }
            // 清除 保存的参数
            this.$bus.clearParams(this.$route.meta.paramsType)
            this.getList()
        }
    },
    beforeRouteEnter (to, from, next) {
        // console.log('from',from);
        // 路由守卫中无法获取到this  但是可以在 next() 回调中获取到this
        next(vm => {
            if (
                from.name === 'dataAdministration-delivery-deliveryDetail' ||
                from.name === 'dataAdministration-delivery-query-deliveryDetail'
            ) {
                vm.getParams()
            } else {
                vm.resetForm()
            }
        })
    }
}
</script>
<style lang="less" scoped>
.stat {
    .serch-one {
        /deep/ .el-form-item__content {
            width: 340px;
            .el-input__inner {
                padding-right: 10px;
            }
        }
    }
    .uplod {
        margin: 10px 0 30px;
        /deep/ .icon-tongyong-daochutubiao {
            font-size: 16px !important;
        }
    }
    /deep/ .el-dialog__body {
        height: 70vh;
        // padding: 0 70px 35px 70px;
        padding: 0 0 35px;
        .operation {
            width: 175px;
            height: 35px;
            margin: 0 auto;
            display: flex;
            > div {
                width: 65px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            img {
                margin-right: 5px;
            }
            span {
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                color: #606266;
            }
        }
        .tc-img1 {
            overflow: auto;
        }
        .tc-img {
            height: calc(~'100% - 35px');
            // width: 1522px;
            margin: 0 auto;
            text-align: center;
            // overflow: auto;
            .imgs {
                // width: 800px;
                max-width: 100%;
                max-height: 100%;
                margin: 0 auto;
            }
            .imgs-new {
                width: 800px;
            }
        }
        #video {
            margin: 0 auto;
        }
    }
    .hege {
        /deep/ .el-dialog__body {
            height: auto;
        }
    }
    .vide {
        display: block;
        width: 100%;
    }
    .p1 {
        color: #21ac67; // 合格
    }
    .p2 {
        color: #ea5932; // 不合格
    }
    .p3 {
        color: #0486fe; // 待审核
    }
}
</style>