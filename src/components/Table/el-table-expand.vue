<template>
    <div id="elTableExpand">
        <div class="sub-title mb20 mt30">{{ this.title }}</div>
        <el-table :data="contentDatas" border :row-key="getRowKeys" :expand-row-keys="expands">
            <el-table-column v-if="expand" type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand copyright">
                        <el-form-item>
                            <span class="copyrightTitle">工商登记证号：</span>
                            <span class="copyrightContent">{{
                                props.row.number
                            }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">地区代码：</span>
                            <span class="copyrightContent">{{
                                props.row.code
                            }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">备注：</span>
                            <span>{{ props.row.annotation }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">审批类别：</span>
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">工商登记证号：</span>
                            <span class="copyrightContent">{{
                                props.row.number
                            }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">地区代码：</span>
                            <span class="copyrightContent">{{
                                props.row.code
                            }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">备注：</span>
                            <span>{{ props.row.annotation }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">审批类别：</span>
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">备注：</span>
                            <span>{{ props.row.annotation }}</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="copyrightTitle">审批类别：</span>
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center' v-if="titleDatas[0].type==='index'"></el-table-column>
            <el-table-column v-for="(item, index) in dataList" :key="index" :label="item.title" :prop="item.name" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='params.total' v-if='params.total > 0'>
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        expand: Boolean, // 展开行
        unfold: Boolean, // 是否展开
        titleDatas: Array,
        contentDatas: Array,
        getList: Function,
        params: Object
    },
    data () {
        return {

            // 获取row的key值
            getRowKeys (row) {
                return row.id;
            },
            // 要展开的行，数值的元素是row的key值
            expands: []
        };
    },
    methods: {
        unfoldFrist () {
            if (this.unfold) {
                this.expands.push(this.contentDatas[0].id); //展开第一行
            }
        }
    },
    computed: {
        dataList: function () {
            return this.titleDatas.filter(i => i.name && i.title)
        },
    },
    mounted () {
        this.unfoldFrist();
    }
};
</script>

<style lang="less" scoped>
.demo-table-expand.copyright {
    .el-form-item {
        display: block !important;
        width: 35%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.el-form-item {
    margin-bottom: 0 !important;
}
form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
        margin-bottom: 0 !important;
    }
}
</style>
