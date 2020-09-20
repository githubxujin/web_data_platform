<template>
    <!-- 处置反馈-各归类查询 -->
    <div class="page">
        <div class="pt20">
            <el-form :inline="true">

                <el-form-item class="el-item-form-width">
                    <el-autocomplete v-model="params.customerName" clearable placeholder="企业名称" :fetch-suggestions="getCustomerName"></el-autocomplete>
                </el-form-item>
                <template v-if="type === 'all'">
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params.searchType" @change="params.industry=params.auditor=''" clearable placeholder="类别">
                            <el-option :label="'行业'" value="1"></el-option>
                            <el-option :label="'审核人员'" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 行业 -->
                    <el-form-item class="el-item-form-width" v-if="params.searchType == 1">
                        <el-select v-model="params.industry" clearable placeholder="行业">
                            <el-option v-for="(v,k) in industry" :key="k" :label="v" :value="k"></el-option>
                            <el-option :label="'其他'" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 审核人员 -->
                    <el-form-item class="el-item-form-width" v-else-if="params.searchType == 2">
                        <el-select v-model="params.auditor" clearable placeholder="行业/人员">
                            <el-option v-for="(v,k) in G_userName" :key="k" :label="v" :value="k"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width" v-else>
                        <el-select :value="''" clearable placeholder="行业/人员">
                            <!-- <el-option :label="'全部'" value=""></el-option> -->
                        </el-select>
                    </el-form-item>
                </template>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.archiveResult" clearable placeholder="归档结果">
                        <el-option v-for="(v,k) in archiveResult" :key="k" :label="v" :value="k+1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.connectType" clearable placeholder="重大事件关联性">
                        <el-option v-for="(v,k) in connectType" :key="k" :label="v" :value="k+1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-date-width">
                    <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.pageNum=1, initData()" size="medium">查询</el-button>
                    <el-button type="info" @click="rest" size="medium">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="el-20 mb20"></div>
        <!-- 条件复选框 -->
        <cCheckbox class="pt10" :list="categoryList" v-on:search="searchHand" v-if="isRestLoad" />
        <div class="el-20 mb20 mt20 "></div>

        <div class="pt10">
            <el-table :data="list">
                <el-table-column label="企业名称" prop="customerName" align="left" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column label="舆情分类" prop="itemName" align="left" min-width="100" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.itemName}}-{{scope.row.parentItemName}}
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title" align="left" min-width="130" show-overflow-tooltip></el-table-column>
                <el-table-column label="预警时间" prop="eventTime" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column label="审核人" prop="auditorName" align="center" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column label="归档时间" prop="archiveTime" align="center" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column label="归档结果" prop="state" align="center" width="100" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span :class="btnState[scope.row.archiveResult - 1]">{{archiveResult[scope.row.archiveResult - 1]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="重大事件关联性" prop="connectType" align="center" width="130">
                    <template slot-scope="scope">
                        <span v-if="scope.row.major*1">
                            {{connectType[scope.row.connectType - 1]}}
                        </span>
                        <span v-else>
                            -
                        </span>

                    </template>
                </el-table-column>
                <!-- <el-table-column label="附件" prop="files" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" placement="bottom">
                            <div slot="content" class="pl20 pr20">
                                <p class="" v-for="(v,k) in scope.row.files" :key="k">{{v.name}}</p>
                            </div>
                            <span class="fc-b1 cur">查看附件</span>
                        </el-tooltip>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" prop="id" align="center">
                    <template slot-scope="scope">
                        <el-button class="fc-b1 cur" v-if="scope.row.url" @click="toOpen(scope.row.url)" size="small" plain>详情</el-button>
                        <el-button class="fc-b1 cur" v-else @click="toDetail(scope.row)" size="small" plain>详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-pagination :page-sizes="[20, 50, 100]" :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="initData" layout="total, sizes, prev, pager, next, jumper" :total="totalSize"
            v-if="totalSize > 0">
        </el-pagination>

        <el-dialog title="详情" :visible.sync="isDialog" width="80%">

            <div class="div">
                <component :is="componentsName" :value="detail"></component>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="isDialog = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import cCheckbox from '../components/c-checkbox'
export default {
    props: ['type'],
    components: {
        cCheckbox,
    },
    data() {
        return {
            componentsName: 'a6',
            isDialog: false,
            isRestLoad: true,
            detail: '',
            dateArr: [],
            params: {
                "connectType": '',
                "customerName": "", // 企业名称
                "startTime": "", // 开始日期
                "endTime": "", // 结束日期
                "itemIds": "", // 舆情分类ID串 逗号隔开
                "searchType": "", // 1 行业查询  2:审核人查询
                "industry": '', // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                "auditor": "", // 审核人
                "archiveResult": "", // 风险级别(归档结果)(1:已正常 2:已关注 3:未处理)
                "searchAll": +(this.type === 'all'), // 是否查询全部  1:是(cindy菜单默认)  0:否
                pageNum: 1,
                pageSize: 15
            },
            totalSize: 0,
            list: [],
            categoryList: [],
            checkList: [],
            btnState: ['dc-primary', 'dc-success', 'dc-danger'],
            archiveResult: ['已正常', '已关注', '未处理'],
            connectType: ['强', '弱', '无'],
            industry: {
                '1': '基建工程',
                '2': '医药医疗',
                '3': '能源化工'
            },
        }
    },
    watch: {
        type(v) {
            this.initData()
        }
    },
    mounted() {
        this.getDate()
        this.initData()
        this.getCategory()

        // 添加测试账号
        if (process.env.VUE_APP_ENV !== 'pro') {
            this.G_userName = { ...this.G_userName, ...this.G_userName_test }
        }
    },
    methods: {
        getCustomerName(customerName, cb) {
            console.log(customerName)
            this.$http('/risk/server/customer/vague/get', { customerName }, { type: 'get' }).then(res => {
                cb(res.data.map(i => {
                    return {
                        value: i.customerName
                    }
                }))
            });
        },
        toOpen(url) {
            window.open(url)
        },
        getDate() {
            this.dateArr = []
            this.params.startTime = this.formatDate(new Date)
            this.params.endTime = this.formatDate(new Date)
            this.dateArr.push(this.params.startTime, this.params.endTime)
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.startTime = v[0];
                this.params.endTime = v[1];
            } else {
                this.params.startTime = '';
                this.params.startTime = '';
            }
        },
        rest() {
            this.dateArr = []
            this.params = {
                "connectType": '',
                "customerName": "", // 企业名称
                "startTime": this.formatDate(new Date), // 开始日期
                "endTime": this.formatDate(new Date), // 结束日期
                "itemIds": "", // 舆情分类ID串 逗号隔开
                "type": "", // 1 行业查询  2:审核人查询
                "industry": '', // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                "auditor": "", // 审核人
                "archiveResult": "", // 风险级别(归档结果)(1:已正常 2:已关注 3:未处理)
                "searchAll": +(this.type === 'all'), // 是否查询全部  1:是(cindy菜单默认)  0:否
                pageNum: 1,
                pageSize: 15
            }
            this.dateArr.push(this.formatDate(new Date), this.formatDate(new Date))
            this.checkList = []
            this.initData()

            // 重置复选框
            this.isRestLoad = false
            setTimeout(() => {
                this.isRestLoad = true
            }, 0);
        },
        toDetail(row) {
            this.getDetail(row.itemId, row.eventRecordId)
        },
        getTxt(files) {
            let arr = []
            files.map(v => arr.push(v.name))
            return arr.join('\n')
        },
        searchHand(v) {
            this.checkList = v
            this.initData(1)
        },
        async initData(type) {
            this.params.searchAll = this.type === 'all' ? 1 : 0
            let params = this.params

            params = { ...params, ...{ itemIds: this.checkList } }

            let res = await this.ajax.get('risk/server/event/focus/audit/list', params)
            if (res.code === '200') {
                this.list = res.data
                this.totalSize = res.meta.totalSize
            }
        },
        /* 获取分类 */
        async getCategory() {
            let res = await this.ajax.get('risk/server/notify/item/list')
            if (res.code === '200') {
                this.categoryList = res.data
            }
        },
        /* 获取详情 */
        async getDetail(itemId, id) {
            let res = await this.ajax.get(`risk/server/consensus/detail/${id}`)
            if (res.code === '200') {
                this.detail = [JSON.parse(res.data.content)]
                this.componentsName = 'a' + itemId
                this.isDialog = true
            }
        },
    }
}
</script>
<style lang="less" scoped>
/deep/ .el-checkbox .el-checkbox__label {
    width: 62px;
}
</style>


