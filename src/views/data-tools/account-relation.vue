<template>
    <div class="mt20 ">
        <div class="table-wrap ">
            <div class="el-title pb20">企业银行账户关联分析</div>
            <div class="container">
                <el-form :inline="true" ref="form" size="medium">
                    <el-form-item class="el-item-form-width-300">
                        <el-autocomplete v-model="form.constructionName" placeholder="建设单位" clearable class="el-item-form-width-300" :fetch-suggestions="constructionNameSearchAsync"></el-autocomplete>
                    </el-form-item>
                    <el-form-item class="el-item-form-width-300">
                        <el-autocomplete v-model="form.contractorName" placeholder="承建单位" clearable class="el-item-form-width-300" :fetch-suggestions="querySearchAsync"></el-autocomplete>
                    </el-form-item>
                    <el-form-item class="el-item-form-width-300">
                        <el-autocomplete v-model="form.customerName" placeholder="供应商" clearable class="el-item-form-width-300" :fetch-suggestions="customerNameSearchAsync"></el-autocomplete>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button type="info" @click="rest">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="d3" class="d3-box">
            <d3-instance ref="d3" :url="url" :formData="form" :type="'relation'"></d3-instance>
        </div>
    </div>
</template>

<script>
import d3Instance from './components/d3-instance.vue';
import { officialTypeList } from '@/utils/common'
export default {
    data () {
        return {
            form: {
                contractorName: '中建二局第三建筑工程有限公司',
                constructionName: '',
                customerName: '',
                // type: ''
            },
            url: '/dcp/asset/relation/atlas',
            officialTypeList,
            organs: [
                { label: '白名单组织架构', value: '白名单组织架构' },
                { label: '全部组织架构', value: '全部组织架构' }
            ]
        }
    },
    components: {
        d3Instance
    },
    mounted () { this.$refs.d3.getData(); },
    methods: {
        //模糊查询
        querySearchAsync (companyName, cb) {
            this.ajax.json(
                "/dcp/antiFraud/account/name/list", { columnName: 'contractor_name' }, { type: 'post' }
            ).then(res => {
                let restaurants = res.data.map(i => {
                    if (typeof i !== "object") {
                        return {
                            value: i
                        }
                    } else {
                        return {
                            value: ""
                        }
                    }

                })
                var results = companyName ? restaurants.filter(this.createStateFilter(companyName)) : restaurants;
                cb(results);

            })
        },
        customerNameSearchAsync (companyName, cb) {
            this.ajax.json(
                "/dcp/antiFraud/account/name/list", { columnName: 'customer_name' }, { type: 'post' }
            ).then(res => {
                let restaurants = res.data.map(i => {
                    if (typeof i !== "object") {
                        return {
                            value: i
                        }
                    } else {
                        return {
                            value: ""
                        }
                    }

                })
                var results = companyName ? restaurants.filter(this.createStateFilter(companyName)) : restaurants;
                cb(results);

            })
        },
        constructionNameSearchAsync (companyName, cb) {
            this.ajax.json(
                "/dcp/antiFraud/account/name/list", { columnName: 'construction_name' }, { type: 'post' }
            ).then(res => {
                let restaurants = res.data.map(i => {
                    if (typeof i !== "object") {
                        return {
                            value: i
                        }
                    } else {
                        return {
                            value: ""
                        }
                    }

                })
                var results = companyName ? restaurants.filter(this.createStateFilter(companyName)) : restaurants;
                cb(results);

            })
        },
        createStateFilter (companyName) {
            return (state) => {
                return (state.value.indexOf(companyName) === 0);
            };
        },
        query () {
            // 关系图数据
            this.$refs.d3.getData();
        },
        rest () {
            this.form = {
                contractorName: '中建二局第三建筑工程有限公司',
                constructionName: '',
                customerName: '',
            }
            this.$nextTick(() => {
                this.$refs.d3.getData();
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
}
</style>