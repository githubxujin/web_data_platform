<template>
    <div class="table-wrap mt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item style=' width: 193px'>
                <el-input v-model='params.projectName' clearable placeholder='项目名称'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='nChannel' clearable placeholder='渠道'>
                    <el-option v-for="(val,i) in sourceOptions" :key="i" :label="val.label" :value="val.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style='width: 400px'>
                <el-select v-model='params.materialName' filterable clearable remote multiple collapse-tags :remote-method="remoteMethod" placeholder='招标物资' style='width: 400px'>
                    <el-option v-for="(val,i) in goodsOptions" :key="i" :label="val" :value="val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style=' width: 193px'>
                <el-input v-model='params.tender' clearable placeholder='招标单位'></el-input>
            </el-form-item>
            <el-form-item style=' width: 193px'>
                <el-input v-model='params.bidder' clearable placeholder='中标单位'></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.type" placeholder="" class="n-select-type">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
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
            <el-tooltip class='item' effect='dark' content='新增' placement='top'>
                <i class='iconfont  icon-shujuzhongxin-xinzeng ' @click='toAdd'></i>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='导入' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daoru' @click='toUpload'></i>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <el-table :data='list' style='width: 100%'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='bidDate' label='中标日期' width='120' show-overflow-tooltip></el-table-column>
            <el-table-column prop='channel' label='渠道' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='projectName' label='项目名称' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tender' label='招标单位' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderContact' label='招标单位联系人' width='120' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderOrgContact' label='招标单位联系方式' width='140' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderOrg' label='招标组织单位' width='120' show-overflow-tooltip></el-table-column>
            <el-table-column prop='contactPhone' label='招标组织联系人' width='130' show-overflow-tooltip></el-table-column>
            <el-table-column prop='contactPhone' label='招标组织联系电话' width='160' show-overflow-tooltip></el-table-column>
            <el-table-column prop='bidder' label='中标单位' width='160' show-overflow-tooltip></el-table-column>
            <el-table-column prop='businessOwner' label='业主' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='tenderDate' label='招标日期' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='' label='操作' width='160' align='center' fixed='right'>
                <template slot-scope='scope'>
                    <el-button type="primary" plain size="mini" @click="toDetail(scope.row.id,scope.row.updateBy,scope.row.updateTime)">详情</el-button>
                    <el-button type="info" plain size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" @size-change="handleSizeChange" :page-size.sync="params.size" :current-page.sync="params.current" @current-change="getList"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>
        <el-dialog :visible.sync="isDialog" width="500px" title="导入采集数据">
            <el-form ref="dialogForm" :rules="rules" label-width="80px" :model="dialogForm" class="dialog-form">
                <p class="tishi">
                    <i class="iconfont icon-ziguanxitong-tishi"></i>
                    导入数据上传的附件有格式要求，点击下载
                    <span class="to-links" @click="donwTemplate">导入模版</span>
                </p>
                <el-form-item label="所属部门" prop="department">
                    <el-select v-model="dialogForm.department" filterable clearable placeholder="请选择" style="width:300px">
                        <el-option v-for="(val,i) in departmentOptions" :key="i" :label="val.label" :value="val.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传附件" prop="file">
                    <div class="shangc">

                        <c-upload v-if="isDialog" accept=".xlsx,.xls" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}">
                            上传文件
                        </c-upload>
                        <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                        <ul class="el-upload-list el-upload-list--text" v-if="file.length">
                            <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file" :key="k">
                                <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{v.name}}</a>
                                <label class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                                </label>
                                <i class="el-icon-close" @click="delFile(k)"></i>
                            </li>
                        </ul>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="info" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="confirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { sourceOptions } from '@/utils/common'
export default {
    props: {
        channel: Array
    },
    data () {
        return {
            isDialog: false,
            nChannel: '',
            params: {
                projectName: '',
                current: 1,
                size: 10,
                materialName: '',
                key: '',
                type: '3',
                startDate: '', //开始日期
                endDate: '' //结束日期
            },
            total: 0,
            list: [],
            dateArr: [],
            sourceOptions,
            goodsOptions: [],
            departmentOptions: [],
            file: [],
            rules: {
                department: [
                    {
                        required: true,
                        message: '请选择所属部门',
                        trigger: 'blur'
                    }
                ],
                file: [
                    {
                        required: true,
                        // message: "请上传文件",
                        validator: this.checkFile,
                        trigger: 'blur'
                    }
                ]
            },
            dialogForm: {
                department: '',
                file: ''
            },
            typeList: [
                { label: '全部', value: '3' },
                { label: '招标日期', value: '1' },
                { label: '中标日期', value: '2' }
            ]
        };
    },
    created () {
        // 物资下拉列表
        this.getGoodsOptions()
        this.getList()
        this.getdepartment()
    },
    methods: {
        handleSizeChange () { this.getList() },
        delFile (index) {
            this.file.splice(index, 1)
        },
        confirm () {
            this.$refs.dialogForm.validate(valid => {
                if (valid && this.file.length) {
                    const files = { files: this.file }
                    const data = { department: this.dialogForm.department }
                    this.ajax
                        .upload('/dcp/upload/bid/data/file', {
                            file: files,
                            data
                        })
                        .then(res => {
                            if (res.code === '200') {
                                this.$message({
                                    showClose: true,
                                    message: '导入成功！',
                                    type: 'success'
                                })
                                this.getList()
                                this.isDialog = false

                            }
                        })
                } else {
                    return false
                }
            })
        },
        //判断是否有上传文件
        checkFile (rule, value, callback) {
            if (!this.file.length) {
                callback('请上传文件')
            } else {
                callback()
            }
        },
        //获取部门
        getdepartment () {
            this.ajax.get('/dcp/query/department/list').then(res => {
                if (res.code === '200') {
                    const { data = [] } = res
                    this.departmentOptions = data.map(v => ({
                        label: v,
                        value: v
                    }))
                }
            })
        },
        donwTemplate () {
            this.ajax.exportFile('/dcp/download/bid/data/excel/template')
        },
        /* 上传文件 */
        async uploadHand (files) {
            // console.log('files',files);
            // this.file = files
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
            // console.log(this.file);
        },
        toUpload () {
            this.isDialog = true
            console.log(123)

        },
        toEdit (id) {
            console.log('edit')
            this.$router.push({ name: 'service-winning-edit', query: { id } })
        },
        toDetail (id, updateBy, updateTime) {
            let menu = [{ name: '操作配置' }, { name: '内容设置' }, { name: '基建工程' }, { name: '中标数据库更新', url: this.$route.name }]
            this.$router.push({ name: 'in-win-data-detail', query: { id, updateBy, updateTime, menu: JSON.stringify(menu) } })
        },
        toAdd () {
            this.$router.push({ name: 'service-winning-add' })
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
                endDate: '' //结束日期
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
        // edit(id, updateBy, updateTime) {
        //     this.$router.push({ name: 'in-win-data-detail', query: { id, updateBy, updateTime } })
        // },
        // 获取物资下拉列表
        getGoodsOptions (name = '') {
            this.ajax
                .get('/dcp/query/material/list', {
                    name
                })
                .then(res => {
                    if (res.code === '200') {
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
            this.ajax.exportFile('/dcp/export/bid/data/collect', this.params)
        }
    }
};
</script>
<style lang="scss" scoped>
.n-select-type {
    width: 105px;
    margin-right: -2px;
}
.up-tem {
    color: #449fa8;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
    }
}
</style>