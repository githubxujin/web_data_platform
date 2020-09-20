<template>
    <div class="stat">
        <div class="table-wrap mt20 mb30">
            <div class="table-title">药品数据更新</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.key" clearable placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.drugType' clearable placeholder="产品类别">
                        <el-option label='辅料' value='辅料'></el-option>
                        <el-option label='化学药品' value='化学药品'></el-option>
                        <el-option label='生物制品' value='生物制品'></el-option>
                        <el-option label='中药' value='中药'></el-option>
                        <el-option label='其他' value='其他'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.medicineInsuranceType' clearable placeholder="医保类别">
                        <el-option label='甲' value='甲'></el-option>
                        <el-option label='乙' value='乙'></el-option>
                        <el-option label='非医保' value='非医保'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model='params.drugDosageform' clearable placeholder="剂型" style="width:120px;">
                        <el-option v-for="(v,i) in dosageList" :key="i" :label='v' :value='v'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.quantityPurchase' multiple collapse-tags clearable @change="changeValue($event,1)" placeholder="带量采购">
                        <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.keyMonitor' multiple collapse-tags clearable @change="changeValue($event,2)" placeholder="重点监控">
                        <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.basicDrug' multiple collapse-tags clearable @change="changeValue($event,3)" placeholder="基本药物">
                        <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.imitationDrug' clearable placeholder="仿评药">
                        <el-option label='是' value='是'></el-option>
                        <el-option label='否' value='否'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="导入" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daoru" @click="isDialog=true"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="表头设置" placement="top">
                    <span class="iconfont icon-shujuzhongxin-shezhi" @click="setTable"></span>
                </el-tooltip>
            </el-row>

            <el-table :data="list" class="tab-info">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <template v-for='(item,index) in tableArr'>
                    <el-table-column :label="item.title" :min-width="item.width" :align="item.titleAlign" :prop='item.propName' show-overflow-tooltip :key="index" :formatter="item.formatterFun" :sortable="item.sortable">
                    </el-table-column>
                </template>
                <el-table-column prop="" label="操作" align="center" width="160" fixed="right">
                    <template slot-scope="item">
                        <el-button type="primary" plain @click="toDetail(item.row,1)">详情</el-button>
                        <el-button type="info" plain @click="toDetail(item.row,2)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
                :total="total"></el-pagination>
        </div>
        <el-dialog :visible.sync="isDialog" width="500px" title="导入药品信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                <i class="iconfont icon-ziguanxitong-tishi"></i>
                支持根据【药品名称，药品本位码】来自定义药品的相关字段，点击下载
                <span class="to-links" @click="donwTemplate">导入模版</span>
                确定上传后完成药品信息的更新，将会新增不存在的药品信息或覆盖更新已有的药品信息。
            </p>
            <div class="shangc">
                <span class="wen">
                    上传附件
                </span>
                <c-upload v-if="isDialog" accept=".xlsx,.xls" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}">
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
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="info" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="toUpload()">确 定</el-button>
            </span>
        </el-dialog>
        <tableItemSet ref="tableItemSet" @setOK="setSuccess"></tableItemSet>
    </div>
</template>

