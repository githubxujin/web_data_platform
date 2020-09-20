<template>
    <div class="table-wrap style-table-wrap">
        <div class="table-title ">{{title}}</div>
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item style=' width: 193px'>
                <el-input v-model='params.projectName' clearable placeholder='项目名称'></el-input>
            </el-form-item>
            <el-form-item style='width: 320px'>
                <el-select v-model='params.materialName' filterable clearable remote multiple collapse-tags :remote-method="remoteMethod" placeholder='招标物资' style="width: 320px">
                    <el-option v-for="(val,i) in goodsOptions" :key="i" :label="val" :value="val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-cascader v-model="params.value" :options="city" placeholder="项目所在地" clearable :props="{ expandTrigger: 'hover', checkStrictly: true,multiple: false   }" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item style=' width: 193px'>
                <el-input v-model='params.tender' clearable placeholder='招标单位'></el-input>
            </el-form-item>
            <el-form-item style=' width: 193px'>
                <el-input v-model='params.bidder' clearable placeholder='中标单位'></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type='primary' size='medium' @click="params.current=1,getList()">查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <el-table :data='list' style='width: 100%'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='bidDate' label='中标日期' width='120' show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop='channel' label='渠道' width='140' show-overflow-tooltip></el-table-column> -->
            <el-table-column prop='projectName' label='项目名称' width='200' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tender' label='招标单位' width='200' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderOrg' label='招标组织单位' width='120' show-overflow-tooltip></el-table-column>
            <el-table-column prop='bidder' label='中标单位' width='160' show-overflow-tooltip></el-table-column>
            <el-table-column prop='businessOwner' label='建设单位' width='100' show-overflow-tooltip></el-table-column>

            <el-table-column prop='projectProvince' label='项目地-省' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='projectCity' label='项目地-市' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='' label='项目类型' width='100' show-overflow-tooltip> </el-table-column>
            <el-table-column prop='tenderDate' label='招标日期' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderContact' label='招标单位联系人' width='120' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderOrgContact' label='招标单位联系方式' width='140' show-overflow-tooltip></el-table-column>
            <el-table-column prop='contactPhone' label='招标组织联系人' width='130' show-overflow-tooltip></el-table-column>
            <el-table-column prop='.tenderOrgPhone' label='招标组织联系电话' width='160' show-overflow-tooltip></el-table-column>
            <el-table-column prop='' label='操作' width='100' align='center' fixed='right'>
                <template slot-scope='scope'>
                    <el-button type="primary" plain size="mini" @click="toDetail(scope.row.id,scope.row.updateBy,scope.row.updateTime)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" @size-change="getList()" :page-size.sync="params.size" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>
<script>
import { sourceOptions } from '@/utils/common'
import city from "@/views/industryTrade/config/city1.js";
export default {
    props: {
        channel: Array,
        title: String,
    },
    data () {
        return {
            city,
            nChannel: '',
            params: {
                projectName: '',
                current: 1,
                size: 10,
                materialName: '',
                key: '',
                type: '3',
                startDate: '', //开始日期
                endDate: '',//结束日期
                bidder: '',
                tender: '',
                value: []
            },
            total: 0,
            list: [],
            dateArr: [],
            sourceOptions,
            goodsOptions: [],

        };
    },
    created () {

        this.nChannel = this.channel[0]
        // 物资下拉列表
        this.getGoodsOptions()
        this.searchRecord()
    },
    methods: {
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        handleChange (value) {
            // console.log(value);
            if (value && value.length > 0) {
                this.params.projectProvince = value[0];
                this.params.projectCity = value[1];
            } else {
                this.params.projectProvince = "";
                this.params.projectCity = "";
            }
        },
        reSet () {
            this.nChannel = ''
            this.dateArr = []
            this.params = {
                current: 1,
                size: 10,
                materialName: '',
                key: '',
                type: '3',
                startDate: '', //开始日期
                endDate: '',//结束日期
                value: [],
            }
            this.getList()
        },
        //物资远程搜索
        remoteMethod (name) {
            // if (name) {

            this.getGoodsOptions(name)
            // }
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.startDate = '';
            }
        },
        toDetail (id, updateBy, updateTime) {
            this.$router.push({ name: 'in-win-data-detail', query: { id, updateBy, updateTime, title: this.title, url: this.$route.name } })
        },
        // 获取物资下拉列表
        getGoodsOptions (name = '') {
            this.ajax
                .get('/dcp/query/material/list', {
                    name
                })
                .then(res => {
                    if (res.code === '200') {
                        console.log(res, '111')
                        const { data = [] } = res
                        if (name) {
                            return (this.goodsOptions = [...data])
                        }
                        const arr = new Set([...this.goodsOptions, ...data, ...this.params.materialName])
                        this.goodsOptions = [...arr]
                    }
                })
        },
        getList () {

            this.params.channel = this.nChannel ? [this.nChannel] : this.channel
            this.$params[this.$route.name] = this.params
            console.log(this.params.channel, '222')
            this.ajax
                .post(
                    '/dcp/query/bid/data/collect/page',
                    { ...this.params },
                    {
                        isLoading: true
                    }
                )
                .then(res => {
                    if (res.code === '200') {
                        const { data = {} } = res
                        const { records = [] } = data
                        this.total = data.total
                        this.list = records
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        exportData () {
            console.log(this.params)
            this.ajax.exportFile('/dcp/export/bid/data/collect', this.params)
        }
    }
};
</script>