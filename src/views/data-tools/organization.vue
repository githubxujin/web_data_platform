<template>
    <div class="mt20 ">
        <div class="table-wrap ">
            <div class="el-title pb20">中国建筑组织结构查询</div>
            <div class="container">
                <el-form :inline="true" ref="form" size="medium">
                    <el-form-item class="el-item-form-width-300">
                        <el-autocomplete placeholder="公司名称/机构名称" v-model="form.companyName" clearable class="el-item-form-width-300" :fetch-suggestions="querySearchAsync"></el-autocomplete>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="form.whiteList" placeholder="请选择" clearable class="el-item-form-width">
                            <el-option v-for="item in organs" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="el-item-form-width">
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button type="info" @click="rest">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div id="d3" class="d3-box">
            <d3-instance ref="d3" :url="url" :formData="form" :type="'cscec'"></d3-instance>
        </div>
    </div>
</template>

<script>
import d3Instance from './components/d3-instance.vue';
export default {
    data () {
        return {
            form: {
                companyName: '中国建筑股份有限公司',
                plate: '',//板块
                parentId: '',
                whiteList: 0
            },
            url: '/dcp/cscec/system/company/list',
            organs: [
                { label: '白名单组织架构', value: 1 },
                { label: '全部组织架构', value: 0 }
            ],
            types: [
                { label: '建筑工程', value: 0 },
                { label: '电子商务', value: 1 },
                { label: '基础设施', value: 2 },
                { label: '设计勘察', value: 3 },
                { label: '房地产', value: 4 },
                { label: '国际工程', value: 5 },
                { label: '其他', value: 6 }
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
            this.$nextTick(() => {
                this.$refs.d3.getData();

            })
        },
        rest () {
            this.form = {
                companyName: '中国建筑股份有限公司',
                plate: '',//板块
                parentId: '',
                whiteList: 0
            }
            this.$nextTick(() => {
                this.$refs.d3.getData();

            })
        }
    }
}
</script>

<style lang="less" scoped>
.table-wrap {
    padding-bottom: 0;
}
.d3-box {
    margin-top: 20px;
    background: #232528;
}
.table-title {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 14px;
    margin: 8px 0 20px;
    font-family: PingFangSC-Regular;
}
.container {
    color: #fff;
}
</style>