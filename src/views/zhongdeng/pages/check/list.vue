<template>
    <div class="page">
        <div class="mainContent">
            <div class="mod pb0">
                <el-form :inline="true" size="medium">
                    <el-form-item>
                        <el-input v-model.trim="params.businessNo" placeholder="业务编号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.sellerName" placeholder="卖方名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="params.dataSource" placeholder="数据来源" clearable>
                            <el-option label="其他" value="1"></el-option>
                            <el-option label="手工导入" value="2"></el-option>
                            <el-option label="盛易通" value="3"></el-option>
                            <el-option label="盛达通" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="params.importStatus" placeholder="状态" clearable>
                            <el-option v-for="(v,k) in importStatuses" :label="v" :value="k" :key='k'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="initData('search')">查询</el-button>
                        <el-button type="info" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mod">
                <!-- 表格 -->

                <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column prop="businessNo" label="业务编号" width="180"></el-table-column>
                    <el-table-column prop="sellerName" label="卖方名称" min-width="300" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="dataSource" label="数据来源" width="120" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{scope.row.dataSource}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dataSource" label="状态" width="120" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :class="{highstatus:scope.row.importStatus!='全部成功'}" @click="handleImportStauts(scope.row)">{{scope.row.importStatus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createBy" label="操作者" width="200" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="操作时间" width="170" prop="createTime" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center" fixed="right" width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="onDetail(scope.row)" plain>详情</el-button>
                            <!-- <el-button type="danger" size="mini" @click="handelDelte(scope.row)" plain>删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="page-nav">
                    <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='initData' :current-page.sync='params.current' @current-change='initData'
                        layout='total, sizes, prev, pager, next, jumper' :total='listMeta.totalSize' v-if='listMeta.totalSize > 0'>
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="Excel导入" :visible.sync="isDialog" center width="400px">
            <div style="text-align:center">
                请选择需要导入的文件
            </div>
            <div slot="" style="text-align:center" class="mt20">
                <a href="javascript:;" class="btn colorb">
                    <i class="iconfont icon-tongyong-daorutubiao"></i>
                    选择文件
                    <input v-if="isFile" class="uploadBatch" accept=".xls,.xlsx" type="file" id='excel-upload' @change="readExcelTemplate('excel-upload')" />
                </a>
                <a class="coloro btn ml20 " href='file/查重导入模版.xlsx' target="_blank"><i class="iconfont icon-tongyong-daochutubiao"></i>下载模版</a>
            </div>
        </el-dialog>
        <el-dialog v-if="descDialog" title="提示" :visible.sync="descDialog" width="600px">
            <div class="pt20 descmain" v-if="importStatus=='部分失败'">
                <span>失败原因：错误的发票号</span>
            </div>
            <div class="pt20 descmain">
                <span>{{descmain}}</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type='primary' @click="descDialog=false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog v-if="isDialogDetail" title="查重详情" :visible.sync="isDialogDetail" width="90%" :close-on-click-modal="false">
            <detail :detailData="detailData" />
        </el-dialog>
    </div>
</template>
<script>
export default {
    components: {
        // 'c-search': Search
        detail: () => import('./detail.vue'),
    },
    data () {
        return {
            isDialog: false,
            descDialog: false,
            isDialogDetail: false,
            descmain: '',
            detailData: {},
            ids: [],
            list: [],
            listMeta: {},
            isData: false,
            isFile: true,
            form: {
                'customerName': '' // 企业名称
            },
            importStatuses: {
                1: '全部成功',
                2: '部分失败',
                3: '全部失败'
            },
            importStatus: '',
            dataSources: {
                1: '盛易通',
                2: '手工录入'
            },
            params: {
                current: 1,
                size: 10
            },
            rules: {
                customerName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                productId: [{ required: true, message: '请选择产品名称', trigger: 'change' }],
                isEnable: [{ required: true, message: '请选择状态', trigger: 'change' }] // 状态：0 失效；1 生效
            }
        }
    },
    computed: {
        fileAPI () {
            return this.env + '/zdw/getFile'
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        // 获取列表
        async initData (type) {
            if (type === 'search') {
                this.params.current = 1
            }
            let res = await this.ajax.json('dcp/asset/screen/page/list', this.params)
            if (res.code === '200') {
                this.list = res.data.records
                this.listMeta.totalSize = res.data.total
            }
        },
        onDetail (row) {
            this.detailData.id = row.id
            console.log(this.detailData.id)
            this.detailData.name = row.sellerName
            this.$router.push({
                path: '/zhongdeng/check-detail',
                query: this.detailData
            })
        },
        handelDelte (row) {
            this.$confirm('请您确认是否删除', '提示', {
                center: true
            }).then(res => {
                this.del(row)
            }).catch(() => {

            })
        },
        handleImportStauts (row) {
            if (row.importStatus !== '全部成功') {
                this.descDialog = true
                this.importStatus = row.importStatus
                this.descmain = row.failDesc
            }
        },
        handleSelectionChange (val) {
            this.ids = []
            val.forEach(v => {
                this.ids.push(v.id)
            })
        },
        // 重置
        reset () {
            this.params = {
                current: 1,
                size: 10
            }
            this.initData()
        }
    },
    filters: {
        auditResultStr (val) {
            var str = ''
            switch (val) {
                case 0:
                    str = '待提交'
                    break
                case 9:
                    str = '否决'
                    break
            }
            return str
        }
    }
}
</script>

<style lang="less" scoped>
.head {
    margin-bottom: 20px;
    padding: 5px 0 20px;
    border-bottom: 1px dashed #ebeef5;
}

.mt10 {
    margin-top: 10px;
}

.mb10 {
    margin-bottom: 10px;
}

.ml30 {
    margin-left: 30px;
}

.pt20 {
    padding-top: 20px;
}

.pb20 {
    padding-bottom: 20px;
}

.high {
    font-size: 20px;
    color: #fa8e3a;
}
.colorf {
    color: #fff;
}
//导入弹窗
.colorb {
    background-color: #0486fe;
}
.coloro {
    background-color: #fa8e3a;
}
.btn:hover {
    cursor: pointer;
    text-decoration: none;
}
.btn {
    position: relative;
    text-decoration: none;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    border-radius: 4px;
    width: 100px;
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    padding: 0px 10px;
}
.uploadBatch {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100px;
    height: 35px;
}

.uploadBatch:hover {
    cursor: pointer;
}
.descmain {
    span {
        color: #fff;
        font-size: 16px;
    }
}
.highstatus {
    cursor: pointer;
    color: #fa8e3a;
}
</style>