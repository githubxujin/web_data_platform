
<template>
    <!-- 业内重大事件或舆情 -->
    <div class="table-wrap">
        <div>
            <div class="tabs-title mb20">
                <span>企业相关重大事件或舆情</span>
            </div>
            <el-table :data="params.drugCompanyControlList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="paymentType" align="center" label="舆情分类" width="100">
                    <template slot-scope="item">
                        <el-input v-model="item.row.paymentType" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="changeRepaymentAccount" label="标题" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.changeRepaymentAccount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="changeTime" label="预警时间" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.changeTime" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="orgRepaymentMonitor" align="center" label="操作" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.orgRepaymentMonitor" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isAdd: false,
            params: {
                companyName: '',
                drugCompanyControlList: [      //  企业相关重大事件(无接口)
                    // {
                    //     name: '',
                    //     idCard: '',
                    //     marital: '',
                    //     child: '',
                    //     startYear: '',
                    //     workYear: ''
                    // }
                ]
            }
        }
    },
    created () {
        if (this.$route.name === 'nomarketManageNew') {
            this.isAdd = true
        } else {
            this.isAdd = false
            this.getDetails(this.$route.query.companyId);
        }
    },
    methods: {
        // 获取实控人信息
        getDetails (companyId) {
            this.$http('/dcp/query/drug/company/control/info', { companyId }, { type: 'get' }).then(res => {
                this.params = res.data
            })
        },
    }
}
</script>