<script>
import city from '@/views/infrastructure/config/city.js'
import tableItemSet from '@/components/tableItemSet'
export default {
    data () {
        return {
            isDialog: false,
            isCity1: false,
            isCity2: false,
            isCity3: false,
            total: 0,
            city,
            params: {
                current: 1,
                size: 10,
                key: "",    //关键字
                drugType: "",   //产品类型
                medicineInsuranceType: "",  //医保类型
                drugSpec: "",  //药品规格
                drugDosageform: "",  //剂型
                quantityPurchase: [],  //带量采购 传数组
                keyMonitor: [],    //重点监控 传数组
                basicDrug: [],     //基本药物 传数组
                imitationDrug: '', //仿评药
                complete: '',    //药品信息完整
            },
            dosageList: [],
            list: [],
            file: [],
            // 默认显示的字段
            defaultKeys: ['drugType', 'drugName', 'drugEnglishName', 'drugCode', 'medicineInsuranceType', 'drugSpec', 'drugDosageform', 'quantityPurchase',
                'keyMonitor', 'basicDrug', 'imitationDrug', 'approveDate', 'approveNumber', 'orgApproveNumber', 'manufacture', 'productionAddress', 'productionCountry',],
            tableArr: [],
            allTableArr: [   // 全部字段
                { propName: 'drugType', title: '产品类别', width: 100, titleAlign: 'left', columnAlign: 'center', longTxt: true, sortable: false },
                { propName: 'drugName', title: '药品名称', width: 140, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'drugEnglishName', title: '英文名称', width: 140, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'drugCode', title: '药品本位码', width: 140, titleAlign: 'center', columnAlign: 'center', longTxt: true },
                { propName: 'medicineInsuranceType', title: '医保类别', width: 100, titleAlign: 'center', columnAlign: 'center' },
                { propName: 'drugSpec', title: '药品规格', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'drugDosageform', title: '剂型', width: 140, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'quantityPurchase', title: '带量采购', width: 100, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'keyMonitor', title: '重点监控', width: 100, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'basicDrug', title: '基本药物', width: 100, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'imitationDrug', title: '仿评药', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'approveDate', title: '批准日期/发证日期', width: 150, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'approveNumber', title: '批准文号/注册证号', width: 150, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'orgApproveNumber', title: '原批准文号/注册证号', width: 150, titleAlign: 'left', columnAlign: 'left' },
                { propName: 'manufacture', title: '生产单位', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'productionAddress', title: '生产地址', width: 150, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'productionCountry', title: '生产国家', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true, }
            ],
        }
    },
    created () {
        this.getColumn()
        // this.tableArr = this.allTableArr.filter(i => {
        //     return this.defaultKeys.includes(i.propName)
        // })
        this.getDosage()
        this.getList()
        this.city = [...city]
        this.city.unshift({ name: '否' }, { name: '全国' })
    },
    mounted () {
    },
    methods: {
        changeValue (v, n) {
            // console.log('v',v,n);
            if (n === 1) {
                if (v.includes('否')) {
                    this.params.quantityPurchase = ['否']
                } else {
                    this.params.quantityPurchase = v
                }
            } else if (n === 2) {
                if (v.includes('否')) {
                    this.params.keyMonitor = ['否']
                } else {
                    this.params.keyMonitor = v
                }
            } else if (n === 3) {
                if (v.includes('否')) {
                    this.params.basicDrug = ['否']
                } else {
                    this.params.basicDrug = v
                }
            }
        },
        // 获取剂型
        getDosage () {
            this.$http('/dcp/drug/dosage/form/list', {}, { type: 'get' }).then(res => {
                this.dosageList = res.data
            })
        },
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/drug/page/list', this.params).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        // 下载模板
        donwTemplate () {
            this.$http('/dcp/download/drug/data/excel/template', {}, { type: 'export' })
        },
        /* 上传文件 */
        async uploadHand (files) {
            this.file = [files[0]]
        },
        // 确认上传
        toUpload () {
            // console.log(this.file);
            let data = {
                fileList: this.file
            }
            if (this.file && this.file.length > 0 && this.file.length < 2) {
                this.$http('/dcp/upload/drug/data/file', data, { type: 'upload' }).then(res => {
                    // console.log(res);
                    if (res.code === '200') {
                        this.isDialog = false
                        this.$message.success('导入成功')
                        this.getList()
                    }
                })
            } else if (this.file.length >= 2) {
                this.$message.error('只能上传一个文件')
            } else {
                this.$message.error('请上传附件')
            }

        },
        // 关闭上传弹窗
        closeUp () {
            this.file = []
            // console.log(this.file);
        },
        // 删除上传文件
        delFile (k) {
            this.file.splice(k, 1)
        },
        // 导出
        toExport () {
            this.$http('/dcp/export/drug/data', this.params, { type: 'export' })
        },
        toDetail (v, n) {
            // console.log('v',v);
            // return
            if (n === 1) {
                let row = encodeURIComponent(JSON.stringify(v))
                this.$router.push({ name: 'drugDataDetail', params: { row } })
            } else {
                let item = v
                if (item.quantityPurchase.indexOf(',') === -1) {
                    item.quantityPurchase = [item.quantityPurchase]
                } else {
                    item.quantityPurchase = item.quantityPurchase.split(',')
                }
                if (item.keyMonitor.indexOf(',') === -1) {
                    item.keyMonitor = [item.keyMonitor]
                } else {
                    item.keyMonitor = item.keyMonitor.split(',')
                }
                if (item.basicDrug.indexOf(',') === -1) {
                    item.basicDrug = [item.basicDrug]
                } else {
                    item.basicDrug = item.basicDrug.split(',')
                }
                // console.log('row',item);
                let row = encodeURIComponent(JSON.stringify(item))
                this.$router.push({ name: 'drugDataAmend', params: { row } })
            }

        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                key: "",    //关键字
                drugType: "",   //产品类型
                medicineInsuranceType: "",  //医保类型
                drugSpec: "",  //药品规格
                drugDosageform: "",  //剂型
                quantityPurchase: [],  //带量采购 传数组
                keyMonitor: [],    //重点监控 传数组
                basicDrug: [],     //基本药物 传数组
                imitationDrug: '', //仿评药
                complete: '',    //药品信息完整
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        },
        // 获取表头设置
        getColumn () {
            this.$http('/dcp/query/drug/column', {}, { type: 'get' }).then(res => {
                this.defaultKeys = res.data || this.defaultKeys
                this.tableArr = this.allTableArr.filter(i => {
                    return this.defaultKeys.includes(i.propName)
                })
            })
        },
        // 表头设置  --------------------------------------------------------------------------
        setTable () {
            if (this.tableArr.length === this.allTableArr.length) {
                this.$refs.tableItemSet.checkAll = true
                this.$refs.tableItemSet.isIndeterminate = false
            }
            this.$refs.tableItemSet.newItemDialog = true
            this.$refs.tableItemSet.checkboxGroup1 = this.tableArr.map(i => i.propName)
            this.$refs.tableItemSet.tableArr = this.allTableArr
        },
        setSuccess (val) {
            // console.log('val',val);
            // return
            this.$refs.tableItemSet.newItemDialog = false
            if (val.length === 0) {
                this.tableArr = this.allTableArr
            } else {
                this.tableArr = this.allTableArr.filter(i => {
                    return val.includes(i.propName)
                })
            }
            this.$http('/dcp/drug/column/update', { column: val }, { type: 'formData' }).then(res => {
                this.$message.success('设置成功')
            })
        },
    },
    components: {
        tableItemSet
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.tabs-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
}
// /deep/ .el-tabs__header {
//     margin-top: 30px;
// }
.upload-file {
    /deep/ .el-button {
        position: relative;
        padding-left: 30px;
        .icon-tongyong-daochutubiao {
            position: absolute;
            top: 4px;
            left: 10px;
        }
    }
}
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
.shangc {
    .wen {
        color: rgba(255, 255, 255, 0.8);
        padding-left: 10px;
        margin-right: 10px;
        position: relative;
        &::before {
            content: '*';
            color: #449fa8;
            position: absolute;
            left: 0;
            top: 3px;
        }
    }
}

.icon-ziguanxitong-tishi {
    color: #43a1ac;
}
</style>
