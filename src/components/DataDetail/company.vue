<template>
    <div>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="qualificationName" label="资质类别" width="280" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="cretNo" label="资质证书号" width="280" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="category" label="资质名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="issueDate" label="发证日期" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="endDate" label="证书有效期" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="releaseAuthority" label="发证机关" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="操作" width="240" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" @click="toCheck(scope.row.cretNo)">证书信息
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="证书信息" :visible.sync="dialogVisible" width="800px" left>
            <div data-v-425b3bab="" class="table_tbox">
                <div class="main_box">
                    <div class="plr">
                        <div class="cacertdetail">
                            <dl class="width100">
                                <dt>
                                    企业名称：
                                </dt>
                                <dd>
                                    <b>{{ info.companyName }}</b>
                                </dd>
                            </dl>
                            <dl class="width20">
                                <dt>
                                    证书编号：
                                </dt>
                                <dd>
                                    {{ info.certNo }}
                                </dd>
                            </dl>
                            <dl class="width20">
                                <dt>
                                    发证日期：
                                </dt>
                                <dd>
                                    {{ info.issueDate }}
                                </dd>
                            </dl>
                            <dl class="width20">
                                <dt>
                                    有效期至：
                                </dt>
                                <dd>
                                    {{ info.endDate }}
                                </dd>
                            </dl>
                            <dl class="width100">
                                <dt>
                                    资质范围：
                                </dt>
                                <dd>
                                    {{ info.qualificationRange }}
                                </dd>
                            </dl>

                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dialogVisible: false,
            list: [],
            info: ""
        };
    },
    created () {
        this.getList();
    },
    methods: {
        toCheck (cretNo) {
            let companyId = this.$route.params.customerCode;
            this.$http(
                "/dcp/query/company/cert/detail",
                {
                    companyId,
                    cretNo
                },
                { type: "formdata" }
            ).then(res => {
                this.dialogVisible = true;
                this.info = res.data;
            });
        },
        getList () {
            let companyId = this.$route.params.customerCode;
            this.$http(
                `/dcp/query/company/qualification/list/`,
                { companyId },
                { type: "formdata" }
            ).then(res => {
                this.list = res.data;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
/* @import "../../assets/css/table"; */
</style>
