<template>
    <!-- 特别关注 -->
    <div class="table-wrap">
        <div type="search">
            <el-form :inline="true" class="search-form">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.customerName" clearable placeholder="企业名称" />
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.industryType" clearable placeholder="行业">
                        <el-option v-for="v in industry" :key="v.value" :label="v.label" :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.createBy" clearable placeholder="提交人员" />
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.status" clearable placeholder="审核状态">
                        <el-option v-for="(v,k) in state" :key="k" :label="v" :value="k"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>

                    <el-button type="primary" size="medium" @click="params.pageNum = 1, getList()">查询</el-button>
                    <el-button type="info" size="medium" @click="rest">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-row class='el-iconfont' style="margin-top: -4px">
            <el-tooltip class='item' effect='dark' content='新增' placement='top'>
                <i class='iconfont icon-shujuzhongxin-xinzeng' @click='addItem'></i>
            </el-tooltip>
        </el-row>

        <!-- <div class="pt10">
            <div class="c-btn" @click="addItem"><i class="iconfont icon-tianjia pr5"></i>新增</div>
        </div> -->

        <div>
            <el-table :data="list">
                <el-table-column label="企业名称" prop="customerName" align="left" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column label="行业" prop="industryType" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{industrys[scope.row.industryType*1]}}
                    </template>
                </el-table-column>
                <el-table-column label="提交人员" prop="createBy" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" min-width="120" show-overflow-tooltip></el-table-column>
                <el-table-column label="备注" prop="remark" align="center" show-overflow-tooltip>
                    <template slot-scope='scope'>
                        {{ scope.row.remark ? scope.row.remark : '-' }}
                    </template>
                </el-table-column>
                <el-table-column label="审核时间" prop="auditTime" align="center" min-width="120" show-overflow-tooltip>
                    <template slot-scope='scope'>
                        {{ scope.row.auditTime ? scope.row.auditTime : '-' }}
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="status" align="center" min-width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span class="state-tag" :class="btnState[scope.row.status]">{{state[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button type="info" plain v-if="[0,3].includes(scope.row.status)" @click="auditShow(scope.row,true)">审核</el-button>
                        <el-button v-else @click="auditShow(scope.row, false)" type="primary" plain>详情</el-button>
                        <el-button type="danger" plain class="del-col" @click="delData(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination :page-sizes="[20, 50, 100]" :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="totalSize"
            v-if="totalSize > 0">
        </el-pagination>

        <el-dialog :title="isAudit?'审核':isEdit?'新增':'详情'" :visible.sync="isDialog" v-if="isDialog" width="640px" :close-on-click-modal="false">
            <el-form :model="itemForm" :rules="rules" ref="diaForm" label-width="90px" :disabled="!isEdit && !isAudit" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="行业" prop="industryType">
                    <el-select v-model="itemForm.industryType" :disabled="isAudit" @change="itemForm.customerName=''">
                        <el-option v-for="v in industry" :key="v.value" :label="v.label" :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" prop="customerName">
                    <el-select v-model="itemForm.customerName" filterable remote reserve-keyword placeholder="" @change="changeHand" @focus="remoteMethod('')" :remote-method="remoteMethod" clearable :disabled="isAudit">
                        <el-option v-for="item in optionsNames" :key="item.id" :label="item.customerName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传附件" class="n-upload">
                    <ul :class="[isEdit ? 'files-list ' : 'files-list mt30']">
                        <li v-for="(v, k) in fileList" :key="k">
                            <a :href="v.url" :class="{'state-gray':v.disableFlag}" :title="v.fileName" target="_blank">{{v.fileName}}</a>
                            <template v-if="isEdit">
                                <a class="dropdown-item" @click.prevent="delFile(k)" style="margin-left:6px">
                                    <i class="el-icon-error"></i>
                                </a>
                            </template>
                        </li>
                        <li v-if="!isEdit && fileList.length<=0">
                            无
                        </li>

                        <c-upload v-if="isEdit" accept=".jpg,.jpeg,.pdf,.png,.bmp" type="primary" size="mini" v-on:changehand="uploadHand">上传文件
                        </c-upload>
                    </ul>

                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="4" v-model="itemForm.remark" :disabled="isAudit" maxlength="100" />
                </el-form-item>
                <el-form-item label="审批意见" prop="auditComment" v-if="!isEdit">
                    <el-input type="textarea" :rows="4" v-model="itemForm.auditComment" maxlength="100" />
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer" v-if="isEdit">
                <el-button size="mini" type="info" @click="isDialog = false">取消</el-button>
                <el-button type="primary" size="mini" @click="validHand(true)">确定</el-button>
            </div>
            <div slot="footer" class="dialog-footer" v-else-if="isAudit">
                <el-button type="danger" size="mini" @click="validHand(false,0)">不通过</el-button>
                <el-button type="primary" size="mini" @click="validHand(false,1)">通过</el-button>
            </div>
            <div slot="footer" class="dialog-footer" v-else>
                <el-button type="primary" size="mini" @click="isDialog = false">关闭</el-button>
            </div>

        </el-dialog>
        <el-dialog title="提示" :visible.sync="isDialog1" width="450px" :close-on-click-modal="false">

            <p class="f14 tc del-p">
                确定要删除？
            </p>

            <div slot="footer" class="dialog-footer">
                <el-button type="info" size="mini" @click="isDialog1 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="delDataHand">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getStore } from '@utils'
export default {
    data () {
        return {
            isDialog: false,
            isDialog1: false,
            isEdit: false,
            isAudit: false,
            id: '',
            optionsNames: [],
            params: {
                "industryType": "", // 所属板块(0:其他 1:基建工程 2:医药医疗 3:能源化工)
                "customerName": "", // 企业名称
                "status": "", // 审核状态
                "createBy": "", // 操作人
                pageNum: 1,
                pageSize: 15
            },
            itemForm: {
                customerId: '',
                customerName: "", // 企业名称
                industryType: 1,
                fileIds: '',
                remark: ''
            },
            fileList: [
                // { fileName: 'd是的发生dds.png', filePath: '123' },
                // { fileName: 'sfasdasdf.png', filePath: '123' },
                // { fileName: '撒打发斯蒂芬.png', filePath: '123' },
            ],
            totalSize: 10,
            list: [],
            btnState: ['dc-primary', 'dc-success', 'dc-danger'],
            industrys: ['其他', '基建工程', '医药医疗', '能源化工'],
            industry: [
                { label: '基建工程', value: 1 },
                { label: '医药医疗', value: 2 },
                { label: '能源化工', value: 3 },
                { label: '其他', value: 0 },
            ],
            state: ['待审核', '已通过', '不通过'],
            rules: {
                industryType: [
                    { required: true, message: '请选择行业', trigger: 'change' }
                ],
                customerName: [
                    { required: true, message: '请选择客户名称', trigger: 'change' }
                ],
                auditComment: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        fileAPI () {
            return this.env + '/risk/getFile/'
        },

    },
    mounted () {
        this.getList()
    },
    methods: {
        rest () {
            this.params = {
                "industryType": "", // 所属板块(0:其他 1:基建工程 2:医药医疗 3:能源化工)
                "customerName": "", // 企业名称
                "status": "", // 审核状态
                "createBy": "", // 操作人
                pageNum: 1,
                pageSize: 15
            }

            this.getList()
        },
        gotoFile (fileId) {
            return `${this.fileAPI}?id=${fileId}&access_token=${getStore('token')}`
        },
        addItem () {
            this.itemForm = {
                customerId: '',
                customerName: '',
                industryType: 1,
                fileIds: '',
                remark: ''
            }
            this.fileList = []
            this.isEdit = true
            this.isAudit = false
            this.isDialog = true
        },
        changeHand (val) {
            this.itemForm.customerId = val
        },
        auditShow (row, isAudit) {
            this.isDialog = true
            this.isAudit = isAudit
            this.isEdit = false

            this.getDetail(row.id)
        },
        async remoteMethod (customerName) {
            let res = await this.ajax.get('risk/server/customer/survey/chose', { industry: this.itemForm.industryType, customerName })
            if (res.code === '200') {
                this.optionsNames = res.data
            }
        },
        async getList () {
            let res = await this.ajax.get('risk/m/special/focus/list', this.params)
            if (res.code === '200') {
                this.list = res.data
                this.totalSize = res.meta.totalSize

                if (!this.list.length && this.params.pageNum !== 1) {
                    this.params.pageNum = 1
                    this.getList()
                }
            }
        },
        async getDetail (id) {
            let res = await this.ajax.get('risk/m/special/focus/detail', { id })
            if (res.code === '200') {
                this.itemForm = { ...this.itemForm, ...res.data }

                this.fileList = res.data.files ? res.data.files : []
            }
        },
        validHand (isAdd, type) {
            this.$refs['diaForm'].validate((valid) => {
                if (valid) {
                    isAdd ? this.addData() : this.audit(type)
                } else {
                    return false
                }
            })
        },
        async addData () {
            let fileIds = []
            this.itemForm.fileIds = this.fileList.map(v => {
                fileIds.push(v.id)
            })
            let res = await this.ajax.post('risk/m/special/focus/add', { ...this.itemForm, ...{ fileIds } })
            if (res.code === '200') {
                this.$message.success('操作成功')
                this.isDialog = false
                this.getList()
            }
        },
        async audit (optType) {
            let res = await this.ajax.post('risk/m/special/focus/audit', { ...this.itemForm, ...{ optType } })
            if (res.code === '200') {
                this.$message.success('操作成功')
                this.isDialog = false
                this.getList()
            }
        },
        async delData (id) {
            this.id = id
            this.isDialog1 = true
        },
        async delDataHand () {
            this.ajax.post('risk/m/special/focus/del', { id: this.id }).then(res => {
                this.$message.success('操作成功')
                this.isDialog1 = false
                this.getList()
            })
        },
        async uploadHand (files, type) {

            let param = {
                file: {
                    files: files
                }
            }

            if (files[0].size > 1048576 * 20) {
                this.$message.error('文件合计大小不得超过20M')
                return
            }

            let res = await this.ajax.upload('risk/m/file/upload', param)
            if (res.code === '200') {
                /*
                    返回值
                    "fileId": 1,     //文件ID
                    "fileName": "test.pdf",     //文件名称
                    "fileSize": 4096        //文件大小（单位KB） 
                 */
                res.data.map(v => {
                    this.fileList.push(v)
                })
            }
        },
        delFile (inx) {
            this.fileList.splice(inx, 1)
        }
    }
}
</script>
<style lang="less" scoped>
.dark {
    .del-p {
        color: #fff;
    }
}
.c-upload /deep/ .el-button{
    position: absolute;
    top: 0;
    left: 0;
}
.files-list {
    margin-top: 35px;
    margin-bottom: 0;
    padding-left: 16px;
    width: 335px;
}
</style>


