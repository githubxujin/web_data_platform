<template>
    <div class="mt20 ">
        <div class="table-wrap ">
            <div class="el-title pb20">企业股权穿透分析</div>
            <div class="container">
                <el-form :inline="true" ref="form" size="medium">
                    <el-form-item class="el-item-form-width-300">
                        <el-autocomplete placeholder="企业名称" v-model="form.corporateName" clearable class="el-item-form-width-300" :fetch-suggestions="querySearchAsync"></el-autocomplete>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="form.upFundedSymbol" filterable placeholder="向上穿透比例" clearable class="el-item-form-width">
                            <el-option v-for="item in percentType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width ">
                        <el-input placeholder="" v-model="form.upFundedRatio" clearable class="el-item-form-width">
                            <span slot="suffix" class="">%</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="form.downFundedSymbol" filterable placeholder="向下穿透比例" clearable class="el-item-form-width">
                            <el-option v-for="item in percentType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width ">
                        <el-input placeholder="" v-model="form.downFundedRatio" clearable class="el-item-form-width">
                            <span slot="suffix" class="">%</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button type="info" @click="rest">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="d3" class="d3-box">
            <d3-instance :type="'equity'" ref="d3" :url="url" :formData="form"></d3-instance>
        </div>
    </div>
</template>

<script>
import d3Instance from './components/d3-instance.vue';
export default {
    data () {
        return {
            url: '/dcp/query/equity/through',
            form: {
                corporateName: '中建二局第三建筑工程有限公司',
                upFundedRatio: '',
                upFundedSymbol: '',
                downFundedSymbol: '',
                downFundedRatio: '',
                throughId: 0
            },
            percentType: [
                { label: '大于', value: '>' },
                { label: '等于', value: '==' },
                { label: '大于等于', value: '>=' },
                { label: '小于', value: '<' }
            ]
        }
    },
    components: {
        d3Instance
    },
    mounted () {
        this.$refs.d3.getData();
    },
    methods: {
        //远程模糊查询
        querySearchAsync (companyName, cb) {
            this.ajax
                .json('/dcp/search/company/name/vague', { companyName }, { type: 'get' })
                .then(res => {
                    let companyName = res.data.map(i => {
                        return {
                            value: i.companyName
                        }
                    })
                    cb(companyName)
                });
        },
        query () {
            // 关系图数据
            let checkRatio = function (val) {
                if (!val) return true;
                return /^(([0-9]+|0)\.([0-9]{1,10})$)|^([0-9]+)$/.test(val)
            }
            let result = ['upFundedRatio', 'downFundedRatio'].every(k => {
                return checkRatio(this.form[k])
            })
            if (!result) {
                this.$message.error('请输入正确数字')
                return
            }

            this.$refs.d3.getData()

        },
        rest () {
            this.form = {
                corporateName: '中建二局第三建筑工程有限公司',
                upFundedRatio: '',
                upFundedSymbol: '',
                downFundedSymbol: '',
                downFundedRatio: '',
                throughId: 0
            }
            this.$nextTick(() => {
                this.$refs.d3.getData()

            })
        }
    }
}
</script>

<style lang="less" scoped>
.d3-box {
    margin-top: 20px;
    background: #232528;
}
.table-wrap {
    padding-bottom: 0;
}
.container {
    color: #fff;
    .percent-item {
        width: 100px;
        /deep/ .el-input__suffix {
            right: 10px;
        }
    }
}
</style>