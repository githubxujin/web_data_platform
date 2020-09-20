<template>
    <div class="pt20">
        <zdDetail :isInfo="true" :info.sync="info" />

        <el-pagination :page-size.sync='params.size' :current-page.sync='params.current' @current-change='initData' layout='total, prev, pager, next, jumper' :total='totalSize' v-if="totalSize">
        </el-pagination>
    </div>
</template>
<script>
import zdDetail from "@/views/zhongdeng/pages/register-detail/detail.vue"
export default {
    props: {
    },
    components: {
        zdDetail
    },
    porps: {
        Company: String,
    },
    data () {
        return {
            params: {
                current: 1,
                size: 1,
                sellerName: ''
            },
            info: {},
            totalSize: 0,
            companyName: this.$route.query.companyName || ''
        };
    },
    mounted () {
        this.initData()
    },
    methods: {
        // 获取列表
        async initData (type) {
            this.params.sellerName = this.companyName
            let res = await this.ajax.json('/dcp/asset/register/detail/page/list', this.params)
            if (res.code === '200') {
                this.info = res.data.records[0]
                this.totalSize = res.data.total
            }
        }
    }
};
</script>